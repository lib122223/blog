import type { Skill } from '../types'

const colorMap = {
  backend: 'text-accent-backend bg-accent-backend/15',
  frontend: 'text-accent-frontend bg-accent-frontend/15',
  tools: 'text-accent-tools bg-accent-tools/15',
}

export default function SkillTag({ name, category }: Skill) {
  return (
    <span className={`inline-block rounded-md px-3 py-1 text-sm font-medium ${colorMap[category]}`}>
      {name}
    </span>
  )
}
