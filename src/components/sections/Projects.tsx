import { projects, site } from '../../content'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export function Projects() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section
      id="projects"
      className="border-t border-line bg-surface/90"
      aria-labelledby="projects-heading"
      ref={ref}
    >
      {/* Header row */}
      <div className="flex items-baseline justify-between px-6 py-5 border-b border-line">
        <span
          className="text-xs font-medium text-accent tracking-widest uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span id="projects-heading">Featured Projects</span>
          <span className="text-accent ml-1">({projects.length})</span>
        </span>
        <p className="hidden sm:block text-xs text-ink-3 max-w-xs text-right">
          Private work available on request
        </p>
      </div>

      {/* Project rows */}
      {projects.map((project, i) => {
        const href = project.private
          ? `mailto:${site.email}?subject=Request: ${encodeURIComponent(project.title)}`
          : project.live || project.repo || null

        const linkLabel = project.private
          ? 'Request ↗'
          : project.live
            ? 'Visit Site ↗'
            : project.repo
              ? 'Visit Repo ↗'
              : null

        const isExternal = !project.private && (!!project.live || !!project.repo)

        return (
          <div
            key={project.id}
            className="reveal group relative border-b border-line"
            style={{ transitionDelay: `${i * 0.07}s` }}
          >
            <div className="flex flex-col sm:grid sm:grid-cols-[80px_1fr] md:grid-cols-[180px_1fr_40%] sm:items-stretch transition-colors duration-300 group-hover:bg-canvas">

              {/* Image — full-width banner on mobile only (grid columns below don't define a track for it below md) */}
              {project.image && (
                <div className="sm:hidden aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Category + tag — eyebrow row on mobile, narrow left column from sm up */}
              <div
                className="px-6 pt-8 sm:pt-10 sm:py-10 md:py-14 leading-loose sm:self-start"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span className="inline sm:block text-xs text-ink-3 uppercase tracking-widest">
                  {project.category}
                </span>
                {project.tags[0] && (
                  <span className="inline sm:block ml-2 sm:ml-0 text-xs text-ink-3/50 uppercase tracking-widest">
                    / {project.tags[0]}
                  </span>
                )}
              </div>

              {/* Title + desc + link — centre */}
              <div className="px-6 sm:px-0 pb-10 sm:py-10 md:py-14 sm:pr-6 md:pr-8 sm:self-center">
                <h3 className="text-[clamp(1.75rem,4.5vw,3.75rem)] font-black uppercase text-ink leading-[0.92] tracking-tight transition-colors duration-300 group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="text-sm text-ink-3 max-w-lg mt-3 leading-relaxed opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 transition-all duration-300 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                  {project.description}
                </p>
                {href && linkLabel && (
                  <a
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="inline-block mt-4 text-xs font-medium text-ink-3 uppercase tracking-widest hover:text-accent transition-colors duration-200 cursor-pointer opacity-100 md:opacity-0 md:group-hover:opacity-100"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {linkLabel}
                  </a>
                )}
              </div>

              {/* Image bleed — right, desktop only */}
              {project.image && (
                <div className="hidden md:block relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Gradient fade into row */}
                  <div className="absolute inset-y-0 left-0 w-20 bg-linear-to-r from-surface to-transparent group-hover:from-canvas transition-colors duration-300" />
                </div>
              )}

            </div>

            {/* Dot on the bottom divider */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-line group-hover:bg-accent transition-colors duration-300 z-10"
              aria-hidden="true"
            />
          </div>
        )
      })}
    </section>
  )
}
