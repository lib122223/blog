# 个人作品集网站 — 开发执行计划

## 总览

本项目分 6 个阶段执行，每阶段完成后验证通过再进入下一阶段。

---

## 阶段 1：项目脚手架

**目标：** Vite + React + TypeScript 项目初始化，所有依赖安装完毕，`npm run dev` 能正常启动。

- [ ] `npm create vite@latest blog -- --template react-ts` 创建项目
- [ ] 安装生产依赖：`framer-motion` `react-i18next` `i18next` `i18next-browser-languagedetector` `react-helmet-async`
- [ ] 安装开发依赖：`tailwindcss` `postcss` `autoprefixer` `vite-imagetools` `@types/react` `@types/react-dom`
- [ ] 配置 Tailwind（`tailwind.config.ts`）：自定义颜色 token、JetBrains Mono 字体、响应式断点
- [ ] 配置 PostCSS（`postcss.config.js`）
- [ ] `globals.css` 写入 Tailwind 指令 + CSS 变量（design-spec 色彩 token）
- [ ] 清理 Vite 默认模板文件，按 tech-spec 创建目录结构
- [ ] TypeScript 严格模式确认（`tsconfig.json`）

**验证：** `npm run dev` 启动成功，浏览器打开无报错，Tailwind 指令生效。

---

## 阶段 2：暗色主题 + 全局布局

**目标：** 暗色基底生效，JetBrains Mono 字体加载，全局响应式容器就位，App.tsx 组装所有区块占位。

- [ ] `tailwind.config.ts` 扩展：将 design-spec 色彩 token（`bg-base`、`bg-surface`、`text-primary`、`accent` 等）注册为 Tailwind 自定义颜色
- [ ] `index.html` 引入 Google Fonts（JetBrains Mono）
- [ ] `globals.css` 完善：CSS 变量声明 + body 全局背景色 `bg-base` + 文字色 `text-primary`
- [ ] 全局布局容器：`<main>` 设置 `max-w-3xl mx-auto px-5`，桌面 960px 居中
- [ ] `App.tsx` 组装所有 Section 占位组件（Hero / Projects / Skills / Contact 空壳，各渲染一句占位文字）
- [ ] 响应式验证：缩放浏览器窗口检查三断点切换

**验证：** 页面暗色背景（`#0a0a0f`），JetBrains Mono 在标题上生效，缩放浏览器窗口布局自适应。

---

## 阶段 3：导航系统

**目标：** 浮动导航条 + 滚动高亮 + 返回顶部按钮全部可用。

- [ ] `Navbar.tsx`：桌面端固定顶栏（`bg-elevated` + `backdrop-blur`，高度 56px），左侧 Logo（姓名，JetBrains Mono），右侧锚点链接（Hero / 项目 / 技能 / 联系）
- [ ] `Navbar.tsx` 移动端：汉堡图标（48px 高度），点击展开全屏菜单面板（Framer Motion 右侧滑入），点击锚点后自动关闭
- [ ] `useScrollSpy.ts`：IntersectionObserver 监听各 Section（对每个 Section 设置 `id` 属性），threshold 0.3，返回当前可见区块 id
- [ ] Navbar 高亮逻辑：当前区块 id 对应的锚点链接颜色变为 `accent`，其余为 `text-secondary`
- [ ] `BackToTop.tsx`：右下角固定 44px 圆形按钮（`accent` 背景 + 白色箭头），滚动超过一屏高度后 opacity 0→1（300ms 过渡）
- [ ] 所有锚点点击 `scroll-behavior: smooth` 平滑滚动到目标区块

**验证：** 点击锚点导航平滑滚动到对应区块，滚动页面时导航自动高亮当前区块，移动端汉堡菜单展开/关闭正常，返回顶部按钮出现/消失正常且点击回顶部。

---

## 阶段 4：内容区块

**目标：** Hero、Skills、Projects、Contact 四个区块全部实现，静态数据文件就位，页面可完整浏览。

### 类型定义 + 数据文件

- [ ] `types/index.ts`：Profile / Project / Skill 接口定义（按 tech-spec 数据模型）
- [ ] `data/profile.ts`：个人信息（姓名/头像/简介/邮箱/社交链接），使用 Profile 类型
- [ ] `data/skills.ts`：技能列表按 backend / frontend / tools 三分类，使用 Skill 类型
- [ ] `data/projects.ts`：项目列表（截图/描述/技术标签/源码链接/演示链接），使用 Project 类型

### Hero 区块

- [ ] `sections/Hero/Hero.tsx`：`min-height: 100vh` flex 居中布局。头像（圆形 120px, `border-accent` 2px）→ 姓名（JetBrains Mono, 48px Bold）→ 职称（`text-secondary`）→ 个人简介（max-w 600px, `text-secondary`）
- [ ] 底部向下箭头滚动提示（CSS 微动画 pulse/bounce）

### Skills 区块

- [ ] `components/SkillTag.tsx`：接收 `name` + `category`，按 category 分配颜色（backend → `accent-backend`, frontend → `accent-frontend`, tools → `accent-tools`），背景 15% 透明度，圆角 6px
- [ ] `sections/Skills/Skills.tsx`：三个分类标题 + 标签云，Framer Motion `staggerChildren: 0.05s` 逐个出现

