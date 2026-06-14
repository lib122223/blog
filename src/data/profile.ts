import type { Profile } from '../types'

export const profile: Profile = {
  name: 'Your Name',
  title: {
    zh: 'Java 全栈开发者',
    en: 'Java Full-Stack Developer',
  },
  avatar: '/avatar.jpg',
  bio: {
    zh: '热衷于用 Java Spring Boot、Spring Cloud 微服务和 React 构建优雅、高性能的网页应用。',
    en: 'Passionate about building elegant, high-performance web applications with Java Spring Boot, Spring Cloud microservices, and React.',
  },
  email: 'hello@example.com',
  socialLinks: {
    github: 'https://github.com/lib122223',
    linkedin: 'https://linkedin.com/in/yourname',
  },
}
