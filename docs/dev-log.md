# 开发复盘日志

## 整体概览

- 项目周期：2026-06-14（当天完成 6 个阶段）
- 提交次数：17 次
- 技术栈：React 19 + TypeScript + Vite 8 + Tailwind CSS 3 + Framer Motion + react-i18next + react-helmet-async + vite-imagetools
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
- **坑：** 占位 Section 太短（只有一句 `<p>`），页面总高度不足一屏，按钮无法触发。给 Section 加了 `min-h-screen` 解决

---

## 阶段 4：内容区块

### 4.1 类型定义 + 数据文件（`7620b4e`）

- Profile / Project / Skill 三个接口，双语字段结构 `{ zh, en }`
- 占位数据（姓名/头像/技能/项目），后续替换为真实信息

### 4.2 Hero 区块（`bb79541`）

- 头像 `w-[120px]` 圆形，accent 边框，加载失败显示首字母
- 姓名 JetBrains Mono 48px，职称 + 简介，底部 bounce 箭头

### 4.3 Skills 区块（`51cb82b`）

- SkillTag：三色映射（backend=#4caf50 / frontend=#42a5f5 / tools=#ff9800），15% 透明度背景
- Framer Motion `staggerChildren: 0.05s` 逐个渐入

### 4.4 Projects 区块（`9e4e5ff`）

- ProjectCard：bg-surface 卡片，16:9 截图区，hover 上浮 4px + 阴影
- 技术标签行 + 源码/演示链接

### 4.5 Contact 区块（`70e911f`）

- 邮箱 mailto 链接（JetBrains Mono）+ GitHub/LinkedIn/Twitter SVG 图标
- hover accent 色过渡

---

## 阶段 5：中英双语（`a367113` → `d26dcbb`）

**关键决策：**
- 静态 UI 文案（导航、标题）用 JSON 翻译字典 + `t('key')`
- 个人数据（姓名、简介、项目描述）用 data 文件的 `{ zh, en }` 字段 + `i18n.language` 取对应值，不在 JSON 中重复
- LanguageSwitch 接入 Navbar 桌面端和移动端菜单
- 默认中文，localStorage 持久化偏好

---

## 阶段 6：P1 功能

### 6.1 项目详情弹窗（`5e107ad`）

- AnimatePresence + scale 0.9→1.0 进出场动画
- 遮罩层 80% 透明度 + body 禁止滚动
- 关闭：Esc / 点击遮罩 / 点击 ✕
- 源码/演示链接 `stopPropagation` 防止误触弹窗
- 卡片底部加「查看详情 →」提示

### 6.2 骨架屏（`a5f2f58`）

- App 级别统一管理 loading 状态，1.5s 延迟
- Hero/Projects/Skills 三个骨架变体
- **踩坑：** 最初每个 Section 独立 setTimeout（400-800ms），HMR 下几乎看不到。改为 App 级别 1.5s 延迟才可见

### 6.3 SEO（`4deeaa8`）

- **踩坑：** react-helmet-async v3 API 大变，不再用子元素写法
  - v2: `<Helmet><title>X</title></Helmet>`
  - v3: `<Helmet title="X" meta={[{...}]} />`
- robots.txt + sitemap.xml 放 `public/` 根目录

### 6.4 图片优化 + 构建验证（`93e7c9d`）

- vite-imagetools 已配置，等实际图片添加后生效
- 生产构建：HTML 0.73KB / CSS 13KB gzip 3.6KB / JS 409KB gzip 130KB

---

## P1 后续：在线编辑功能（`f388eae`）

### 需求背景

项目最初通过 `src/data/` 静态文件管理数据，修改信息需要改代码。用户需要不写代码就能编辑个人资料和项目。

### 方案设计

- 纯前端方案，数据存 localStorage，无后端
- 使用 `import.meta.env.DEV` 限定开发模式可见，生产环境完全不可访问
- React Context 在 Hero 和 Contact 之间共享 profile 数据

### 编辑入口

- **个人信息**：Hero 区姓名 hover 显示 ✎，点击打开 ProfileEditor
- **项目管理**：项目标题旁 ✎ 编辑按钮，点击打开 ProjectEditor

