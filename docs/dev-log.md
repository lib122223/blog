# 开发复盘日志

## 整体概览

- 项目周期：2026-06-14
- 提交次数：20 次
- 技术栈：React 19 + TypeScript + Vite 8 + Tailwind CSS 3 + Framer Motion 12 + react-i18next 17 + react-helmet-async 3 + vite-imagetools 10
- 分支策略：main 分支，小功能 → 验证 → 提交 → 推送

---

## 阶段 1-2：项目脚手架 + 暗色主题全局布局

**提交：** `7af4f58`

**关键决策：**
- 实际安装版本以 npm 为准，未严格锁定 tech-spec 中的版本号（React 19 替代 18、Vite 8 替代 5）
- 五份规划文档移入 `docs/` 目录，与源码分离
- 删除 Vite 模板残留（README.md、icons.svg、favicon.svg）
- 分支从 master 切换到 main

**踩坑：**
- Windows 下 `pkill` 不可用，端口清理需用 `taskkill //F //IM node.exe`
- 端口被旧进程占用时不报错只切端口，加了 `strictPort: true` 固定 5176

---

## 阶段 3：导航系统

### 3.1 Navbar 桌面端 + 滚动高亮（`b867101`）

- useScrollSpy：IntersectionObserver，threshold 0.3，监听 Section 的 id
- `scrollIntoView({ behavior: 'smooth' })` 替代 `<a>` 锚点，避免 URL 变化
- 每个 Section 加 `scroll-mt-14` 防止固定 Navbar（56px）遮挡

### 3.2 Navbar 移动端汉堡菜单（`ee34f3d`）

- 断点：Tailwind 默认 `md:`（768px）
- 汉堡图标：3 个 `<span>` + CSS transition，无需 SVG 依赖
- 面板：Framer Motion `AnimatePresence` + `x: '100%' → 0` 侧滑
- 打开时 body `overflow: hidden` 禁止背景滚动

### 3.3 BackToTop 返回顶部（`6b4c882`）

- 右下角固定 44px 圆形，accent 背景 + SVG 箭头
- `window.scrollY > innerHeight` 判断显隐，transition-opacity 渐显 300ms
- **坑：** 占位 Section 太短，页面总高度不足一屏，按钮无法触发 → 给 Section 加了 `min-h-screen`

---

## 阶段 4：内容区块

### 4.1 类型定义 + 数据文件（`7620b4e`）

- Profile / Project / Skill 三个接口，双语字段结构 `{ zh, en }`

### 4.2 Hero 区块（`bb79541`）

- 头像 `w-[120px]` 圆形，accent 边框，加载失败显示首字母 fallback
- 姓名 JetBrains Mono 48px + 底部 bounce 箭头

### 4.3 Skills 区块（`51cb82b`）

- SkillTag 三色映射（backend=绿 / frontend=蓝 / tools=橙），15% 透明度背景
- Framer Motion `staggerChildren: 0.05s` 逐个渐入

### 4.4 Projects 区块（`9e4e5ff`）

- ProjectCard：bg-surface 卡片，16:9 截图区，hover 上浮 4px + 阴影

### 4.5 Contact 区块（`70e911f`）

- 邮箱 mailto 链接 + GitHub/LinkedIn SVG 图标

---

## 阶段 5：中英双语（`a367113` → `d26dcbb`）

**关键决策：**
- 静态 UI 文案（导航、标题）用 JSON 翻译字典 + `t('key')`
- 个人数据（姓名、简介、项目描述）用 data 文件的 `{ zh, en }` 字段 + `i18n.language` 取值
- LanguageSwitch 接入 Navbar 桌面端和移动端菜单
- 默认中文，localStorage 持久化偏好

---

## 阶段 6：P1 功能

### 6.1 项目详情弹窗（`5e107ad`）

- AnimatePresence + scale 0.9→1.0 进出场动画
- Esc / 遮罩 / ✕ 三种关闭，body 禁止滚动
- 卡片底部加「查看详情 →」提示

### 6.2 骨架屏（`a5f2f58`）

- App 级别统一管理，1.5s 延迟
- **坑：** 最初每个 Section 独立延迟（400-800ms），HMR 下几乎看不到

### 6.3 SEO（`4deeaa8`）

- **坑：** react-helmet-async v3 API 大变 → 子元素改 props
- robots.txt + sitemap.xml

