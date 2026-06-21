import { leadershipPrinciples } from '../data'
import { Eyebrow, Lead, Section, SectionHeading } from './ui'

export default function LeadershipPhilosophy() {
  return (
    <Section id="leadership" className="border-t border-white/10">
      <Eyebrow>Leadership philosophy</Eyebrow>
      <SectionHeading>How I lead.</SectionHeading>
      <Lead>
        Leadership, for me, is mostly about removing friction so capable people can do excellent
        work — and being honest when the road gets rough.
      </Lead>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {leadershipPrinciples.map((p, i) => (
          <div
            key={p.title}
            className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-accent/30 hover:bg-white/[0.04]"
          >
            <span className="font-mono text-xs text-muted">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-3 text-base font-semibold text-paper">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            <span className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-accent/60 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
          </div>
        ))}
      </div>
    </Section>
  )
}
