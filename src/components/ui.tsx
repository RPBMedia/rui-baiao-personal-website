import type { ReactNode } from 'react'

// Shared layout + presentational primitives so sections stay consistent.

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`relative scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-accent">
      <span className="h-px w-6 bg-accent/60" aria-hidden />
      {children}
    </p>
  )
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight text-paper sm:text-[2.6rem] sm:leading-[1.1]">
      {children}
    </h2>
  )
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{children}</p>
}

export function Card({
  children,
  className = '',
  interactive = true,
}: {
  children: ReactNode
  className?: string
  interactive?: boolean
}) {
  return (
    <div
      className={[
        'rounded-2xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-sm',
        interactive
          ? 'transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.045]'
          : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  )
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-paper">
      {children}
    </span>
  )
}
