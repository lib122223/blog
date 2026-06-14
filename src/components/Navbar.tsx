import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { useScrollSpy } from '../hooks/useScrollSpy'
import LanguageSwitch from './LanguageSwitch'

const NAV_KEYS = ['home', 'projects', 'skills', 'contact'] as const

export default function Navbar() {
  const { t } = useTranslation()
  const activeId = useScrollSpy()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleClick = (id: string) => {
    setIsOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-12 md:h-14 bg-bg-elevated/80 backdrop-blur-sm border-b border-bg-divider">
      <div className="max-w-3xl mx-auto px-5 h-full flex items-center justify-between">
        <button
          onClick={() => handleClick('hero')}
          className="font-mono text-lg font-semibold text-text-primary tracking-tight"
        >
          {'<Dev />'}
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {NAV_KEYS.map((key) => (
            <li key={key}>
              <button
                onClick={() => handleClick(key)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-accent ${
                  activeId === key ? 'text-accent' : 'text-text-secondary'
                }`}
              >
                {t(`nav.${key}`)}
              </button>
            </li>
          ))}
          <li>
            <LanguageSwitch />
          </li>
        </ul>

        {/* Hamburger button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-6 h-5 flex flex-col justify-between"
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-full bg-text-primary rounded transition-all duration-300 origin-center ${
            isOpen ? 'rotate-45 translate-y-[9px]' : ''
          }`} />
          <span className={`block h-0.5 w-full bg-text-primary rounded transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`} />
          <span className={`block h-0.5 w-full bg-text-primary rounded transition-all duration-300 origin-center ${
            isOpen ? '-rotate-45 -translate-y-[9px]' : ''
          }`} />
        </button>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-12 z-40 bg-bg-base/80"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 right-0 w-64 h-full bg-bg-elevated border-l border-bg-divider pt-8"
            >
              <ul className="flex flex-col gap-6 px-8">
                {NAV_KEYS.map((key) => (
                  <li key={key}>
                    <button
                      onClick={() => handleClick(key)}
                      className={`text-base font-medium transition-colors duration-200 hover:text-accent ${
                        activeId === key ? 'text-accent' : 'text-text-secondary'
                      }`}
                    >
                      {t(`nav.${key}`)}
                    </button>
                  </li>
                ))}
                <li>
                  <LanguageSwitch />
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
