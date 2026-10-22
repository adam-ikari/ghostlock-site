---
layout: doc
title: GhostLock — Android 临时 root
titleTemplate: false
---
# GhostLock

**Android 临时 root，一键执行。** 利用 CVE-2026-43499 内核 futex use-after-free，在不解锁 bootloader、不刷 boot 镜像的前提下取得临时 root，并在内存中 late-load KernelSU。重启即失效，无残留。

<a class="dl-btn" href="apk/GhostLock-v1.2(608)-arm64-v8a-release.apk" download>⬇ 下载 GhostLock v1.2 (APK, 2.7 MB)</a>

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

<style>
.dl-btn{display:inline-flex;align-items:center;gap:8px;margin:20px 0 28px;padding:0 28px;height:50px;border-radius:10px;font-weight:600;font-size:16px;background:var(--vp-button-brand-bg);color:var(--vp-button-brand-text);border:1px solid var(--vp-button-brand-border);text-decoration:none;transition:background .2s}
.dl-btn:hover{background:var(--vp-button-brand-hover-bg);color:var(--vp-button-brand-hover-text)}
</style>
