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
  },
]
