import type { ReactNode } from 'react'
import { projects } from '../data'
import type { Project } from '../data'
import { ArrowUpRight } from './icons'
import { Eyebrow, Lead, Section, SectionHeading } from './ui'

function CardBody({ project }: { project: Project }) {
  const isLink = Boolean(project.url)
  const host = project.url?.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <>
      {/* Thumbnail — a real screenshot of the project. object-top keeps the
          header/hero in frame; the card owns a fixed aspect ratio so images
          never shift the grid as they load. */}
      <div className="relative aspect-[960/567] overflow-hidden border-b border-white/10 bg-ink-soft">
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          loading="lazy"
          width={960}
          height={567}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2.5">
          <h3 className="text-lg font-semibold text-paper">{project.name}</h3>
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent-soft">
            {project.tag}
          </span>
          {project.status && (
            <span className="rounded-full border border-white/15 bg-white/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-silver">
              {project.status}
            </span>
          )}
          {isLink && (
            <ArrowUpRight
              width={16}
              height={16}
              className="ml-auto shrink-0 text-muted transition-colors group-hover:text-accent"
            />
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
        {host && (
          <span className="mt-3 truncate font-mono text-xs text-muted/80 transition-colors group-hover:text-accent-soft">
            {host}
          </span>
        )}
      </div>
    </>
  )
}

export default function Portfolio() {
  const cardBase =
    'group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]'

  return (
    <Section id="projects" className="border-t border-white/10">
      <Eyebrow>Projects</Eyebrow>
      <SectionHeading>Portfolio</SectionHeading>
      <Lead>Side projects I've been designing and shipping.</Lead>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((project): ReactNode =>
          project.url ? (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} — open live site in a new tab`}
              className={`${cardBase} transition-colors hover:border-accent/40 hover:bg-white/[0.045]`}
            >
              <CardBody project={project} />
            </a>
          ) : (
            <div key={project.name} className={cardBase}>
              <CardBody project={project} />
            </div>
          ),
        )}
      </div>
    </Section>
  )
}
