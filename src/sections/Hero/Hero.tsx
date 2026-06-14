import { useState } from 'react'
import { profile } from '../../data/profile'

export default function Hero() {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center scroll-mt-14 relative">
      <div className="w-[120px] h-[120px] rounded-full border-2 border-accent overflow-hidden mb-8 bg-bg-surface flex items-center justify-center">
        {imgFailed ? (
          <span className="font-mono text-3xl text-text-muted">
            {profile.name.charAt(0)}
          </span>
        ) : (
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-full object-cover"
            onError={() => setImgFailed(true)}
          />
        )}
      </div>

      <h1 className="font-mono text-[32px] md:text-[48px] font-bold text-text-primary mb-4">
        {profile.name}
      </h1>

      <p className="text-base md:text-lg text-text-secondary mb-6">
        {profile.title.zh}
      </p>

      <p className="text-sm md:text-base text-text-secondary max-w-[600px] text-center leading-relaxed">
        {profile.bio.zh}
      </p>

      <div className="absolute bottom-8 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5v14M12 19l-5-5M12 19l5-5"
            stroke="#9d9dab"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
