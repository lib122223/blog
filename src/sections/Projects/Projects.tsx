import { projects } from '../../data/projects'
import ProjectCard from '../../components/ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="py-20 scroll-mt-14">
      <h2 className="font-mono text-[22px] md:text-[28px] font-semibold text-text-primary mb-12 text-center">
        项目
      </h2>

      <div className="flex flex-col gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
