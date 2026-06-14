import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import BackToTop from './components/BackToTop'
import Hero from './sections/Hero/Hero'
import Projects from './sections/Projects/Projects'
import Skills from './sections/Skills/Skills'
import Contact from './sections/Contact/Contact'
import { HeroSkeleton, ProjectsSkeleton, SkillsSkeleton } from './components/Skeleton'

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1500)
    return () => clearTimeout(t)
  }, [])

  if (!ready) {
    return (
      <>
        <Navbar />
        <main className="max-w-3xl mx-auto px-5">
          <HeroSkeleton />
          <ProjectsSkeleton />
          <SkillsSkeleton />
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-5">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <BackToTop />
    </>
  )
}
