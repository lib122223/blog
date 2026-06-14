function Block({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-bg-elevated rounded ${className ?? ''}`} />
  )
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-[120px] h-[120px] rounded-full bg-bg-elevated animate-pulse mb-4" />
      <Block className="h-10 w-48 mb-2" />
      <Block className="h-5 w-36 mb-4" />
      <Block className="h-4 w-[500px] max-w-full" />
    </div>
  )
}

export function SkillsSkeleton() {
  return (
    <div className="min-h-screen py-20 flex items-center justify-center">
      <div className="w-full">
        <Block className="h-8 w-24 mx-auto mb-12" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-10">
            <Block className="h-4 w-16 mb-4" />
            <div className="flex flex-wrap gap-3">
              {[...Array(i === 2 ? 3 : 5)].map((_, j) => (
                <Block key={j} className="h-8 w-20 rounded-md" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProjectsSkeleton() {
  return (
    <div className="py-20">
      <Block className="h-8 w-24 mx-auto mb-12" />
      <div className="flex flex-col gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-bg-surface rounded-xl overflow-hidden">
            <Block className="aspect-video rounded-none" />
            <div className="p-6 space-y-3">
              <Block className="h-6 w-48" />
              <Block className="h-4 w-full" />
              <Block className="h-4 w-3/4" />
              <div className="flex gap-2 pt-2">
                <Block className="h-6 w-16 rounded-md" />
                <Block className="h-6 w-16 rounded-md" />
                <Block className="h-6 w-16 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
