import Hero from './sections/Hero/Hero'
import Projects from './sections/Projects/Projects'
import Skills from './sections/Skills/Skills'
import Contact from './sections/Contact/Contact'

export default function App() {
  return (
    <main className="max-w-3xl mx-auto px-5">
      <Hero />
      <Projects />
      <Skills />
      <Contact />
    </main>
  )
}
