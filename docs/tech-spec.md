# 个人作品集网站 — 技术设计文档

## 技术栈选择

| 层级 | 选型 | 版本 | 说明 |
|------|------|------|------|
| 语言 | TypeScript | ^5.x | 类型安全，配合 React 的 TSX 类型推断 |
| 前端框架 | React | ^18.x | 函数组件 + Hooks，生态成熟 |
| 构建工具 | Vite | ^5.x | 快速 HMR，原生 ESM，Vercel 原生支持 |
| 样式 | Tailwind CSS | ^3.x | 原子化 CSS，暗色主题通过 `dark:` 变体 + 自定义配置实现 |
| 动画 | Framer Motion | ^11.x | 滚动触发动画（whileInView）、hover 微交互（whileHover） |
| 国际化 | react-i18next | ^15.x | React 生态标准 i18n 方案，支持嵌套 JSON 字典、浏览器语言自动检测 |
| 图片优化 | vite-imagetools | latest | 构建时自动生成 WebP + 多尺寸响应式图片 |
| 部署 | Vercel | — | 免费额度充足，Git push 自动部署，全球 CDN |

> 版本号使用 `^` 前缀策略，允许次版本和补丁版本自动升级。实际安装版本以 `npm install` 后 `package.json` 和 `package-lock.json` 为准。

## 项目结构

```
blog/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── public/
│   ├── favicon.ico
│   └── og-image.png               # Open Graph 预览图
├── src/
│   ├── main.tsx                    # 入口
│   ├── App.tsx                     # 根组件，组装各区块
│   ├── components/                 # 通用 UI 组件
│   │   ├── Navbar.tsx
│   │   ├── BackToTop.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── SkillTag.tsx
│   │   ├── LanguageSwitch.tsx
│   │   └── Skeleton.tsx            # 骨架屏（P1）
│   ├── sections/                   # 页面区块
│   │   ├── Hero/
│   │   │   ├── Hero.tsx
│   │   │   └── Hero.module.css
│   │   ├── Projects/
│   │   │   ├── Projects.tsx
│   │   │   └── ProjectDetail.tsx   # 项目详情弹窗（P1）
│   │   ├── Skills/
│   │   │   └── Skills.tsx
│   │   └── Contact/
│   │       └── Contact.tsx
│   ├── hooks/                      # 自定义 hooks
│   │   ├── useScrollSpy.ts         # 滚动监听，导航高亮当前区块
│   │   └── useI18n.ts              # 语言切换封装
│   ├── i18n/                       # 翻译字典
│   │   ├── index.ts                # i18next 初始化配置
│   │   ├── zh.json
│   │   └── en.json
│   ├── data/                       # 静态数据
│   │   ├── profile.ts              # 个人信息（姓名/头像/简介/联系方式）
│   │   ├── projects.ts             # 项目列表
│   │   └── skills.ts               # 技能列表
│   ├── types/                      # 类型定义
│   │   └── index.ts                # Profile, Project, Skill 等接口
│   └── styles/
│       └── globals.css             # Tailwind 指令 + 全局样式
```

## 数据模型

> 纯前端静态站点，无数据库。数据模型为 `src/data/` 下静态文件的 TypeScript 接口定义。

### Profile（个人信息）

```typescript
interface Profile {
  name: string;
  title: { zh: string; en: string };
  avatar: string;
  bio: { zh: string; en: string };
  email: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}
```

### Project（项目）

```typescript
interface Project {
  id: string;
  title: string;
  description: { zh: string; en: string };
  thumbnail: string;
  techTags: string[];
  sourceUrl?: string;
  demoUrl?: string;
  detail?: {
    background: { zh: string; en: string };
    approach: { zh: string; en: string };
    result: { zh: string; en: string };
  };
}
```

### Skill（技能）

```typescript
interface Skill {
  name: string;
  category: 'backend' | 'frontend' | 'tools';
}
```

### 数据关系

```
Profile (1)  ——  独立实体
Project (*)  ——  独立列表，无关联
Skill (*)    ——  独立列表，按 category 分组展示
```

## 核心数据流

### ① 页面加载

```
index.html → main.tsx → App.tsx → 各 Section 组件 import data/*.ts → 渲染
```

