import { Helmet } from 'react-helmet-async'

export default function SEO() {
  return (
    <Helmet
      title="个人作品集 - 全栈开发者"
      meta={[
        {
          name: 'description',
          content: '全栈开发者个人作品集，展示 React、Node.js、TypeScript 等技术栈项目经验。',
        },
        {
          property: 'og:title',
          content: '个人作品集 - 全栈开发者',
        },
        {
          property: 'og:description',
          content: '全栈开发者个人作品集，展示 React、Node.js、TypeScript 等技术栈项目经验。',
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ]}
      link={[
        {
          rel: 'canonical',
          href: 'https://blog-lib122224.vercel.app',
        },
      ]}
    />
  )
}
