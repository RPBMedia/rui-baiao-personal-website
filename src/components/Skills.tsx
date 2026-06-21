import { skillGroups } from '../data'
import { Eyebrow, Section, SectionHeading } from './ui'

export default function Skills() {
  return (
    <Section id="skills" className="border-t border-white/10">
      <Eyebrow>Technical & leadership skillset</Eyebrow>
      <SectionHeading>A toolkit spanning people, platforms, and AI.</SectionHeading>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-7"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-paper">{group.title}</h3>
              <span className="font-mono text-xs text-muted">{group.skills.length}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/40 hover:text-paper"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
