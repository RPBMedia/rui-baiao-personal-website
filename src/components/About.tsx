import { profile } from '../data'
import { Card, Eyebrow, Section, SectionHeading } from './ui'

const facts = [
  { label: 'Based in', value: profile.location },
  { label: 'Currently', value: 'Volvo Cars — Engineering Manager' },
  { label: 'Focus', value: 'Platforms, teams & AI-enabled delivery' },
  { label: 'Languages', value: profile.languages.join(', ') },
]

export default function About() {
  return (
    <Section id="about">
      <Eyebrow>About</Eyebrow>
      <SectionHeading>Engineering leadership with deep technical roots.</SectionHeading>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            I'm an Engineering Manager with 15+ years across software engineering, Agile coaching,
            team leadership, and technical strategy. My path runs through automotive, software asset
            management, energy, multimedia, education, IoT, and consulting — both in-house and on the
            front line with clients.
          </p>
          <p>
            I lead cross-functional teams, deliver scalable web platforms, and work
            shoulder-to-shoulder with Product and Engineering to shape environments where senior
            engineers can do their best work. I'm comfortable moving between architecture, delivery
            strategy, people leadership, and the organizational alignment that makes all three
            actually land.
          </p>
          <p className="text-paper">
            Known for fairness, transparency, and a sense of humor that keeps teams grounded when the
            road gets rough.
          </p>
        </div>

        <Card interactive={false} className="h-fit">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Quick facts</h3>
          <dl className="mt-4 divide-y divide-white/10">
            {facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[5.5rem_1fr] gap-4 py-3.5">
                <dt className="text-sm text-muted">{f.label}</dt>
                <dd className="text-sm text-paper">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </Section>
  )
}
