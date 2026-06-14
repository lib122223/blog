import { useState, useEffect } from 'react'
import { ProfileProvider } from './hooks/ProfileContext'
import Navbar from './components/Navbar'
import BackToTop from './components/BackToTop'
import SEO from './components/SEO'
import Hero from './sections/Hero/Hero'
import Projects from './sections/Projects/Projects'
import Skills from './sections/Skills/Skills'
import Contact from './sections/Contact/Contact'
import { HeroSkeleton, ProjectsSkeleton, SkillsSkeleton } from './components/Skeleton'

function AppContent() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1500)
    return () => clearTimeout(t)
  }, [])

  if (!ready) {
    return (
      <>
        <SEO />
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
      <SEO />
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

export default function App() {
  return (
    <ProfileProvider>
      <AppContent />
    </ProfileProvider>
  )
}
