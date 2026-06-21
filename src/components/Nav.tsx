import { useEffect, useState } from 'react'
import { navItems } from '../data'

interface Props {
  onContact: () => void
}

export default function Nav({ onContact }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-accent/10 bg-ink/85 backdrop-blur-md'
          : 'border-b border-transparent',
      ].join(' ')}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Rui Baiao — home">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent/20 bg-accent/[0.05] font-mono text-sm font-medium text-paper transition-colors group-hover:border-accent/50 group-hover:bg-accent/10">
            RB
          </span>
          <span className="text-sm font-medium tracking-tight text-paper">Rui Baiao</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-paper"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onContact}
            className="hidden rounded-full border border-accent/25 bg-accent/[0.05] px-4 py-2 text-sm font-medium text-paper transition-colors hover:border-accent/50 hover:bg-accent/10 sm:inline-flex"
          >
            Get in touch
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-md border border-white/15 text-paper lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 top-0 h-0.5 w-4 bg-current transition-transform ${open ? 'translate-y-1.5 rotate-45' : ''}`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-4 bg-current transition-opacity ${open ? 'opacity-0' : ''}`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-4 bg-current transition-transform ${open ? '-translate-y-1.5 -rotate-45' : ''}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-accent/10 bg-ink/95 backdrop-blur-md lg:hidden">
          <ul className="container-x grid gap-1 py-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-base text-muted transition-colors hover:bg-accent/[0.05] hover:text-paper"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => { setOpen(false); onContact() }}
                className="mt-1 w-full rounded-md px-3 py-2.5 text-left text-base text-accent transition-colors hover:bg-accent/[0.05]"
              >
                Get in touch
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
