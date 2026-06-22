import { useEffect, useRef, useState } from 'react'
import { creativeTags } from '../data'
import { ChevronDown, SoundCloud, Spotify, Waveform } from './icons'
import { Eyebrow, Section, SectionHeading } from './ui'

const bars = [
  14, 30, 22, 44, 60, 38, 72, 52, 84, 46, 64, 34, 50, 28, 40, 20, 56, 70, 42, 26, 48, 32, 18, 36,
]

const SOUNDCLOUD = 'https://soundcloud.com/eon-rift'
const SPOTIFY = 'https://open.spotify.com/artist/6lNAaGeL0T2a4zF750AH95?si=ZfgQade-SA-4d1wIutXpXw'

export default function CreativeSide() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (
        !menuRef.current?.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); triggerRef.current?.focus() } }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <Section id="creative" className="border-t border-white/10">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <Eyebrow>Creative side</Eyebrow>
          <SectionHeading>Structure matters — but so does atmosphere.</SectionHeading>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Outside engineering, I create cinematic electronic music as{' '}
            <span className="text-paper">Eon Rift</span>, play guitar, run for meditation, and study
            History across books, and old cities. I'm also drawn to finance, photography, social
            dynamics, self-development, and the occasional Dragon-slaying gaming session.
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

          {/* Listen button with platform picker */}
          <div className="relative mt-7 inline-block">
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={open}
              aria-haspopup="menu"
              aria-controls="eon-rift-menu"
              onClick={() => setOpen(v => !v)}
              className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-soft"
            >
              <Waveform width={17} height={17} />
              Listen to Eon Rift
              <ChevronDown
                width={13}
                height={13}
                className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
              />
            </button>

            {open && (
              <div
                id="eon-rift-menu"
                ref={menuRef}
                role="menu"
                aria-label="Listen on"
                className="absolute left-0 top-full z-50 mt-2.5 min-w-[164px] rounded-xl border border-accent/20 bg-surface/95 py-1.5 shadow-[0_8px_40px_rgba(0,30,100,0.50)] backdrop-blur-md"
              >
                <a
                  href={SOUNDCLOUD}
                  target="_blank"
                  rel="noreferrer"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted transition-colors hover:bg-accent/10 hover:text-paper"
                >
                  <SoundCloud width={15} height={15} className="shrink-0 text-accent" />
                  SoundCloud
                </a>
                <a
                  href={SPOTIFY}
                  target="_blank"
                  rel="noreferrer"
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted transition-colors hover:bg-accent/10 hover:text-paper"
                >
                  <Spotify width={15} height={15} className="shrink-0 text-accent" />
                  Spotify
                </a>
              </div>
            )}
          </div>
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
