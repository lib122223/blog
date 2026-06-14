import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { Project } from '../../types'

type Lang = 'zh' | 'en'

interface Props {
  project: Project
  onClose: () => void
}

export default function ProjectDetail({ project, onClose }: Props) {
  const { i18n } = useTranslation()
  const lang = i18n.language as Lang

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project.detail) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-bg-base/80 flex items-center justify-center p-5"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-bg-elevated rounded-xl max-w-[720px] w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="aspect-video bg-bg-surface">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <h2 className="font-mono text-xl md:text-2xl font-semibold text-text-primary">
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-text-primary transition-colors text-2xl leading-none"
            >
              &#x2715;
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.techTags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-md px-3 py-1 text-xs font-medium bg-bg-surface text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-5 text-sm leading-relaxed">
            <div>
              <h3 className="text-accent font-semibold mb-1">
                {lang === 'zh' ? '项目背景' : 'Background'}
              </h3>
              <p className="text-text-secondary">{project.detail.background[lang]}</p>
            </div>

            <div>
              <h3 className="text-accent font-semibold mb-1">
                {lang === 'zh' ? '技术方案' : 'Approach'}
              </h3>
              <p className="text-text-secondary">{project.detail.approach[lang]}</p>
            </div>

            <div>
              <h3 className="text-accent font-semibold mb-1">
                {lang === 'zh' ? '项目成果' : 'Results'}
              </h3>
              <p className="text-text-secondary">{project.detail.result[lang]}</p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline"
              >
                {lang === 'zh' ? '查看源码' : 'Source Code'}
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline"
              >
                {lang === 'zh' ? '在线演示' : 'Live Demo'}
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
