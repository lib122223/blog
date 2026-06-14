import { motion } from 'framer-motion'
import { skills } from '../../data/skills'
import SkillTag from '../../components/SkillTag'
import type { Skill } from '../../types'

const categories = [
  { key: 'backend', label: '后端' },
  { key: 'frontend', label: '前端' },
  { key: 'tools', label: '工具与平台' },
] as const

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
}

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen py-20 scroll-mt-14 flex items-center justify-center">
      <div className="w-full">
        <h2 className="font-mono text-[22px] md:text-[28px] font-semibold text-text-primary mb-12 text-center">
          技能
        </h2>

        {categories.map(({ key, label }) => {
          const group = skills.filter((s: Skill) => s.category === key)
          return (
            <div key={key} className="mb-10">
              <h3 className="text-sm text-text-muted mb-4 text-center md:text-left">
                {label}
              </h3>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3 justify-center md:justify-start"
              >
                {group.map((s) => (
                  <motion.span key={s.name} variants={item}>
                    <SkillTag name={s.name} category={s.category} />
                  </motion.span>
                ))}
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
