import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'framer-motion'
import { useEditableProjects } from '../../hooks/useEditableProjects'
import ProjectCard from '../../components/ProjectCard'
import ProjectDetail from './ProjectDetail'
import ProjectEditor from '../../components/ProjectEditor'
import type { Project } from '../../types'

export default function Projects() {
  const { t } = useTranslation()
  const { projects, updateProject, deleteProject, addProject, resetProjects } = useEditableProjects()
  const [selected, setSelected] = useState<Project | null>(null)
  const [editing, setEditing] = useState(false)

  return (
    <section id="projects" className="py-20 scroll-mt-14">
      <div className="flex items-center justify-center gap-4 mb-12">
        <h2 className="font-mono text-[22px] md:text-[28px] font-semibold text-text-primary">
          {t('projects.title')}
        </h2>
        {import.meta.env.DEV && (
          <button
            onClick={() => setEditing(true)}
            className="text-xs text-text-muted hover:text-accent transition-colors"
          >
            &#9998; 编辑
          </button>
        )}
      </div>

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

      {import.meta.env.DEV && editing && (
        <ProjectEditor
          projects={projects}
          onUpdate={updateProject}
          onDelete={deleteProject}
          onAdd={addProject}
          onReset={resetProjects}
          onClose={() => setEditing(false)}
        />
      )}
    </section>
  )
}
