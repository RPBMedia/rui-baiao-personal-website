import { timeline } from '../data'
import { Eyebrow, Section, SectionHeading } from './ui'

export default function CareerTimeline() {
  return (
    <Section id="timeline" className="border-t border-white/10">
      <Eyebrow>Selected career timeline</Eyebrow>
      <SectionHeading>Fifteen years, mapped.</SectionHeading>

      <ol className="relative mt-12 border-l border-white/10 pl-6 sm:pl-8">
        {timeline.map((item, i) => (
          <li key={`${item.company}-${i}`} className="relative pb-9 last:pb-0">
            <span
              className={[
                'absolute -left-[34px] top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border sm:-left-[42px]',
                item.kind === 'education'
                  ? 'border-white/30 bg-ink'
                  : 'border-accent/60 bg-accent/20',
              ].join(' ')}
              aria-hidden
            >
              {item.kind === 'work' && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
            </span>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-xs uppercase tracking-[0.12em] text-accent-soft">
                {item.period}
              </span>
              {item.kind === 'education' && (
                <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                  Education
                </span>
              )}
            </div>

            <h3 className="mt-1.5 text-base font-semibold text-paper">
              {item.role}{' '}
              <span className="font-normal text-muted">· {item.company}</span>
            </h3>
            <p className="text-sm text-muted">{item.location}</p>
            {item.note && <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.note}</p>}
          </li>
        ))}
      </ol>
    </Section>
  )
}
