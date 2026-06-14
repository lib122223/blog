import { useState, useEffect } from 'react'

const SECTION_IDS = ['hero', 'projects', 'skills', 'contact']

export function useScrollSpy(): string {
  const [activeId, setActiveId] = useState('hero')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (!el) continue

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id)
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    }

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return activeId
}
