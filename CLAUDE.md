# 个人作品集网站

全栈开发者个人作品集，React + TypeScript + Vite + Tailwind CSS，暗色开发者风格，中英双语，Vercel 部署。

---

## 命令

- `npm run dev` — 启动 Vite 开发服务器（HMR）
- `npm run build` — 生产构建，输出到 `dist/`
- `npm run preview` — 本地预览生产构建
- `npx lighthouse` — 性能审计，目标 ≥ 90

---

## 开发环境

- Node.js 18+，npm 9+
- 初始化：`npm install` → `npm run dev`
- 无需数据库、无需 Docker、无需后端服务

---

## 架构

```
src/
├── components/       # 通用 UI（Navbar, BackToTop, ProjectCard, SkillTag, LanguageSwitch, Skeleton）
├── sections/         # 页面区块（Hero, Projects, Skills, Contact），每区块独立目录
├── hooks/            # useScrollSpy（IntersectionObserver）, useI18n（语言切换封装）
├── i18n/             # zh.json + en.json 翻译字典 + index.ts 初始化
├── data/             # 静态数据：profile.ts, projects.ts, skills.ts
├── types/            # Profile, Project, Skill 接口
└── styles/           # globals.css（Tailwind 指令 + CSS 变量）
```

数据流：`data/*.ts` 静态导入 → Section 组件直接消费。无异步请求、无状态管理库、无路由。

---

## 标准文件索引

| 文件 | 路径 | 说明 |
|------|------|------|
| 需求研究 | [docs/Research.md](docs/Research.md) | 想法 + AI 分析 + 竞品调研（Tamal Sen 基准） |
| 需求规格 | [docs/requirements.md](docs/requirements.md) | 11 功能 + 三类用户 + 暗色单页布局 |
| 技术规格 | [docs/tech-spec.md](docs/tech-spec.md) | 技术栈 + 数据模型 + 6 个关键技术点 |
| UI 设计 | [docs/design-spec.md](docs/design-spec.md) | 色彩 token + JetBrains Mono + 6 组件规格 |
| 开发计划 | [docs/dev-plan.md](docs/dev-plan.md) | 6 阶段 + 回归检查清单 |

---

## 代码风格

- React 函数组件 + Hooks，无 class 组件
- 组件文件与默认导出同名（PascalCase）
- TypeScript 严格模式，接口定义集中在 `types/index.ts`
- 默认不加注释，只在 WHY 不明显时加一行
- 静态内容数据与组件分离（`data/` 目录）

---

## 代码库规范

- 分支命名：`feature/<描述>` / `fix/<描述>`
- 每完成 dev-plan 一个阶段提交一次
- 禁止 force push main
- 不提交 `.env` 或含密钥的文件

---

## 测试

- 暂无自动化测试框架
- 手动回归：对照 dev-plan 回归检查清单逐项验证

---

## 注意（Gotchas）

- 暗色主题只用 Tailwind 自定义颜色（`bg-base` 等），不要混用 Tailwind 默认色板，否则一致性会乱
- 双语字段结构统一为 `{ zh: string; en: string }`，在数据文件中定义，组件中根据 `i18n.language` 取值——不要在组件里硬编码文案
- Framer Motion `whileInView` 必须设置 `once: true`，否则每次滚动进出都会重播动画
- 项目截图放 `public/` 目录，构建时 `vite-imagetools` 自动处理；引用时直接用路径字符串
- 移动端测试必须用真机或 DevTools 设备模拟，不能只缩放浏览器窗口
- Vercel 部署后检查 `sitemap.xml` 可访问，spa 模式下需确保 `robots.txt` 在 `public/` 根目录

---

## 技术栈

- React 18 + TypeScript 5 + Vite 5
- Tailwind CSS 3（自定义色彩 token）
- Framer Motion 11（滚动动画 + 微交互）
- react-i18next 15（双语切换 + localStorage 持久化）
- vite-imagetools（WebP + 响应式图片）
- react-helmet-async（SEO meta）
- Vercel（部署 + CDN）