纯静态导入，无异步请求。数据文件（`profile.ts` / `projects.ts` / `skills.ts`）在构建时被打包进 bundle。

### ② 双语切换

```
用户点击 LanguageSwitch → i18next.changeLanguage('zh'|'en')
  → localStorage.setItem('lang', ...) 持久化偏好
  → 所有组件通过 t('key') 获取新语言文本 → 重新渲染
```

首次访问时通过 `i18next-browser-languagedetector` 检测浏览器语言，无记录则默认中文。

### ③ 滚动导航高亮

```
用户滚动页面
  → useScrollSpy（IntersectionObserver 监听各 Section）
  → 判断当前可见区块（threshold: 0.3）
  → Navbar 高亮对应锚点链接
```

### ④ 项目详情弹窗

```
点击 ProjectCard → ProjectDetail 弹窗（Modal Overlay）叠加
  → 展示 project.detail（背景 / 技术方案 / 成果）
  → 点击关闭或按 Esc → 回到主页面
```

弹窗模式：不改变 URL，保持单页叙事连贯性。使用 Framer Motion `AnimatePresence` 实现进出场动画。

## 关键技术点

| # | 难点 | 说明 | 方案 |
|---|------|------|------|
| 1 | 双语文本管理 | 所有 UI 文案需双语覆盖，手动维护两份 JSON 容易不一致 | `zh.json` 和 `en.json` 保持相同 key 结构；TypeScript 从 `zh.json` 推导 key 类型，编译期检查英文缺失 |
| 2 | 响应式断点 | 三个断点适配，移动端导航从顶栏变汉堡菜单 | Tailwind 响应式前缀（`md:` / `lg:`）；汉堡菜单用 state 控制展开/折叠，Framer Motion 做滑入动画 |
| 3 | 暗色主题一致性 | Tailwind `dark:` 变体只能做二分切换，还需彩色细节点缀 | `tailwind.config.ts` 扩展自定义颜色（`accent`、`surface` 等），全局 CSS 变量驱动，组件统一引用 |
| 4 | 滚动驱动动画 | 区块入场动画、hover 微交互需高性能、不卡滚动 | Framer Motion `whileInView` 自带 IntersectionObserver，配合 `viewport={{ once: true, margin: '-100px' }}` 避免重复触发 |
| 5 | 图片性能 | 项目截图可能较大，影响首屏加载 | `vite-imagetools` 构建时自动生成 WebP + 多尺寸；`<img>` 用 `loading="lazy"` + `srcSet`；Hero 区域图片优先加载 |
| 6 | SEO（无 SSR） | React SPA 对搜索引擎不友好 | `react-helmet-async` 动态设置 `<meta>` / `<title>`；构建时生成 `sitemap.xml`；`public/` 放 `robots.txt`；核心信息确保在静态 HTML 中存在 |

## 依赖速查

### 生产依赖（dependencies）

| 包名 | 版本 | 用途 |
|------|------|------|
| react | ^18.x | UI 框架 |
| react-dom | ^18.x | React DOM 渲染 |
| framer-motion | ^11.x | 滚动动画 + 微交互 |
| react-i18next | ^15.x | 国际化框架 |
| i18next | ^24.x | i18n 核心引擎（react-i18next 依赖） |
| i18next-browser-languagedetector | ^8.x | 自动检测浏览器语言 |
| react-helmet-async | ^2.x | 动态设置 SEO meta 标签 |

### 开发依赖（devDependencies）

| 包名 | 版本 | 用途 |
|------|------|------|
| typescript | ^5.x | 类型检查 |
| vite | ^5.x | 构建 + 开发服务器 |
| @vitejs/plugin-react | ^4.x | Vite React JSX/TSX 支持 |
| tailwindcss | ^3.x | 原子化 CSS 框架 |
| postcss | ^8.x | CSS 后处理（Tailwind 依赖） |
| autoprefixer | ^10.x | CSS 厂商前缀自动补全 |
| vite-imagetools | ^7.x | 构建时图片优化（WebP + 多尺寸） |
| @types/react | ^18.x | React 类型声明 |
| @types/react-dom | ^18.x | ReactDOM 类型声明 |

> 版本号以 `npm install` 后 `package.json` 和 `package-lock.json` 的实际值为准。

