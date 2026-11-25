import { applyHref, nav, site, socials } from '../data/site'
import { IconArrowUpRight } from './Icons'
import { socialIcon } from './socialIcons'
import { Picture } from './Picture'

const footerNav = [{ id: 'home', label: 'Home', href: '/' }, ...nav]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg pt-16 md:pt-24">
      <div className="halftone right-0 bottom-0 h-full w-1/2 [--ht-mask:linear-gradient(300deg,#000,transparent_60%)]" aria-hidden="true" />

      <div className="shell relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <nav aria-label="Footer">
          <p className="label mb-4 text-muted">Navigate</p>
          <ul className="flex flex-col gap-1">
            {footerNav.map((m, i) => (
              <li key={m.id}>
                <a href={m.href} className="group inline-flex min-h-11 items-center gap-3 font-display text-xl font-semibold uppercase hover:text-ember">
                  <span className="label text-ember">{String(i + 1).padStart(2, '0')}</span>
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label mb-4 text-muted">Socials</p>
          <ul className="flex flex-col gap-1">
            {socials.map((s) => {
              const Icon = socialIcon[s.id]
              return (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 hover:text-ember">
                    <Icon width={18} height={18} />
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <p className="label mb-4 text-muted">Contact</p>
          <a href={`mailto:${site.email}`} className="link inline-flex min-h-11 items-center break-all">
            {site.email}
          </a>
          <p className="mt-2 text-muted">{site.handle} on Instagram &amp; TikTok</p>
          <p className="label mt-6 flex items-center gap-2 text-muted">
            <span className="h-px w-5 bg-ember" aria-hidden="true" />
            {site.location}
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 lg:items-end">
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a href={applyHref} className="btn btn-primary">
              Apply
            </a>
            <a href="#top" className="btn btn-secondary">
              Back to top
              <IconArrowUpRight width={16} height={16} className="-rotate-45" />
            </a>
          </div>
        </div>
      </div>

      {/* Brand lockup + copyright */}
      <div className="shell relative mt-16 flex flex-col gap-6 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between md:mt-24">
        <a href="/" className="-m-1 self-start p-1" aria-label="Marco Schoeman, home">
          <Picture
            image="logo-lockup"
            alt="Marco Schoeman logo"
            sizes="(min-width: 768px) 325px, 260px"
            className="block"
            imgClassName="h-16 w-auto md:h-20"
          />
        </a>
        <p className="label text-muted sm:text-right">
          © {site.year} {site.name}
          {' '}<br />
          {site.role}
        </p>
      </div>
    </footer>
  )
}