### 6.4 图片优化 + 构建验证（`93e7c9d`）

- 生产构建：HTML 0.73KB / CSS 13KB gzip 3.6KB / JS 409KB gzip 130KB

---

## 增量功能 1：在线编辑（`f388eae`）

### 需求背景

最初通过 `src/data/` 静态文件管理数据，修改信息需要改代码。用户需要不写代码就能编辑。

### 方案

- 纯前端，localStorage 持久化，无后端
- `import.meta.env.DEV` 限定开发模式可见，生产构建自动移除
- React Context 在 Hero 和 Contact 之间共享编辑数据

### 编辑入口

- **个人信息**：Hero 区姓名 hover 显示 ✎，点击打开 ProfileEditor
- **项目管理**：项目标题旁 ✎ 编辑按钮，点击打开 ProjectEditor

### 功能细节

- 头像/截图：URL 粘贴 + 本地上传（FileReader → base64 → localStorage）
- 技术标签逗号分隔输入，自动转数组
- 新增项目自动生成 id，detail 字段自动初始化
- 一键恢复默认数据

### 踩坑

- 两个组件各自 useState 导致状态不同步 → 抽 ProfileContext 共享

---

## 增量功能 2：项目轮播图 + 浅色主题（`2abc4eb`）

### 需求演变

用户觉得纵向卡片列表浏览过于普通 → 尝试全屏画廊弹窗（不满意）→ 尝试全屏滚动（不满意）→ 最终定为轮播图。

### 方案

- 中间大图占主体（~64%），左右两侧各露出相邻项目的 20% 边缘（半透明）
- 鼠标移至左/右边缘 → 出现跟随鼠标的 accent 色浮动按钮（"← 上一个"/"下一个 →"）
- 停留在边缘 0.8 秒自动切换，点击立即切换
- 键盘 ← → 也可切换
- 项目标题和描述在轮播下方居中展示
- 点击中间图片 → 弹出详情弹窗

### 浅色主题

- bg-base: #f5f4f0 暖纸白
- bg-surface: #ebeae5 微暖浅灰
- accent: #0066cc 专业蓝
- 参考 Squarespace 简洁风格
- **坑：** Tailwind 配置变更后需重启 dev server 才生效

### 三次方案迭代

| 方案 | 描述 | 结果 |
|------|------|------|
| A | 全屏弹出画廊，左右滑动 | 用户不满意 |
| B | 页面内 100vh 滚屏，左图右文 | 用户不满意 |
| C | 轮播图 + 边缘窥视 + 跟随按钮 | ✅ 通过 |

---

## 总结教训

| 教训 | 场景 |
|------|------|
| npm 包大版本 API 可能不兼容 | react-helmet-async v2→v3 |
| 静态站点 UI 缺乏数据场景 | 骨架屏需人为延迟、Section 太短按钮不触发 |
| Windows 工具链差异 | `pkill` 不可用，用 `taskkill` 替代 |
| 端口管理 | 固定端口 + `strictPort: true` |
| 状态共享 | 多组件消费同一 localStorage 需用 Context |
| Tailwind 配置 | 改 config 后需重启 dev server |
| 轮播交互体验 | 跟随鼠标按钮 + 边缘窥视 + 自动切换 组合优于简单箭头 |

---

## 功能完成清单

| # | 功能 | 优先级 | 状态 |
|---|------|--------|------|
| F1 | Hero 区 | P0 | ✅ |
| F2 | 个人介绍 | P0 | ✅ |
| F3 | 技能展示 | P0 | ✅ |
| F4 | 项目轮播图 | P0 | ✅ |
| F5 | 响应式布局 | P0 | ✅ |
| F6 | 暖色主题 | P0 | ✅ |
| F7 | 浮动导航 + 返回顶部 | P0 | ✅ |
| F8 | 中英双语切换 | P1 | ✅ |
| F9 | SEO 基础 | P1 | ✅ |
| F10 | 骨架屏 + 性能优化 | P1 | ✅ |
| F11 | 项目详情弹窗 | P1 | ✅ |
| F12 | 个人信息在线编辑 | 增量 | ✅ |
| F13 | 项目在线管理 | 增量 | ✅ |

## 待用户自行完成

- 通过在线编辑器填入真实个人信息和项目数据
- 在编辑器中上传头像和项目截图（支持本地上传 + URL）
- 更新 SEO 组件中的域名
- Vercel 部署
