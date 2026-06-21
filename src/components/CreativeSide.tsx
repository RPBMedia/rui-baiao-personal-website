import { creativeTags, links } from '../data'
import { ArrowUpRight, Waveform } from './icons'
import { Eyebrow, Section, SectionHeading } from './ui'

// Static "waveform" bars — a small nod to the music side.
const bars = [
  14, 30, 22, 44, 60, 38, 72, 52, 84, 46, 64, 34, 50, 28, 40, 20, 56, 70, 42, 26, 48, 32, 18, 36,
]

export default function CreativeSide() {
  return (
    <Section id="creative" className="border-t border-white/10">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <Eyebrow>Creative side</Eyebrow>
          <SectionHeading>Structure matters — but so does atmosphere.</SectionHeading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Outside engineering, I create cinematic electronic music as{' '}
            <span className="text-paper">Eon Rift</span>, play guitar, edit photography, and chase
            history across maps, books, and old cities. I'm also drawn to finance, social dynamics,
            self-development, and the occasional deep gaming session.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            That creative side shows up in how I think about product, systems, and teams.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {creativeTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <a
            href={links.music}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-soft"
          >
            <Waveform width={17} height={17} />
            Listen to Eon Rift
            <ArrowUpRight width={15} height={15} />
          </a>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8">
          <div className="flex items-center gap-2 text-muted">
            <Waveform width={18} height={18} className="text-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.2em]">Eon Rift</span>
          </div>
          <div
            className="mt-6 flex h-40 items-center gap-[3px] sm:gap-1.5"
            role="img"
            aria-label="Stylized audio waveform"
          >
            {bars.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-full bg-gradient-to-t from-accent/30 to-accent/80"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Cinematic electronic textures — built the same way I like to build software: clean
            structure underneath, room to breathe on top.
          </p>
        </div>
      </div>
    </Section>
  )
}
