import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'project-1',
    title: '个人作品集网站',
    description: {
      zh: 'React + TypeScript + Tailwind CSS 构建的暖色风格全栈开发者作品集，支持中英双语切换和在线编辑。',
      en: 'A warm-themed full-stack developer portfolio built with React, TypeScript and Tailwind CSS, with bilingual support and online editing.',
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
        zh: '采用 React 19 + Vite 8 构建，Framer Motion 实现滚动动画，react-i18next 处理双语。',
        en: 'Built with React 19 + Vite 8, Framer Motion for scroll animations, react-i18next for bilingual support.',
      },
      result: {
        zh: 'Lighthouse 评分 90+，首屏加载 < 2.5s，支持移动端响应式。',
        en: 'Lighthouse score 90+, first contentful paint < 2.5s, fully responsive.',
      },
    },
  },
  {
    id: 'project-2',
    title: '大麦项目',
    description: {
      zh: '基于 Java Spring Boot + Spring Cloud 微服务架构的票务平台，集成 MySQL + Redis 处理高并发抢票场景。',
      en: 'A ticket platform built on Java Spring Boot + Spring Cloud microservices, with MySQL + Redis for high-concurrency ticket booking.',
    },
    thumbnail: '/projects/damai-thumb.jpg',
    techTags: ['Java', 'Spring Boot', 'Spring Cloud', 'MySQL', 'Redis'],
    sourceUrl: 'https://github.com/lib122223/damai',
    detail: {
      background: {
        zh: '大型演出票务场景需要应对瞬时高并发请求，保证库存一致性和用户体验。',
        en: 'Large-scale event ticketing needs to handle instant high-concurrency requests while ensuring inventory consistency.',
      },
      approach: {
        zh: '采用 Spring Cloud 微服务拆分，Redis 缓存预热 + 分布式锁控库存，MySQL 持久化订单数据。',
        en: 'Used Spring Cloud microservices, Redis cache preheating + distributed locks for inventory control, MySQL for order persistence.',
      },
      result: {
        zh: '支持万级 QPS 并发抢票，库存零超卖，接口响应 < 100ms。',
        en: 'Supports 10K+ QPS concurrent booking, zero overselling, API response < 100ms.',
      },
    },
  },
  {
    id: 'project-3',
    title: '历史复制粘贴小工具',
    description: {
      zh: '本地剪贴板历史管理工具，自动记录复制内容，支持搜索、分类和快速粘贴。',
      en: 'A local clipboard history manager that automatically records copied content with search, categorization, and quick paste.',
    },
    thumbnail: '/projects/clipboard-thumb.jpg',
    techTags: ['Electron', 'TypeScript', 'SQLite'],
    sourceUrl: 'https://github.com/lib122223/copy-paste',
    detail: {
      background: {
        zh: '日常开发中频繁复制粘贴，经常丢失之前复制的内容，需要一个本地历史管理工具。',
        en: 'Frequent copy-paste during development leads to losing previously copied content, needing a local history manager.',
      },
      approach: {
        zh: 'Electron 桌面应用 + SQLite 本地存储，全局快捷键监听，支持全文搜索历史记录。',
        en: 'Electron desktop app + SQLite local storage, global shortcut listener, full-text search for history.',
      },
      result: {
        zh: '自动记录 1000+ 条历史，快捷键调用 < 100ms，日常开发效率明显提升。',
        en: 'Auto-records 1000+ history items, shortcut invocation < 100ms, notably improved daily dev efficiency.',
      },
    },
  },
]
