import { links, profile } from '../data'
import { ArrowUpRight, GitHub, LinkedIn, Mail, MapPin, Waveform } from './icons'
import { Eyebrow, Section } from './ui'

const channels = [
  { label: 'GitHub', href: links.github, icon: GitHub, external: true },
  { label: 'LinkedIn', href: links.linkedin, icon: LinkedIn, external: true },
  { label: 'Eon Rift', href: links.music, icon: Waveform, external: true },
]

export default function Contact() {
  return (
    <Section id="contact" className="border-t border-white/10">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-12">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-6rem] top-[-6rem] h-72 w-72 rounded-full bg-accent/15 blur-[110px]" />
        </div>

        <Eyebrow>Contact</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          Let's talk.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          Open to conversations about engineering leadership, platform teams, and pragmatic AI
          adoption. The fastest way to reach me is email.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={links.email}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft"
          >
            <Mail width={17} height={17} />
            {profile.email}
          </a>

          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? '_blank' : undefined}
              rel={c.external ? 'noreferrer' : undefined}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-paper transition-colors hover:border-white/30 hover:bg-white/[0.06]"
            >
              <c.icon width={17} height={17} />
              {c.label}
              <ArrowUpRight width={14} height={14} className="text-muted" />
            </a>
          ))}
        </div>

        <p className="mt-8 inline-flex items-center gap-2 text-sm text-muted">
          <MapPin width={16} height={16} className="text-accent" />
          {profile.location}
        </p>
      </div>
    </Section>
  )
}
