import { links, profile } from '../data'
import { ArrowUpRight, GitHub, LinkedIn, Mail, MapPin, Spotify } from './icons'
import { Eyebrow, Section } from './ui'

interface Props {
  onContact: () => void
}

const channels = [
  { label: 'GitHub', href: links.github, icon: GitHub },
  { label: 'LinkedIn', href: links.linkedin, icon: LinkedIn },
  { label: 'Eon Rift', href: links.music, icon: Spotify },
]

export default function Contact({ onContact }: Props) {
  return (
    <Section id="contact" className="border-t border-accent/10">
      <div className="relative overflow-hidden rounded-3xl border border-accent/12 p-8 sm:p-12" style={{ background: 'linear-gradient(145deg, rgba(15,40,80,0.7) 0%, rgba(6,13,28,0.85) 100%)' }}>
        {/* Blue ambient glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-4rem] top-[-4rem] h-64 w-64 rounded-full bg-accent/12 blur-[100px]" />
          <div className="absolute bottom-[-4rem] left-[-4rem] h-48 w-48 rounded-full bg-accent/[0.07] blur-[80px]" />
        </div>

        <Eyebrow>Contact</Eyebrow>
        <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
          Let's talk.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
          Open to conversations about engineering leadership, platform teams, and pragmatic AI
          adoption. Hit the button and I'll get back to you.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onContact}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft"
          >
            <Mail width={17} height={17} />
            Send me a message
          </button>

          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-paper transition-colors hover:border-accent/30 hover:bg-accent/[0.05]"
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
