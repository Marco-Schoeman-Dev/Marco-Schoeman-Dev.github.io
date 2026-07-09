import { Tag } from './Tag'
import { IconGithub, IconExternalLink } from './Icons'
import { site } from '../../content'
import type { Project } from '../../content'

const categoryVariant = {
  Fullstack:   'blue',
  Security:    'accent',
  Automation:  'green',
  'Red Team':  'accent',
  'Open Source': 'purple',
} as const

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const variant = categoryVariant[project.category] ?? 'default'
  const isPlaceholder = !project.title || project.title === 'Project Title'

  return (
    <article className="group flex flex-col border border-line rounded-xl bg-canvas overflow-hidden hover:border-accent/40 hover:shadow-sm transition-all duration-300">
      {/* Thumbnail */}
      <div className="aspect-video bg-surface overflow-hidden">
        <img
          src={project.image}
          alt={isPlaceholder ? 'Project thumbnail placeholder' : project.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              parent.style.display = 'flex'
              parent.style.alignItems = 'center'
              parent.style.justifyContent = 'center'
              const span = document.createElement('span')
              span.textContent = `${String(index + 1).padStart(2, '0')}`
              span.style.cssText = 'font-size:2.5rem;font-weight:700;color:oklch(80% 0.007 60);font-family:Inter,sans-serif'
              parent.appendChild(span)
            }
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center justify-between">
          <Tag variant={variant as 'accent' | 'blue' | 'green' | 'purple' | 'default'}>
            {project.category}
          </Tag>
          <span className="text-xs text-ink-3 font-mono">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <div className="flex-1">
          <h3 className={`text-base font-semibold leading-snug mb-1.5 ${isPlaceholder ? 'text-ink-3 italic' : 'text-ink'}`}>
            {project.title}
          </h3>
          <p className={`text-sm leading-relaxed ${isPlaceholder ? 'text-ink-3 italic' : 'text-ink-2'}`}>
            {project.description}
          </p>
        </div>

        {/* Tech tags */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs text-ink-3 bg-surface border border-line rounded px-2 py-0.5">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex items-center gap-3 pt-1 border-t border-line">
          {project.private ? (
            <a
              href={`mailto:${site.email}?subject=Request: ${encodeURIComponent(project.title)}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/70 transition-colors duration-200"
            >
              Request via email
            </a>
          ) : (
            <>
              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-2 hover:text-accent transition-colors duration-200 cursor-pointer"
                >
                  <IconGithub className="w-3.5 h-3.5" />
                  Repository
                </a>
              ) : (
                <span className="text-xs text-ink-3">Repo coming</span>
              )}

              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-2 hover:text-accent transition-colors duration-200 cursor-pointer ml-auto"
                >
                  <IconExternalLink className="w-3.5 h-3.5" />
                  Live
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </article>
  )
}
