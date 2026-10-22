---
layout: doc
title: GhostLock — Android 临时 root
titleTemplate: false
---
# GhostLock

**Android 临时 root，一键执行。** 利用 CVE-2026-43499 内核 futex use-after-free，在不解锁 bootloader、不刷 boot 镜像的前提下取得临时 root，并在内存中 late-load KernelSU。重启即失效，无残留。

<a class="dl-btn" href="apk/GhostLock-v1.2(608)-arm64-v8a-release.apk" download>⬇ 下载 GhostLock v1.2 (APK, 2.7 MB)</a>

::: danger 下载前必读
本软件利用内核漏洞提权，可能导致设备 panic、重启或数据丢失。**仅限对自己拥有或已获授权的设备使用，禁止商用。**
下载或使用即表示你已阅读并同意下方的[免责声明](#免责声明)与[用户协议](#用户协议)。
:::


## 它做什么

| 能力 | 说明 |
| --- | --- |
| 临时 root | 用户态利用内核漏洞提权到 uid 0，不改内核、不动 boot 镜像 |
| KernelSU late-load | 提权后内存加载 KernelSU，可挂载 ZygiskNext / Vector(LSPosed) 模块 |
| 重启即恢复 | 所有改动只在本次开机有效，重启后完全回到原状 |
| 运行前检查 | app 内逐项校验内核匹配、profile 合法性、`ksud` 是否存在，不满足时禁用运行按钮 |

## 下载

| 项 | 值 |
| --- | --- |
| 版本 | v1.2 (versionCode 608) |
| 架构 | arm64-v8a |
| 大小 | 2.7 MB |
| 系统要求 | Android 12+（minSdk 31） |
| 包名 | `com.ghostlock.app` |
| 许可 | PolyForm Noncommercial 1.0.0（source-available，非开源） |

校验：

```bash
sha256sum GhostLock-v1.2\(608\)-arm64-v8a-release.apk
# 9135c7f97201725f56d4912bf7280ac932d32f1d9a0f7b3e61f94b1df239bf88
```

## 使用步骤

1. **确认内核版本** — `adb shell uname -r`，必须与内置 profile 逐字符一致。不匹配则无法运行。
2. **装 KernelSU 系管理器** — [KernelSU](https://github.com/tiann/KernelSU) v3.3.1+（提供 `ksud`）。不装也能拿到 root，但不会加载模块。
3. **安装并打开 GhostLock** — 主页运行前检查面板会逐项校验，全部绿灯后点 **Run**。
4. **等待** — 利用是内核竞态，可能需重试；手机会发热，凉机成功率更高。
5. **验证** — `adb shell su -c id` 应返回 `uid=0(root) context=u:r:ksu:s0`。

要挂 Xposed 模块，再装 ZygiskNext + Vector(LSPosed 2.2)，装完需再次 `ksud late-load` 并重启 zygiskd。

## 支持设备

需要精确的 `uname -r` 匹配。内置 profile 涵盖上游已验证设备，含 **Unihertz Titan 2**（国际版 TEE 固件，内核 `6.1.145-android14-11-gbd17012cc2f7-ab14044926` 与 `6.1.115-android14-11-g6b18f0b574ab-ab12901745`）。

完整列表见上游 [SUPPORTED_DEVICES.md](https://github.com/YuKongA/ghostlock-app/blob/main/docs/kernel_profiles/SUPPORTED_DEVICES.md)。

内核不匹配？app 内可用 **Parse OTA link** / **Parse local image** 从 `boot.img` 生成候选 profile，或导入已有 `offsets.conf`。生成的 profile 是未验证候选，需真机跑通才算支持。

## 风险与边界

::: warning
- **只在本次开机有效**：重启后 root 与 KernelSU 全部消失，`/data/adb/modules/` 的文件虽保留但不会被加载。
- **不是永久 root**：要长期 root 只能解锁 bootloader + 刷 boot 镜像，不在本项目范围内。
- **内核竞态风险**：利用依赖 futex 竞态，失败可能导致内核 panic 或重启。切勿在关键场景下使用。
- **内核已打补丁则无效**：2026-07 后编译的内核大多含 CVE-2026-43499 修复，extractor 会直接报错退出。
:::

## 许可

GhostLock 采用 **PolyForm Noncommercial 1.0.0**：代码公开，禁止商用。按 OSI 定义这**不是开源**，是 source-available。ZygiskNext、Vector、KernelSU 管理器因许可不兼容，不随 APK 分发，需自行从上游获取。

上游项目：[YuKongA/ghostlock-app](https://github.com/YuKongA/ghostlock-app)

## 免责声明

GhostLock 是安全研究工具，利用公开披露的内核漏洞（CVE-2026-43499）演示 Android 提权路径。下载、安装或运行本工具即视为你已阅读并接受以下全部条款。

### 风险自担

- GhostLock 涉及内核竞态利用，运行过程中可能导致**设备发热、卡死、内核 panic、意外重启或数据丢失**。
- 作者、贡献者及分发方**不对任何设备损坏、数据丢失、业务中断或其他损害负责**，不提供任何明示或默示的担保。
- 你**自行承担**使用本工具的全部风险及后果。

### 合法使用

- 你**必须仅对自己拥有或已获得明确授权的设备**使用本工具。未经授权访问他人设备属于违法行为。
- 本工具**仅供个人学习、安全研究和授权测试使用**，不得用于任何非法目的。
- 你有责任确保使用本工具符合你所在司法管辖区的全部适用法律。
- 利用成功后获得的 root 权限**仅限本次开机有效**，重启即失效，不得用于持久化控制他人设备。

### 非商用

- GhostLock 采用 PolyForm Noncommercial 1.0.0 许可，**禁止任何形式的商业使用**，包括但不限于销售、捆绑销售、付费服务或商业化集成。

## 用户协议

最后更新：2026-10-22

### 1. 协议接受

下载、安装或使用 GhostLock（以下简称「本软件」）即表示你同意受本协议约束。不同意则**不得下载、安装或使用**本软件。

### 2. 许可授予

本软件依据 **PolyForm Noncommercial 1.0.0** 许可分发。你获得的是非独占、不可转让、不可再许可的使用许可，**仅限非商业目的**。

### 3. 允许的用途

- 个人设备上的安全研究与学习
- 经设备所有者授权的渗透测试
- 学术教学与漏洞复现演示

### 4. 禁止的用途

- 未经授权访问或控制他人设备
- 任何直接或间接的商业用途
- 恶意软件、间谍软件或后门的开发与分发
- 绕过或破坏安全防护机制用于非法目的
- 违反你所在司法管辖区法律的行为

### 5. 第三方组件

本软件不随附 ZygiskNext、Vector(LSPosed) 或 KernelSU 管理器。这些组件由各自上游项目维护，其许可条款与本项目独立。用户自行获取并安装这些组件时，需遵守各自的许可协议。

### 6. 免责与责任限制

- 本软件按「现状」提供，不提供任何担保。
- 在适用法律允许的最大范围内，作者及贡献者**不对任何直接、间接、附带、特殊或后果性损害承担责任**。
- 你理解并接受，内核漏洞利用具有内在风险，可能导致设备不稳定或数据丢失。

### 7. 知识产权

本软件及其源代码的知识产权归原作者所有。PolyForm Noncommercial 许可授予的是使用权，不转移知识产权。

### 8. 协议变更

作者保留随时修改本协议的权利。修改后的协议自发布于本页面起生效。继续使用本软件即视为接受修改。

### 9. 适用法律与争议

本协议以中文为准。因本协议或本软件引起的争议，双方应友好协商解决；协商不成的，由作者所在地法院管辖。

---

如有疑问，请通过 [GitHub Issues](https://github.com/YuKongA/ghostlock-app/issues) 联系。

<style>
.dl-btn{display:inline-flex;align-items:center;gap:8px;margin:20px 0 28px;padding:0 28px;height:50px;border-radius:10px;font-weight:600;font-size:16px;background:var(--vp-button-brand-bg);color:var(--vp-button-brand-text);border:1px solid var(--vp-button-brand-border);text-decoration:none;transition:background .2s}
.dl-btn:hover{background:var(--vp-button-brand-hover-bg);color:var(--vp-button-brand-hover-text)}
</style>
