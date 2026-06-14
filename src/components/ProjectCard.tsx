import { motion } from 'framer-motion'
import type { Project } from '../types'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-bg-surface rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="aspect-video bg-bg-elevated">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          {project.title}
        </h3>

        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
          {project.description.zh}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.techTags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-md px-3 py-1 text-xs font-medium bg-bg-elevated text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 text-sm">
          {project.sourceUrl && (
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              源码
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              演示
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
