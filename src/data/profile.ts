import type { Profile } from '../types'

export const profile: Profile = {
  name: 'Your Name',
  title: {
    zh: '全栈开发者',
    en: 'Full-Stack Developer',
  },
  avatar: '/avatar.jpg',
  bio: {
    zh: '热爱构建优雅、高性能的 Web 应用，专注于 React、Node.js 和云原生技术。',
    en: 'Passionate about building elegant, performant web applications with React, Node.js, and cloud-native technologies.',
  },
  email: 'hello@example.com',
  socialLinks: {
    github: 'https://github.com/lib122223',
    linkedin: 'https://linkedin.com/in/yourname',
  },
}
