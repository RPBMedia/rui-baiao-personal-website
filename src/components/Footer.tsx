import { links, navItems, profile } from '../data'

export default function Footer() {
  const year = 2026

  return (
    <footer className="border-t border-white/10 py-12">
      <div className="container-x">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg border border-white/15 bg-white/[0.04] font-mono text-sm text-paper">
                RB
              </span>
              <span className="text-sm font-medium text-paper">{profile.name}</span>
            </a>
            <p className="mt-3 max-w-xs text-sm text-muted">
              {profile.role} · {profile.location}. Building scalable platforms, strong teams, and
              AI-enabled delivery.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-muted transition-colors hover:text-paper"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href={links.github} target="_blank" rel="noreferrer" className="hover:text-paper">
              GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="hover:text-paper">
              LinkedIn
            </a>
            <a href={links.music} target="_blank" rel="noreferrer" className="hover:text-paper">
              Eon Rift
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
