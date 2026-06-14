import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { skills } from '../../data/skills'
import SkillTag from '../../components/SkillTag'
import type { Skill } from '../../types'

const categories = ['backend', 'frontend', 'tools'] as const

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
  const { t } = useTranslation()

  return (
    <section id="skills" className="min-h-screen py-20 scroll-mt-14 flex items-center justify-center">
      <div className="w-full">
        <h2 className="font-mono text-[22px] md:text-[28px] font-semibold text-text-primary mb-12 text-center">
          {t('skills.title')}
        </h2>

        {categories.map((cat) => {
          const group = skills.filter((s: Skill) => s.category === cat)
          return (
            <div key={cat} className="mb-10">
              <h3 className="text-sm text-text-muted mb-4 text-center md:text-left">
                {t(`skills.${cat}`)}
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
