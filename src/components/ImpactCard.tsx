import type { Project } from '../data/projects'
import { site } from '../data/site'
import { images } from '../data/images'
import { Picture } from './Picture'
import { IconArrowUpRight } from './Icons'

interface ImpactCardProps {
  project: Project
  index: number
  total: number
}

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Work card. The whole card is one link (stretched ::after on the CTA), so
 * there is a single tab stop. Hover/focus fires the anime "impact frame".
 */
export function ImpactCard({ project, index, total }: ImpactCardProps) {
  const href = project.private
    ? `mailto:${site.email}?subject=${encodeURIComponent(`Request: ${project.title}`)}`
    : project.live
  const cta = project.private ? 'Request access' : 'View project'
  const external = !project.private && !!project.live

  return (
    <article className="impact group relative flex h-full flex-col">
      <div className="panel panel-cut-tr">
        <div className="panel-inner aspect-4/3 lg:aspect-16/10">
          {project.video ? (
            <video
              className="kenburns h-full w-full object-cover"
              src={project.video}
              poster={images[project.image].fallback}
              muted
              loop
              playsInline
              autoPlay
              preload="none"
              aria-hidden="true"
            />
          ) : (
            <Picture
              image={project.image}
              alt={project.imageAlt}
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="block h-full w-full"
              imgClassName={`kenburns h-full w-full object-cover ${project.imageFocus ?? ''}`}
            />
          )}
          <div className="focus-lines [--fl-color:rgb(252_193_51/0.35)]" aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(11_6_5/0.85),transparent_45%)]" aria-hidden="true" />
          <span
            aria-hidden="true"
            className="text-outline absolute top-3 left-4 font-display text-[clamp(3rem,7vw,5.5rem)] leading-none font-bold"
          >
            {pad(index + 1)}
          </span>
          <span className="label absolute bottom-4 left-4 rounded-sm bg-bg/80 px-2 py-1 text-ink">
            {project.discipline}
            {project.year && <span className="text-muted"> · {project.year}</span>}
          </span>
          {project.private && (
            <span className="label absolute right-4 bottom-4 flex items-center gap-2 rounded-sm bg-bg/80 px-2 py-1 text-muted">
              Private
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <p className="label mb-2 text-muted" aria-hidden="true">
          {pad(index + 1)} / {pad(total)}
        </p>
        {/* Pinned reel (lg + motion): single-line title, description dropped on
            short screens, so the CTA always fits inside the pinned viewport. */}
        <h3 className="font-display text-[clamp(1.75rem,3.2vw,2.75rem)] uppercase transition-colors duration-200 group-hover:text-ember lg:motion-safe:truncate lg:motion-safe:text-[clamp(1.5rem,2.3vw,2.25rem)] short:text-[1.3rem]">
          {project.title}
        </h3>
        <p className="mt-3 max-w-[52ch] text-muted short:hidden">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
          {project.tags.map((t) => (
            <li key={t} className="label rounded-sm border border-line px-2 py-1 text-muted">
              {t}
            </li>
          ))}
        </ul>
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="label mt-4 inline-flex min-h-11 items-center gap-2 self-start text-ember after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none"
        >
          {cta}
          <span className="sr-only">
            : {project.title}
            {external ? ' (opens in a new tab)' : ''}
          </span>
          <IconArrowUpRight width={14} height={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  )
}
