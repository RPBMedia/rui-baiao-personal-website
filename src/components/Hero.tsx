import { links, profile, stats } from '../data'
import { GitHub, LinkedIn, Mail, MapPin, Waveform } from './icons'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      {/* Backdrop: faint grid + accent glow, softly masked. */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-radial opacity-70" />
        <div className="absolute left-1/2 top-[-12rem] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute bottom-[-10rem] right-[-6rem] h-[28rem] w-[28rem] rounded-full bg-accent/[0.06] blur-[120px]" />
      </div>

      <div className="container-x grid items-center gap-14 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-soft" aria-hidden />
            {profile.role} · {profile.location}
          </p>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-paper sm:text-5xl lg:text-6xl">
            Building scalable platforms,{' '}
            <span className="text-accent">strong teams</span>, and AI-enabled delivery.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I'm Rui — an Engineering Manager with 15+ years across software engineering and
            leadership. Today I lead senior teams at{' '}
            <span className="text-paper">Volvo Cars</span> building the platform behind Volvo's
            Connect web apps, and I apply AI-assisted workflows to help good engineers move faster
            without lowering the bar.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={links.email}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft"
            >
              <Mail width={17} height={17} />
              Contact me
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
              <Waveform width={17} height={17} />
              Music project
            </a>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
            <MapPin width={16} height={16} className="text-accent" />
            Based in {profile.location}
          </p>
        </div>

        {/* Orbit / signal motif. */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block" aria-hidden>
          <div className="absolute inset-0 grid place-items-center">
            <div className="absolute h-full w-full animate-spin-slow rounded-full border border-white/[0.07]" />
            <div className="absolute h-3/4 w-3/4 rounded-full border border-white/[0.08]" />
            <div className="absolute h-1/2 w-1/2 rounded-full border border-white/10" />
            <div className="absolute h-1/4 w-1/4 rounded-full border border-accent/30" />

            {/* Orbiting nodes */}
            <div className="absolute h-full w-full animate-spin-slow">
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_24px_4px_rgba(255,59,48,0.55)]" />
              <span className="absolute bottom-[12%] right-[12%] h-2 w-2 rounded-full bg-white/70" />
            </div>

            {/* Core */}
            <div className="relative grid h-24 w-24 place-items-center rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur">
              <span className="font-mono text-2xl font-medium text-paper">RB</span>
              <span className="absolute inset-0 rounded-2xl ring-1 ring-accent/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-y border-white/10 bg-white/[0.015]">
        <dl className="container-x grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
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
