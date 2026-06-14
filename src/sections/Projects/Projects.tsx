import { useTranslation } from 'react-i18next'
import { projects } from '../../data/projects'
import ProjectCard from '../../components/ProjectCard'

export default function Projects() {
  const { t } = useTranslation()

  return (
    <section id="projects" className="py-20 scroll-mt-14">
      <h2 className="font-mono text-[22px] md:text-[28px] font-semibold text-text-primary mb-12 text-center">
        {t('projects.title')}
      </h2>

      <div className="flex flex-col gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
