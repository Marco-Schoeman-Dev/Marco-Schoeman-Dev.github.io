import { applyHref } from '../data/site'
import { club } from '../data/club'
import { Accent } from './Accent'
import { IconArrow } from './Icons'

/** "Apply to The Founders Club" band at the bottom of Lives pages. */
export function ApplyCta() {
  return (
    <section aria-labelledby="apply-cta-title" className="relative overflow-hidden border-t border-line bg-surface py-[clamp(4rem,10vw,8rem)]">
      <div className="sunset-glow" aria-hidden="true" />
      <div className="shell relative grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="label mb-5 text-ember">{'// '}The Founders Club</p>
          <h2 id="apply-cta-title" className="h2 text-ink">
            Apply to the <Accent>Club</Accent>
          </h2>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-5">
          <p className="lead">
            If this was useful, the Club is the same thing with fewer people and better questions. {club.reviewNote}
          </p>
          <a href={applyHref} className="btn btn-primary self-start">
            Apply to The Founders Club
            <IconArrow width={18} height={18} />
          </a>
        </div>
      </div>
    </section>
  )
}
