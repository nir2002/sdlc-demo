import type { ReactNode } from 'react'

type PageIntroProps = {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
}

export function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold tracking-wide text-pink-400 uppercase">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-6xl">{title}</h1>
      {children && <p className="mt-5 text-lg text-zinc-400">{children}</p>}
    </div>
  )
}
