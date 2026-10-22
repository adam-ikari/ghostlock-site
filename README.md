# GhostLock 官网

单页 VitePress 站点：项目说明 + APK 下载。

```bash
npm install
npm run dev      # http://localhost:5173/ghostlock/
npm run build    # → .vitepress/dist/
```

部署：推 `main` 后由 `.github/workflows/site.yml` 构建并发布到 GitHub Pages。
APK 源文件在 `vendor/ghostlock-app/build/app/outputs/apk/release/`，更新版本时复制到 `public/apk/` 并同步 `index.md` 里的 SHA-256。
