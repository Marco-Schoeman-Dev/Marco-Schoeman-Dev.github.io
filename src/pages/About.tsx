import type { PageProps } from '.'
import { about, instagramDm, site, socials } from '../data/site'
import { Chunk } from '../components/Chunk'
import { Picture } from '../components/Picture'
import { PageHeader } from '../components/PageHeader'
import { SectionLabel } from '../components/SectionLabel'
import { Accent } from '../components/Accent'
import { ApplyCta } from '../components/ApplyCta'
import { IconArrowUpRight } from '../components/Icons'
import { socialIcon } from '../components/socialIcons'

function Bio() {
  return (
    <section aria-label="Bio" className="relative overflow-hidden pb-(--section-space)">
      <div className="shell grid items-start gap-12 md:grid-cols-12 md:gap-8">
        <div className="relative mx-auto w-full max-w-[20rem] md:col-span-4 md:max-w-none">
          <div className="relative aspect-square">
            <div className="focus-lines focus-lines-burst inset-[-22%] opacity-80 [--fl-color:rgb(241_138_54/0.35)]" aria-hidden="true" />
            <div className="halftone -right-[8%] -bottom-[8%] h-2/3 w-2/3 [--ht-mask:radial-gradient(circle_at_70%_70%,#000,transparent_70%)]" aria-hidden="true" />
            <Picture
              image="profile"
              alt={about.avatarAlt}
              sizes="(min-width: 768px) 30vw, 20rem"
              className="relative block overflow-hidden rounded-full shadow-[0_0_48px_rgb(241_138_54/0.25)]"
              imgClassName="block h-auto w-full rounded-full"
            />
          </div>
        </div>

        <div className="flex max-w-[65ch] flex-col gap-5 md:col-span-7 md:col-start-6">
          {about.paragraphs.map((p, i) => (
            <p key={p.slice(0, 24)} className={i === 0 ? 'lead text-ink' : 'text-muted'}>
              {p}
            </p>
          ))}
          <p className="label mt-4 flex items-center gap-2 text-muted">
            <span className="h-px w-5 bg-ember" aria-hidden="true" />
            {site.location} · working with people anywhere
          </p>
        </div>
      </div>
    </section>
  )
}

function ContactLinks() {
  const items = socials.map((s) => ({
    ...s,
    href: s.id === 'instagram' ? instagramDm : s.href,
    detail: s.id === 'instagram' || s.id === 'tiktok' ? site.handle : s.id === 'github' ? 'Marco-Schoeman-Dev' : 'Marco Schoeman',
    verb: s.id === 'instagram' ? 'DM on Instagram' : s.id === 'tiktok' ? 'TikTok' : s.label,
  }))

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-surface py-(--section-space)">
      <div className="sunset-glow" aria-hidden="true" />
      <div className="shell relative">
        <SectionLabel index="01" name="Contact" className="mb-5" />
        <h2 id="contact-title" className="h2 text-ink">
          Say <Accent>hello</Accent>
        </h2>
        <p className="lead mt-8 max-w-[48ch]">The fastest way to reach me is a DM. Email works too, it just feels more formal than it needs to.</p>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => {
            const Icon = socialIcon[s.id]
            return (
              <li key={s.id} className="ring-within group relative">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel panel-cut-tr block focus-visible:outline-none [--panel-ink:var(--border)] hover:[--panel-ink:var(--ember-glow)]"
                >
                  <span className="panel-inner flex min-h-40 flex-col justify-between gap-8 bg-raised! p-6">
                    <span className="flex items-start justify-between">
                      <Icon width={28} height={28} />
                      <IconArrowUpRight width={22} height={22} className="text-muted transition-[color,transform] duration-300 ease-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ember" />
                    </span>
                    <span>
                      <span className="block font-display text-[clamp(1.5rem,2.4vw,2rem)] leading-none font-bold uppercase">{s.verb}</span>
                      <span className="label mt-3 block text-muted normal-case">{s.detail}</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                  </span>
                </a>
              </li>
            )
          })}
          <li className="ring-within group relative">
            <a href={`mailto:${site.email}`} className="panel panel-cut-tr block focus-visible:outline-none [--panel-ink:var(--border)] hover:[--panel-ink:var(--ember-glow)]">
              <span className="panel-inner flex min-h-40 flex-col justify-between gap-8 bg-raised! p-6">
                <span className="label text-ember">Email</span>
                <span className="block font-display text-[clamp(1.125rem,1.8vw,1.375rem)] leading-tight font-semibold break-all">{site.email}</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default function About(_: PageProps) {
  return (
    <>
      <PageHeader
        eyebrow={{ index: '00', name: 'About' }}
        label="The short version."
        title={
          <>
            The short
            <br />
            <Accent>version</Accent>.
          </>
        }
      />
      <Bio />
      <Chunk>
        <ContactLinks />
      </Chunk>
      <Chunk>
        <ApplyCta />
      </Chunk>
    </>
  )
}
