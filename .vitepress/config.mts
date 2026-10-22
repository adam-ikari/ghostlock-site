import { defineConfig } from 'vitepress'

const base = process.env.VP_BASE || '/ghostlock-site/'
const hostname = process.env.VP_HOST || 'https://adam-ikari.github.io'
const APK = 'apk/GhostLock-v1.2(608)-arm64-v8a-release.apk'

export default defineConfig({
  lang: 'zh-CN',
  title: 'GhostLock — Android 临时 root',
  description: '利用 CVE-2026-43499 在内核未打补丁的 Android 设备上取得临时 root，内存加载 KernelSU。不解锁 bootloader，不刷 boot，重启即失效。',
  base,
  cleanUrls: true,

  sitemap: {
    hostname: hostname + base.replace(/\/$/, ''),
  },

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    ['meta', { name: 'theme-color', content: '#1a1a2e' }],
    ['meta', { name: 'keywords', content: 'GhostLock, CVE-2026-43499, Android 临时root, KernelSU, LSPosed, Zygisk, Unihertz Titan 2' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['link', { rel: 'canonical', href: hostname + base }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'GhostLock' }],
    ['meta', { property: 'og:title', content: 'GhostLock — Android 临时 root' }],
    ['meta', { property: 'og:description', content: 'CVE-2026-43499 临时 root + KernelSU 内存加载。不解锁 bootloader，重启即失效。' }],
    ['meta', { property: 'og:url', content: hostname + base }],
    ['meta', { property: 'og:image', content: hostname + base + 'og.png' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'GhostLock — Android 临时 root' }],
    ['meta', { name: 'twitter:description', content: 'CVE-2026-43499 临时 root + KernelSU 内存加载。不解锁 bootloader，重启即失效。' }],
    ['meta', { name: 'twitter:image', content: hostname + base + 'og.png' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: base + 'favicon.svg' }],
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'GhostLock',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Android 12+',
      description: '利用 CVE-2026-43499 在未打补丁的 Android 内核上取得临时 root 并加载 KernelSU。',
      softwareVersion: '1.2',
      license: 'https://polyformproject.org/licenses/noncommercial/1.0.0/',
    })],
  ],

  themeConfig: {
    siteTitle: 'GhostLock',
    nav: [
      { text: '下载', link: '#下载' },
      { text: '支持设备', link: '#支持设备' },
      {
        text: '法律',
        items: [
          { text: '免责声明', link: '#免责声明' },
          { text: '用户协议', link: '#用户协议' },
        ],
      },
      { text: 'GitHub', link: 'https://github.com/YuKongA/ghostlock-app' },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/YuKongA/ghostlock-app' }],
    footer: {
      message: '<a href="https://polyformproject.org/licenses/noncommercial/1.0.0/" target="_blank">PolyForm Noncommercial 1.0.0</a> — 代码公开，禁止商用',
      copyright: '© 2026 GhostLock',
    },
    outline: { level: [2, 3], label: '本页内容' },
    darkModeSwitchLabel: '深色模式',
    returnToTopLabel: '回到顶部',
  },

  markdown: { lineNumbers: false },
})
