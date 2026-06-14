# 个人作品集网站 — UI 设计规范

## 设计原则

- **暗色开发者风格**：以暗色基底降低视觉疲劳，彩色细节引导注意力，参考 Tamal Sen（tamalsen.dev）
- **内容优先**：视觉设计服务于项目叙事，不喧宾夺主
- **移动友好**：触控区域 ≥ 44px，移动端导航折叠，图片自适应
- **一致性**：间距、色彩、动效全站统一，通过 Tailwind 配置和 CSS 变量约束

## 色彩系统

### 背景色阶

| Token | 色值 | 用途 |
|-------|------|------|
| `bg-base` | `#0a0a0f` | 页面底色（最深） |
| `bg-surface` | `#12121a` | 卡片、区块背景 |
| `bg-elevated` | `#1a1a24` | 弹窗、导航条背景 |
| `bg-divider` | `#2a2a35` | 分隔线 |

### 前景色阶

| Token | 色值 | 用途 |
|-------|------|------|
| `text-primary` | `#e8e8ed` | 主文字（标题、正文） |
| `text-secondary` | `#9d9dab` | 次要文字（描述、日期） |
| `text-muted` | `#5c5c6e` | 辅助信息（页脚） |

### 强调色

| Token | 色值 | 用途 |
|-------|------|------|
| `accent` | `#64ffda` | 全局强调（hover 状态、分隔线、链接、返回顶部按钮） |
| `accent-backend` | `#4caf50` | 后端技能 tag |
| `accent-frontend` | `#42a5f5` | 前端技能 tag |
| `accent-tools` | `#ff9800` | 工具与平台 tag |

## 字体层级

### 字体选型

| 角色 | 字体 | 来源 |
|------|------|------|
| 标题（Hero 姓名、区块标题） | JetBrains Mono | Google Fonts |
| 正文、辅助文字 | system-ui, -apple-system, 'Noto Sans SC', sans-serif | 系统字体栈 |

> 备选等宽字体：`'Fira Code', 'Cascadia Code', monospace`

### 字号层级

| 层级 | 桌面 | 移动（< 768px） | 粗细 |
|------|------|-----------------|------|
| Hero 姓名 | 48px | 32px | Bold (700) |
| 区块标题 | 28px | 22px | SemiBold (600) |
| 正文 | 16px | 15px | Regular (400) |
| 辅助文字 | 14px | 13px | Regular (400) |

### 行高与间距

| 场景 | 值 |
|------|------|
| 标题行高 | 1.2 |
| 正文行高 | 1.6 |
| 区块间距 | 80px（桌面） / 48px（移动） |

## 全局布局

| 属性 | 桌面（≥ 1024px） | 平板（768-1023px） | 手机（< 768px） |
|------|------------------|--------------------|--------------------|
| 最大内容宽度 | 960px，居中 | 90%，居中 | 100%，两侧 20px padding |

## 组件规格

### Navbar（浮动导航条）

- **桌面**：顶部固定，`bg-elevated` 半透明 + `backdrop-blur`，高度 56px。左侧 Logo（姓名，JetBrains Mono），右侧锚点链接（Hero / 项目 / 技能 / 联系）+ 语言切换按钮。当前区块对应锚点高亮为 `accent` 色。
- **移动**：顶部固定 48px，Logo 左 + 汉堡菜单右。点击汉堡展开全屏菜单面板，Framer Motion 从右侧滑入，点击锚点后自动关闭。
- 所有锚点点击平滑滚动（`scroll-behavior: smooth`）。

### Hero

- 全视口高度（`min-height: 100vh`），flex 居中布局。
- 内容自上而下：头像（圆形，120px，border: 2px solid accent）→ 姓名（JetBrains Mono, 48px/32px Bold, `text-primary`）→ 职称（16px/15px, `text-secondary`）→ 个人简介（16px, `text-secondary`, 最大宽度 600px）。
- 底部滚动提示：向下的微动画箭头，引导用户继续滚动。

### ProjectCard

- `bg-surface` 背景，圆角 12px，`overflow: hidden`。
- 上方截图区（16:9 比例，`object-fit: cover`），下方文字区（padding 24px）。
- 文字区：项目名称（20px SemiBold, `text-primary`）→ 简短描述（14px, `text-secondary`）→ 技术标签行（SkillTag 组件）→ 底部链接行（源码/演示，`accent` 色文本链接）。
- hover 交互：卡片 `translateY(-4px)` + `box-shadow` 增强，过渡 `200ms ease`。
- 点击卡片打开 ProjectDetail 弹窗（P1）。

### SkillTag

- 内联标签，圆角 6px，padding `4px 12px`，字号 14px，`font-weight: 500`。
- 配色规则：`backend` 类别 → `accent-backend`，`frontend` → `accent-frontend`，`tools` → `accent-tools`。
- 背景为对应强调色的 15% 透明度，文字为对应强调色。

### BackToTop

- 右下角固定定位，距底部 24px，距右侧 24px，`z-index: 50`。
- 圆形按钮，44×44px，`accent` 色背景，白色箭头图标（向上）。
- 滚动超过一屏高度后出现（`opacity: 0 → 1`，过渡 300ms），未超过时 `pointer-events: none`。
- 点击平滑滚动回顶部。

### Contact

- 页面底部最后一个区块，`text-secondary`，居中布局。
- 邮箱（可点击 `mailto:` 链接，JetBrains Mono）+ 社交图标行。
- 社交图标：24px，间距 16px，hover 时颜色过渡为 `accent`。支持 GitHub / LinkedIn / Twitter 可选。

## 页面交互规范

### 单页滚动体验

```
页面加载 → Hero 全屏展示
  → 用户向下滚动
    → Navbar 高亮实时跟随当前区块
    → 各区块依次入场（Framer Motion whileInView，向上淡入 30px，duration 0.5s）
    → 技能 tag 逐个出现（staggerChildren: 0.05s）
  → 滚动超过一屏 → BackToTop 渐显
  → 到达页面底部 → Contact 区块
```

### 项目详情弹窗（P1）

```
点击 ProjectCard
  → 页面叠加半透明遮罩（bg-base 80% 透明度）
  → 弹窗居中弹出（Framer Motion scale 0.9→1.0 + opacity）
  → 内容：大截图 + 项目背景 + 技术方案 + 成果数据
  → 关闭方式：点击遮罩 / 按 Esc / 点击关闭按钮
  → 出场动画反向
  → 弹窗打开时 body 禁止滚动（overflow: hidden）
```

### 移动端汉堡菜单

```
点击汉堡图标
  → 图标变为关闭图标（旋转动画 300ms）
  → 全屏面板从右侧滑入（Framer Motion, x: '100%' → 0）
  → 菜单项：锚点链接 + 语言切换，纵向排列，间距 24px
  → 点击任意菜单项 → 关闭面板 + 平滑滚动到目标区块
```

### 语言切换

```
点击 LanguageSwitch
  → i18next.changeLanguage() 切换
  → 页面内文本即时替换，无闪烁
  → localStorage 持久化偏好
  → 首次访问默认中文
```

### 骨架屏（P1）

```
页面首次加载 → 各区块显示对应骨架屏：
  Hero     → 圆形占位 + 两行文字占位
  Skills   → 6 个圆角矩形 tag 占位
  Projects → 3 张卡片占位（灰色矩形模拟截图）
  → 内容渲染完成后骨架屏淡出（opacity 过渡 400ms）
```

