import { aiPractices, aiPrinciples, aiTools } from '../data'
import { Check, Spark } from './icons'
import { Eyebrow, Lead, Section, SectionHeading } from './ui'

export default function AIEngineering() {
  return (
    <Section id="ai" className="border-t border-white/10">
      <Eyebrow>AI-enabled engineering</Eyebrow>
      <SectionHeading>AI-Enabled Engineering</SectionHeading>
      <Lead>
        I focus on applying AI where it creates real engineering leverage: reducing friction,
        accelerating codebase understanding, improving documentation, supporting prototyping, and
        helping teams move faster — without lowering the bar.
      </Lead>

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Tools */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            Tools I use & explore
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {aiTools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 transition-colors hover:border-accent/30 hover:bg-white/[0.045]"
              >
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-accent/10 text-accent">
                  <Spark width={16} height={16} />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-paper">{tool.name}</span>
                    {tool.tag && (
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-soft">
                        {tool.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{tool.note}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {aiPractices.map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-muted"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Responsible adoption */}
        <aside className="rounded-2xl border border-accent/20 bg-gradient-to-b from-accent/[0.08] to-transparent p-6">
          <h3 className="text-base font-semibold text-paper">Responsible adoption</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Productivity must never come at the cost of maintainability. The bar stays where it
            belongs.
          </p>
          <ul className="mt-5 space-y-3">
            {aiPrinciples.map((principle) => (
              <li key={principle} className="flex items-start gap-3 text-sm text-paper">
                <Check width={16} height={16} className="mt-0.5 shrink-0 text-accent" />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Section>
  )
}
