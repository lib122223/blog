import { useState, useRef, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '../types'

type Lang = 'zh' | 'en'
type Side = 'left' | 'right' | null

interface Props {
  projects: Project[]
  onSelect: (p: Project) => void
}

export default function ProjectCarousel({ projects, onSelect }: Props) {
  const { i18n } = useTranslation()
  const lang = i18n.language as Lang
  const [index, setIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [side, setSide] = useState<Side>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const wrap = (i: number) => ((i % projects.length) + projects.length) % projects.length
  const prevIdx = wrap(index - 1)
  const nextIdx = wrap(index + 1)

  const goTo = useCallback((next: number) => {
    clearHover()
    setDir(next > index ? 1 : -1)
    setIndex(next)
  }, [index])

  const prev = () => goTo(prevIdx)
  const next = () => goTo(nextIdx)

  const clearHover = useCallback(() => {
    setSide(null)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const handleEdgeEnter = (s: Side, e: React.MouseEvent) => {
    setSide(s)
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleEdgeMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleEdgeLeave = () => {
    clearHover()
  }

  // Auto-advance after hovering on edge for 800ms
  useEffect(() => {
    if (!side) return
    timerRef.current = setTimeout(() => {
      if (side === 'left') prev()
      else next()
    }, 800)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [side])

  const curr = projects[index]
  const prevProj = projects[prevIdx]
  const nextProj = projects[nextIdx]

  const edgeZoneClass = 'absolute top-0 bottom-0 w-[18%] z-20 cursor-pointer'
  const peakClass = 'absolute inset-y-0 w-[22%] -left-[2%] z-0'
  const currImgClass = 'absolute inset-x-[18%] inset-y-0 z-10'

  return (
    <div className="relative -mx-5 md:-mx-0 md:w-[100vw] md:ml-[calc(50%-50vw)] select-none">
      <div className="relative overflow-hidden bg-bg-base">
        <div className="h-[50vh] md:h-[65vh] relative" onMouseLeave={handleEdgeLeave}>
          <AnimatePresence initial={false} custom={dir}>
            {/* Previous peek */}
            <motion.div
              key={`prev-${prevIdx}`}
              custom={dir}
              initial={{ x: '-5%', opacity: 0 }}
              animate={{ x: '0%', opacity: 1 }}
              exit={{ x: '-15%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className={peakClass}
            >
              <img src={prevProj.thumbnail} alt="" className="w-full h-full object-cover opacity-25" />
            </motion.div>

            {/* Next peek */}
            <motion.div
              key={`next-${nextIdx}`}
              custom={dir}
              initial={{ x: '5%', opacity: 0 }}
              animate={{ x: '0%', opacity: 1 }}
              exit={{ x: '15%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className={`${peakClass} -left-0 -right-[2%] left-auto`}
            >
              <img src={nextProj.thumbnail} alt="" className="w-full h-full object-cover opacity-25" />
            </motion.div>

            {/* Current */}
            <motion.div
              key={`curr-${index}`}
              custom={dir}
              initial={{ x: dir > 0 ? '8%' : '-8%', opacity: 0 }}
              animate={{ x: '0%', opacity: 1 }}
              exit={{ x: dir > 0 ? '-8%' : '8%', opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className={currImgClass}
            >
              <div className="w-full h-full cursor-pointer group relative" onClick={() => onSelect(curr)}>
                <img src={curr.thumbnail} alt={curr.title} className="w-full h-full object-contain" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-bg-base/80 backdrop-blur-sm text-text-primary px-5 py-2.5 rounded-full text-sm font-mono">
                    {lang === 'zh' ? '查看详情' : 'View Details'}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Left edge zone */}
          <div
            className={`${edgeZoneClass} left-0`}
            onMouseEnter={(e) => handleEdgeEnter('left', e)}
            onMouseMove={handleEdgeMove}
            onClick={prev}
          />

          {/* Right edge zone */}
          <div
            className={`${edgeZoneClass} right-0`}
            onMouseEnter={(e) => handleEdgeEnter('right', e)}
            onMouseMove={handleEdgeMove}
            onClick={next}
          />

          {/* Floating cursor-following button */}
          <AnimatePresence>
            {side && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed z-50 pointer-events-none"
                style={{
                  left: mousePos.x + (side === 'left' ? 16 : -16),
                  top: mousePos.y,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="bg-accent text-bg-base rounded-full px-4 py-2 text-xs font-mono font-semibold shadow-lg">
                  {side === 'left'
                    ? (lang === 'zh' ? '← 上一个' : '← Prev')
                    : (lang === 'zh' ? '下一个 →' : 'Next →')}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between max-w-3xl mx-auto px-5 mt-6">
        <span className="text-xs text-text-muted font-mono">
          {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
        </span>

        <div className="flex gap-1.5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-accent' : 'w-4 bg-bg-divider hover:bg-text-muted'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-4 text-xs text-text-muted">
          <button onClick={prev} className="hover:text-text-primary transition-colors">
            &#8592;
          </button>
          <button onClick={next} className="hover:text-text-primary transition-colors">
            &#8594;
          </button>
        </div>
      </div>
    </div>
  )
}
