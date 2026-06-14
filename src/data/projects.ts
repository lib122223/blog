import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'project-1',
    title: '个人作品集网站',
    description: {
      zh: 'React + TypeScript + Tailwind CSS 构建的暗色风格全栈开发者作品集，支持中英双语切换。',
      en: 'A dark-themed full-stack developer portfolio built with React, TypeScript and Tailwind CSS, with bilingual support.',
    },
    thumbnail: '/projects/portfolio-thumb.jpg',
    techTags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    sourceUrl: 'https://github.com/lib122223/blog',
    demoUrl: 'https://your-domain.vercel.app',
    detail: {
      background: {
        zh: '需要一个展示全栈开发能力的个人网站，面向招聘方和技术合作者。',
        en: 'Needed a personal site to showcase full-stack development capabilities for recruiters and technical collaborators.',
      },
      approach: {
        zh: '采用 React 18 + Vite 5 构建，Framer Motion 实现滚动动画，react-i18next 处理双语。',
        en: 'Built with React 18 + Vite 5, Framer Motion for scroll animations, react-i18next for bilingual support.',
      },
      result: {
        zh: 'Lighthouse 评分 90+，首屏加载 < 2.5s，支持移动端响应式。',
        en: 'Lighthouse score 90+, first contentful paint < 2.5s, fully responsive.',
      },
    },
  },
  {
    id: 'project-2',
    title: '电商后台管理系统',
    description: {
      zh: '基于 Next.js + Prisma + PostgreSQL 的全栈电商管理面板，支持商品管理、订单处理和数据分析。',
      en: 'A full-stack e-commerce admin panel with product management, order processing, and analytics built on Next.js + Prisma + PostgreSQL.',
    },
    thumbnail: '/projects/admin-thumb.jpg',
    techTags: ['Next.js', 'Prisma', 'PostgreSQL', 'TypeScript'],
    sourceUrl: 'https://github.com/lib122223/ecommerce-admin',
    detail: {
      background: {
        zh: '电商平台需要一个高效的后台管理系统来管理商品、订单和用户数据。',
        en: 'An e-commerce platform needed an efficient admin panel for managing products, orders, and user data.',
      },
      approach: {
        zh: '基于 Next.js App Router 构建，Prisma ORM 管理数据库，PostgreSQL 存储核心业务数据。',
        en: 'Built with Next.js App Router, Prisma ORM for database management, PostgreSQL for core business data.',
      },
      result: {
        zh: '支持 10万+ 商品管理，订单处理速度提升 3 倍，后台页面加载 < 1s。',
        en: 'Supports 100K+ product management, 3x order processing improvement, admin page load < 1s.',
      },
    },
  },
  {
    id: 'project-3',
    title: 'CLI 工具',
    description: {
      zh: '用 Node.js 编写的命令行工具，自动生成项目脚手架和模板代码，提升团队开发效率。',
      en: 'A Node.js CLI tool that scaffolds project templates and boilerplate code, boosting team productivity.',
    },
    thumbnail: '/projects/cli-thumb.jpg',
    techTags: ['Node.js', 'TypeScript', 'Commander.js'],
    sourceUrl: 'https://github.com/lib122223/cli-tool',
    detail: {
      background: {
        zh: '团队每个新项目都需要手动搭建目录结构和配置，重复工作多且容易出错。',
        en: 'Every new project required manual directory scaffolding and configuration, leading to repetitive work and errors.',
      },
      approach: {
        zh: '使用 Commander.js 解析 CLI 参数，结合 EJS 模板引擎动态生成代码文件。',
        en: 'Used Commander.js for CLI argument parsing with EJS templates for dynamic code generation.',
      },
      result: {
        zh: '新项目初始化从 30 分钟缩短到 30 秒，团队成员广泛采用。',
        en: 'Reduced project initialization from 30 minutes to 30 seconds, widely adopted by the team.',
      },
    },
  },
]
