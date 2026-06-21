import { experiences } from '../data'
import { Layers } from './icons'
import { Eyebrow, Lead, Section, SectionHeading } from './ui'

export default function ExperienceHighlights() {
  return (
    <Section id="experience" className="border-t border-white/10">
      <Eyebrow>Experience highlights</Eyebrow>
      <SectionHeading>Where I've led, and what shipped.</SectionHeading>
      <Lead>
        A closer look at the most recent chapters — leading platform and product teams that serve
        large, demanding user bases.
      </Lead>

      <div className="mt-12 space-y-5">
        {experiences.map((exp) => (
          <article
            key={exp.company}
            className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.035] sm:p-8"
          >
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-accent/10 text-accent">
                    <Layers width={18} height={18} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-paper">
                      {exp.company}
                    </h3>
                    <p className="text-sm text-accent-soft">{exp.role}</p>
                  </div>
                </div>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-muted">
                  {exp.period}
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                  {exp.location}
                </p>
              </div>

              <ul className="space-y-2.5">
                {exp.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                      aria-hidden
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted">
        Earlier roles span startups, consulting, telecom, energy, and motion design — see the{' '}
        <a href="#timeline" className="text-accent transition-colors hover:text-accent-soft">
          full timeline
        </a>{' '}
        below.
      </p>
    </Section>
  )
}