### 编辑功能

**个人信息编辑器：**
- 姓名、职称（中/英）、简介（中/英）、邮箱、GitHub、LinkedIn
- 头像：URL 粘贴 + 本地上传（FileReader → base64 → localStorage）
- 保存 / 恢复默认

**项目编辑器：**
- 项目列表管理：展开编辑、删除、新增
- 每项可编辑：名称、描述（中/英）、截图（上传+URL）、技术标签、源码/演示链接、详情内容（背景/方案/成果 中英双语）
- 技术标签逗号分隔输入，自动转数组
- 新增项目自动生成唯一 id，detail 字段自动初始化
- 保存 / 恢复默认

### 踩坑

- 两个组件（Hero、Contact）需要共享同一份编辑后 profile，初始各自 useEditableProfile 导致状态不同步 → 抽 ProfileContext 解决
- Profile 和 Projects 是独立数据，分开两个 Context 各管各的
- 项目详情弹窗的数据需随编辑同步更新 → 弹窗从 Projects 的状态派生，始终保持一致

---

## 总结教训

| 教训 | 场景 |
|------|------|
| npm 包大版本 API 可能不兼容 | react-helmet-async v2→v3 子元素改 props |
| 静态站点 UI 变化缺乏数据场景 | 骨架屏需人为延迟才能看到，占位 Section 太短 BackToTop 不触发 |
| Windows 工具链差异 | `pkill` 不可用，`taskkill //F //IM node.exe` 替代 |
| 端口管理 | 固定端口 + `strictPort` 避免每次换端口 |
| 工作流纪律 | 应先确认方案再写码，提前规划小功能拆分 |
| 状态共享 | 多个组件消费同一份 localStorage 数据需用 Context，各自 useState 会导致不同步 |

---

## 功能完成清单

全部 11 个需求 + 2 个增量功能：

| # | 功能 | 优先级 | 状态 |
|---|------|--------|------|
| F1 | Hero 区 | P0 | ✅ |
| F2 | 个人介绍 | P0 | ✅ |
| F3 | 技能展示 | P0 | ✅ |
| F4 | 项目展示 | P0 | ✅ |
| F5 | 响应式布局 | P0 | ✅ |
| F6 | 暗色主题 | P0 | ✅ |
| F7 | 浮动导航 + 返回顶部 | P0 | ✅ |
| F8 | 中英双语切换 | P1 | ✅ |
| F9 | SEO 基础 | P1 | ✅ |
| F10 | 骨架屏 + 性能优化 | P1 | ✅ |
| F11 | 项目详情弹窗 | P1 | ✅ |
| +1 | 个人信息在线编辑 | 增量 | ✅ |
| +2 | 项目在线管理 | 增量 | ✅ |

## 待用户自行完成

- 通过在线编辑器填入真实个人信息和项目数据（已无需改代码）
- 在编辑器中上传头像和项目截图（支持本地上传 + URL）
- 更新 `src/components/SEO.tsx` 和 `public/sitemap.xml` 中的域名
- Vercel 部署（导入 GitHub 仓库）

| 教训 | 场景 |
|------|------|
| npm 包大版本 API 可能不兼容 | react-helmet-async v2→v3 子元素改 props |
| 静态站点 UI 变化缺乏数据场景 | 骨架屏需人为延迟才能看到，占位 Section 太短 BackToTop 不触发 |
| Windows 工具链差异 | `pkill` 不可用，`taskkill //F //IM node.exe` 替代 |
| 端口管理 | 固定端口 + `strictPort` 避免每次换端口 |
| 工作流纪律 | 应先确认方案再写码，提前规划小功能拆分 |

---

## 待用户自行完成

- 替换 `src/data/profile.ts` 真实个人信息
- 替换 `src/data/projects.ts` 真实项目数据
- 替换 `src/data/skills.ts` 真实技能列表
- 放置头像和项目截图到 `public/` 下
- 更新 `src/components/SEO.tsx` 和 `public/sitemap.xml` 中的域名
- Vercel 部署（导入 GitHub 仓库）