### Projects 区块

- [ ] `components/ProjectCard.tsx`：卡片（`bg-surface`，圆角 12px），上方 16:9 截图（`object-fit: cover`），下方信息区（padding 24px）。标题 20px SemiBold → 描述 `text-secondary` → SkillTag 标签行 → 源码/演示链接（`accent` 色）。hover 时 `translateY(-4px)` + 阴影增强（200ms ease）
- [ ] `sections/Projects/Projects.tsx`：项目卡片纵向排列，Framer Motion `whileInView` 入场动画（向上淡入 30px）

### Contact 区块

- [ ] `sections/Contact/Contact.tsx`：居中布局，邮箱 `mailto:` 链接（JetBrains Mono）+ 社交图标行（GitHub/LinkedIn/Twitter 可选），图标 24px，间距 16px，hover 过渡为 `accent` 色

**验证：** 页面从 Hero 到 Contact 完整可浏览，四个区块样式与 design-spec 一致，数据从 `data/` 文件正确导入渲染。

---

## 阶段 5：双语国际化

**目标：** 中英双语切换功能上线，所有文案双语覆盖，语言偏好持久化。

- [ ] `i18n/index.ts`：i18next 初始化配置，引入 `i18next-browser-languagedetector`，默认语言 `zh`，fallback `en`，检测顺序：localStorage → browser → default
- [ ] `i18n/zh.json` + `i18n/en.json`：翻译字典，覆盖导航锚点、Hero 标题与简介、技能分类标题、项目描述字段、联系方式标签等，两份 key 结构完全一致（TypeScript 从 `zh.json` 推导 key 类型）
- [ ] `components/LanguageSwitch.tsx`：显示当前语言标签（中/EN），点击切换，`localStorage` 持久化偏好
- [ ] 所有 Section 组件改造：硬编码文案全部替换为 `useTranslation()` 的 `t('key')` 调用
- [ ] 数据文件双语取值：`profile.ts` / `projects.ts` / `skills.ts` 中 `{ zh, en }` 字段根据 `i18n.language` 取对应值

**验证：** 点击语言切换按钮全站文案即时切换无闪烁，刷新页面语言偏好保持，浏览器语言为英文时首次访问自动显示英文版。

---

## 阶段 6：P1 功能补完

**目标：** 项目详情弹窗 + 骨架屏 + SEO + 图片优化 + 性能达标（Lighthouse ≥ 90）。

- [ ] `sections/Projects/ProjectDetail.tsx`：弹窗组件。遮罩层（`bg-base` 80% 透明度）+ 居中弹窗（`bg-elevated`，圆角 12px，max-w 720px）。内容：大截图 + 项目背景（`detail.background`）+ 技术方案（`detail.approach`）+ 成果数据（`detail.result`）。Framer Motion `AnimatePresence` + `scale 0.9→1.0 + opacity` 进出场。关闭方式：点击遮罩 / 按 Esc / 点击关闭按钮。弹窗打开时 `body` 禁止滚动
- [ ] `ProjectCard.tsx` 集成：点击卡片触发弹窗，传入当前 `project` 数据
- [ ] `components/Skeleton.tsx`：Hero 骨架（圆形 + 两行文字）、Skills 骨架（6 个 tag 占位）、Projects 骨架（3 张卡片占位，灰色矩形模拟截图）。内容渲染完成后淡出（opacity 过渡 400ms）
- [ ] SEO：`react-helmet-async` 包裹 App，设置 `<title>` + `<meta name="description">` + Open Graph 标签。`public/` 下放置 `robots.txt` + 生成 `sitemap.xml`
- [ ] 图片优化：`vite-imagetools` 配置，项目截图构建时自动生成 WebP + 响应式多尺寸。`<img>` 使用 `loading="lazy"` + `srcSet`
- [ ] 性能调优：Chrome Lighthouse 审计，确保 ≥ 90。检查 CLS < 0.1、LCP < 2.5s、图片懒加载生效

**验证：** 点击项目卡片弹出详情弹窗，内容正确，关闭正常。首页加载显示骨架屏后淡出。Lighthouse 评分 ≥ 90。SEO meta 标签在浏览器 DevTools Elements 面板中可见。

---

## 回归检查清单

每完成一个阶段或修改代码后，验证以下关键路径：

1. **页面加载**：`npm run dev` 无报错，页面从 Hero 到 Contact 完整渲染
2. **响应式三断点**：手机（< 768px）、平板、桌面（≥ 1024px）分别检查布局不错乱
3. **导航系统**：锚点点击平滑滚动、滚动高亮跟随、返回顶部可用、汉堡菜单正常
4. **双语切换**：中英切换全站文案更新、刷新后偏好保持
5. **项目弹窗**：点击打开 → 内容正确 → 关闭正常（遮罩/Esc/按钮）
6. **性能**：Lighthouse ≥ 90，CLS < 0.1，LCP < 2.5s
