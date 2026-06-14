import { useTranslation } from 'react-i18next'

export default function LanguageSwitch() {
  const { i18n } = useTranslation()

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')
  }

  return (
    <button
      onClick={toggle}
      className="text-sm font-mono text-text-secondary hover:text-accent transition-colors duration-200"
    >
      {i18n.language === 'zh' ? 'EN' : '中'}
    </button>
  )
}
