import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'framer-motion'
import { useEditableProjects } from '../../hooks/useEditableProjects'
import ProjectCarousel from '../../components/ProjectCarousel'
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
      <div className="flex items-center justify-center mb-12">
        {import.meta.env.DEV ? (
          <button
            onClick={() => setEditing(true)}
            className="font-mono text-[22px] md:text-[28px] font-semibold text-text-primary hover:text-accent transition-colors"
          >
            {t('projects.title')}
          </button>
        ) : (
          <h2 className="font-mono text-[22px] md:text-[28px] font-semibold text-text-primary">
            {t('projects.title')}
          </h2>
        )}
      </div>

      <ProjectCarousel projects={projects} onSelect={setSelected} />

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
