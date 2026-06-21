import { links, profile, stats } from '../data'
import { Download, GitHub, LinkedIn, Mail, MapPin, Spotify } from './icons'

interface Props {
  onContact: () => void
}

export default function Hero({ onContact }: Props) {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      {/* Backdrop grid + top accent glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid mask-radial opacity-80" />
        <div className="absolute left-1/2 top-[-14rem] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[130px]" />
        <div className="absolute bottom-[-8rem] right-[-4rem] h-[24rem] w-[24rem] rounded-full bg-accent/[0.05] blur-[110px]" />
      </div>

      <div className="container-x grid items-center gap-14 pb-20 lg:grid-cols-[1.2fr_0.8fr] lg:pb-28">
        {/* — Left: copy — */}
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

          {/* CTA row */}
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

        {/* — Right: photo in orbit frame — */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-sm lg:block" aria-hidden>
          <div className="absolute inset-0 grid place-items-center">
            {/* Orbit rings */}
            <div className="absolute h-full w-full animate-spin-slow rounded-full border border-accent/[0.08]" />
            <div className="absolute h-[78%] w-[78%] rounded-full border border-accent/[0.10]" />
            <div className="absolute h-[56%] w-[56%] rounded-full border border-accent/[0.13]" />
            <div className="absolute h-[33%] w-[33%] rounded-full border border-accent/25" />

            {/* Orbiting nodes */}
            <div className="absolute h-full w-full animate-spin-slow">
              <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_24px_6px_rgba(59,159,255,0.55)]" />
              <span className="absolute bottom-[11%] right-[11%] h-2 w-2 rounded-full bg-silver/60" />
              <span className="absolute top-[30%] right-[3%] h-1.5 w-1.5 rounded-full bg-accent/50" />
            </div>

            {/* Photo — glow behind, gradient ring border */}
            <div className="relative">
              <div className="absolute inset-0 -m-4 rounded-full bg-accent/15 blur-2xl" />
              <div
                className="relative h-48 w-48 rounded-full p-[2px]"
                style={{ background: 'linear-gradient(135deg, rgba(59,159,255,0.7) 0%, rgba(59,159,255,0.15) 60%, rgba(59,159,255,0.05) 100%)' }}
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
