# 开发复盘日志

## 阶段 1-2：项目脚手架 + 暗色主题全局布局（2026-06-14）

**提交：** `7af4f58`

**关键决策：**
- 实际安装版本以 npm 为准，未严格锁定 tech-spec 中的版本号（React 19、Vite 8 替代了计划的 React 18、Vite 5）
- 五份规划文档移入 `docs/` 目录，与源码分离
- 删除 Vite 模板残留（README.md、icons.svg、favicon.svg）
- 分支策略调整：从 master 切换到 main

**遗留问题：**
- Windows 环境下 `pkill` 不可用，端口清理需用 `taskkill`
- 开发服务器端口需固定，避免频繁切换

---

## 阶段 3.1：Navbar 桌面端 + 滚动高亮（2026-06-14）

**提交：** `b867101`

**关键决策：**
- useScrollSpy 使用 IntersectionObserver，threshold 0.3，监听四个 Section 的 id
- 按钮触发 `scrollIntoView({ behavior: 'smooth' })` 而非 `<a>` 锚点，避免 URL 变化
- 给每个 Section 加 `scroll-mt-14` 防止固定 Navbar 遮挡锚点滚动

---

## 阶段 3.2：Navbar 移动端汉堡菜单（2026-06-14）

**提交：** `ee34f3d`

**关键决策：**
- 移动端断点使用 Tailwind 默认 `md:`（768px）
- 汉堡图标用 3 个 `<span>` + CSS transition 实现，无需额外 SVG 依赖
- 菜单面板用 Framer Motion `AnimatePresence` + `x: '100%' → 0` 侧滑
- 打开面板时 body `overflow: hidden` 禁止背景滚动
- 服务器端口固定在 5176（`strictPort: true`）
