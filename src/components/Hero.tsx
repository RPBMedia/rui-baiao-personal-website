import { links, profile, stats } from '../data'
import { Download, GitHub, LinkedIn, Mail, MapPin, Spotify } from './icons'

interface Props {
  onContact: () => void
}

export default function Hero({ onContact }: Props) {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">

      {/* ── Background: grid + ambient glows + network SVG ── */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-grid mask-radial opacity-80" />
        <div className="absolute left-1/2 top-[-14rem] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]" />
        <div className="absolute bottom-[-8rem] right-[-4rem] h-[24rem] w-[24rem] rounded-full bg-accent/[0.05] blur-[110px]" />

        {/*
          Network topology SVG.
          Viewbox: 1200×640. Nodes concentrated in the right 55% (x > 550)
          so they naturally sit behind the photo column and spill into negative
          space at the edges — away from the left-side text.
        */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 640"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft glow applied to nodes */}
            <filter id="ng" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ── Static connection edges ── */}
          <line x1="635"  y1="92"  x2="822"  y2="150" stroke="rgba(59,159,255,0.10)" strokeWidth="1" />
          <line x1="822"  y1="150" x2="1058" y2="112" stroke="rgba(59,159,255,0.08)" strokeWidth="1" />
          <line x1="822"  y1="150" x2="708"  y2="288" stroke="rgba(59,159,255,0.09)" strokeWidth="1" />
          <line x1="1058" y1="112" x2="938"  y2="270" stroke="rgba(59,159,255,0.07)" strokeWidth="1" />
          <line x1="708"  y1="288" x2="938"  y2="270" stroke="rgba(59,159,255,0.10)" strokeWidth="1" />
          <line x1="938"  y1="270" x2="1128" y2="348" stroke="rgba(59,159,255,0.06)" strokeWidth="1" />
          <line x1="708"  y1="288" x2="788"  y2="458" stroke="rgba(59,159,255,0.09)" strokeWidth="1" />
          <line x1="788"  y1="458" x2="1028" y2="528" stroke="rgba(59,159,255,0.07)" strokeWidth="1" />
          <line x1="788"  y1="458" x2="658"  y2="582" stroke="rgba(59,159,255,0.06)" strokeWidth="1" />
          <line x1="1028" y1="528" x2="858"  y2="618" stroke="rgba(59,159,255,0.05)" strokeWidth="1" />

          {/* ── Animated data-flow pulses (dashed packet traveling the edge) ── */}
          {/* Edge A: node-B → node-E  length ≈ 166px */}
          <line
            x1="822" y1="150" x2="938" y2="270"
            stroke="rgba(59,159,255,0.50)" strokeWidth="1"
            strokeDasharray="10 156"
            className="hero-flow-a"
          />
          {/* Edge B: node-D → node-G  length ≈ 188px */}
          <line
            x1="708" y1="288" x2="788" y2="458"
            stroke="rgba(59,159,255,0.42)" strokeWidth="1"
            strokeDasharray="8 180"
            className="hero-flow-b"
          />

          {/* ── Ping rings (expanding circles from two key nodes) ── */}
          <g className="hero-ping-a" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <circle cx="822" cy="150" r="5" stroke="rgba(59,159,255,0.55)" strokeWidth="1" />
          </g>
          <g className="hero-ping-b" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <circle cx="938" cy="270" r="5" stroke="rgba(59,159,255,0.45)" strokeWidth="1" />
          </g>

          {/* ── Nodes — pulse-staggered via individual delay classes ── */}
          <circle cx="635"  cy="92"  r="2.5" fill="rgba(59,159,255,0.55)" filter="url(#ng)" className="hn hn-a" />
          <circle cx="822"  cy="150" r="3.5" fill="rgba(59,159,255,0.75)" filter="url(#ng)" className="hn hn-b" />
          <circle cx="1058" cy="112" r="2"   fill="rgba(59,159,255,0.45)" filter="url(#ng)" className="hn hn-c" />
          <circle cx="708"  cy="288" r="3"   fill="rgba(59,159,255,0.62)" filter="url(#ng)" className="hn hn-d hn-drift-1" />
          <circle cx="938"  cy="270" r="3.5" fill="rgba(59,159,255,0.68)" filter="url(#ng)" className="hn hn-e" />
          <circle cx="1128" cy="348" r="2"   fill="rgba(59,159,255,0.38)" filter="url(#ng)" className="hn hn-f" />
          <circle cx="788"  cy="458" r="2.5" fill="rgba(59,159,255,0.52)" filter="url(#ng)" className="hn hn-g hn-drift-2" />
          <circle cx="1028" cy="528" r="2"   fill="rgba(59,159,255,0.40)" filter="url(#ng)" className="hn hn-h" />
          <circle cx="658"  cy="582" r="2"   fill="rgba(59,159,255,0.35)" filter="url(#ng)" className="hn hn-i" />
          <circle cx="858"  cy="618" r="1.5" fill="rgba(59,159,255,0.28)" filter="url(#ng)" className="hn hn-j" />
          {/* Faint leftward accent nodes — barely visible, add depth */}
          <circle cx="482"  cy="208" r="1.5" fill="rgba(59,159,255,0.20)" filter="url(#ng)" className="hn hn-k" />
          <circle cx="524"  cy="432" r="1.5" fill="rgba(59,159,255,0.16)" filter="url(#ng)" className="hn hn-l" />
        </svg>
      </div>

      {/* ── Main content grid ── */}
      <div className="container-x grid items-center gap-14 pb-20 lg:grid-cols-[1.2fr_0.8fr] lg:pb-28">

        {/* Left: copy */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/[0.04] px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-silver">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-soft" aria-hidden />
            {profile.role} · {profile.location}
          </p>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
            Software Engineering.{' '}
            <span className="text-accent">Team Leadership.</span>{' '}
            AI Adoption.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I'm Rui — an Engineering Manager with 15+ years across software engineering and
            leadership. Today, I lead senior engineering teams at{' '}
            <span className="text-paper">Volvo Cars</span> building the platform behind Volvo's
            global retailer network, and drive AI-assisted workflows that improve engineering
            productivity and delivery flow.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onContact}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft"
            >
              <Mail width={17} height={17} />
              Contact me
            </button>

            <a
              href="/rui-cv.pdf"
              download="Rui_Baiao_CV.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.05] px-5 py-3 text-sm font-medium text-paper transition-colors hover:border-accent/45 hover:bg-accent/10"
            >
              <Download width={17} height={17} />
              Download CV
            </a>

            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-paper transition-colors hover:border-white/30 hover:bg-white/[0.06]"
            >
              <GitHub width={17} height={17} />
              GitHub
            </a>

            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-paper transition-colors hover:border-white/30 hover:bg-white/[0.06]"
            >
              <LinkedIn width={17} height={17} />
              LinkedIn
            </a>

            <a
              href={links.music}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-medium text-paper transition-colors hover:border-white/30 hover:bg-white/[0.06]"
            >
              <Spotify width={17} height={17} />
              Music
            </a>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
            <MapPin width={16} height={16} className="text-accent" />
            Based in {profile.location}
          </p>
        </div>

        {/* Right: photo — clean, static, no orbits */}
        <div className="relative mx-auto hidden w-full max-w-xs items-center justify-center lg:flex" aria-hidden>
          <div className="relative">
            {/* Ambient soft glow behind the photo */}
            <div className="absolute inset-0 -m-10 rounded-full bg-accent/[0.07] blur-3xl" />
            {/* Single thin gradient border ring */}
            <div
              className="relative h-56 w-56 rounded-full p-[1.5px]"
              style={{
                background:
                  'linear-gradient(145deg, rgba(59,159,255,0.30) 0%, rgba(59,159,255,0.04) 70%, transparent 100%)',
              }}
            >
              <div className="h-full w-full overflow-hidden rounded-full bg-surface">
                <img
                  src="/RuiBaiaoAvatar.jpg"
                  alt="Rui Baiao"
                  className="h-full w-full object-cover object-center"
                  onError={(e) => {
                    const t = e.currentTarget
                    t.style.display = 'none'
                    const fb = t.parentElement?.querySelector('.photo-fallback') as HTMLElement
                    if (fb) fb.style.display = 'grid'
                  }}
                />
                <div className="photo-fallback hidden h-full w-full place-items-center font-mono text-3xl font-medium text-paper">
                  RB
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-y border-accent/10 bg-accent/[0.02]">
        <dl className="container-x grid grid-cols-2 divide-x divide-accent/10 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-7 text-center first:pl-0 sm:px-6">
              <dt className="text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-1.5 text-xs leading-snug text-muted sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
