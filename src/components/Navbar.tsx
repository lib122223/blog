import { useScrollSpy } from '../hooks/useScrollSpy'

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: '项目' },
  { id: 'skills', label: '技能' },
  { id: 'contact', label: '联系' },
]

export default function Navbar() {
  const activeId = useScrollSpy()

  const handleClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-14 bg-bg-elevated/80 backdrop-blur-sm border-b border-bg-divider">
      <div className="max-w-3xl mx-auto px-5 h-full flex items-center justify-between">
        <button
          onClick={() => handleClick('hero')}
          className="font-mono text-lg font-semibold text-text-primary tracking-tight"
        >
          {'<Dev />'}
        </button>

        <ul className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-accent ${
                  activeId === item.id ? 'text-accent' : 'text-text-secondary'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
