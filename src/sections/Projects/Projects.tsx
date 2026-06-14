import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'framer-motion'
import { projects } from '../../data/projects'
import ProjectCard from '../../components/ProjectCard'
import ProjectDetail from './ProjectDetail'
import type { Project } from '../../types'

export default function Projects() {
  const { t } = useTranslation()
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-20 scroll-mt-14">
      <h2 className="font-mono text-[22px] md:text-[28px] font-semibold text-text-primary mb-12 text-center">
        {t('projects.title')}
      </h2>

      <div className="flex flex-col gap-8">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={project.detail ? () => setSelected(project) : undefined}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectDetail
            project={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
