import type { Project } from '../data/projects'
import { images } from '../data/images'
import { Picture } from './Picture'
import { IconArrowUpRight } from './Icons'

interface ImpactCardProps {
  project: Project
  index: number
  total: number
  /** Image `sizes` for the grid it sits in */
  sizes?: string
  /** Compact: no description or tags (home teaser) */
  compact?: boolean
  /**
   * Same image ratio for every card in a row, so titles line up. Pass the
   * widest banner's ratio: it stays uncropped, the others crop to match.
   */
  aspect?: string
}

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Work card. The whole card is one link (stretched ::after on the CTA), so
 * there is a single tab stop. Hover/focus fires the "impact frame".
 */
export function ImpactCard({ project, index, total, sizes = '(min-width: 768px) 33vw, 100vw', compact = false, aspect: rowAspect }: ImpactCardProps) {
  // Images with an `imageAspect` are shown uncropped at their natural ratio,
  // so the slow zoom-drift (which would clip their edges) only runs on the rest.
  const aspect = rowAspect ?? project.imageAspect ?? 'aspect-4/3'
  const drift = project.imageAspect ? '' : 'kenburns'

  return (
    <article className="impact group relative flex h-full flex-col">
      <div className="panel panel-cut-tr">
        <div className={`panel-inner ${aspect}`}>
          {project.video ? (
            <video
              className={`${drift} h-full w-full object-cover`}
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
              sizes={sizes}
              className="block h-full w-full"
              imgClassName={`${drift} h-full w-full object-cover ${project.imageFocus ?? ''}`}
            />
          )}
          <div className="focus-lines [--fl-color:rgb(252_193_51/0.35)]" aria-hidden="true" />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(11_6_5/0.85),transparent_45%)]" aria-hidden="true" />
          {/* Chip sits top-left: banners often carry their own text along the bottom */}
          <span className="label absolute top-4 left-4 rounded-sm bg-bg/80 px-2 py-1 text-ink">
            {project.discipline}
            {project.year && <span className="text-muted"> · {project.year}</span>}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        {/* Number sits beside the title, never on the image, so it can't collide
            with text baked into a thumbnail. */}
        <div className="flex items-end gap-4">
          <span
            aria-hidden="true"
            className="text-outline shrink-0 font-display text-[clamp(2.75rem,4vw,3.75rem)] leading-[0.8] font-bold [-webkit-text-stroke-width:1.5px]"
          >
            {pad(index + 1)}
          </span>
          <h3 className="min-w-0 font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[0.95] uppercase transition-colors duration-200 group-hover:text-ember">
            {project.title}
            <span className="sr-only">, project {index + 1} of {total}</span>
          </h3>
        </div>
        {!compact && (
          <>
            <p className="mt-4 max-w-[52ch] text-muted">{project.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
              {project.tags.map((t) => (
                <li key={t} className="label rounded-sm border border-line px-2 py-1 text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </>
        )}
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="label mt-4 inline-flex min-h-11 items-center gap-2 self-start text-ember after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-none"
        >
          View site
          <span className="sr-only">: {project.title} (opens in a new tab)</span>
          <IconArrowUpRight width={14} height={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  )
}
