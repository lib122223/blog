import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import type { Project } from '../types'

type Lang = 'zh' | 'en'

interface Props {
  project: Project
  onClick?: () => void
}

export default function ProjectCard({ project, onClick }: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as Lang

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`group bg-bg-surface rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/5 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Image - dominant */}
      <div className="relative overflow-hidden bg-bg-elevated">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-48 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Tags overlayed on image */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-bg-surface/90 to-transparent">
          <div className="flex flex-wrap gap-1.5">
            {project.techTags.map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-md px-2.5 py-1 text-xs font-medium bg-bg-base/70 text-text-secondary backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-3 group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-5">
          {project.description[lang]}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-sm">
            {project.sourceUrl && (
              <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline" onClick={(e) => e.stopPropagation()}>
                {t('projects.source')}
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline" onClick={(e) => e.stopPropagation()}>
                {t('projects.demo')}
              </a>
            )}
          </div>
          {onClick && (
            <span className="text-xs text-text-muted group-hover:text-accent transition-colors">
              {lang === 'zh' ? '查看详情 →' : 'Details →'}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
