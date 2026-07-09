import { site } from '../../content'
import { IconGithub, IconLinkedin } from '../ui/Icons'

export function Footer() {
  return (
    <footer className="border-t border-line py-10 bg-canvas/90">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-ink-3">
          &copy; {new Date().getFullYear()} Marco Schoeman. Built with React + TypeScript.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-3 hover:text-ink transition-colors duration-200 cursor-pointer"
            aria-label="GitHub"
          >
            <IconGithub className="w-4.5 h-4.5" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-3 hover:text-ink transition-colors duration-200 cursor-pointer"
            aria-label="LinkedIn"
          >
            <IconLinkedin className="w-4.5 h-4.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}
