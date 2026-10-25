import { useRef } from 'react'
import { hero, site } from '../data/site'
import { gsap } from '../lib/gsap'
import { useGsap } from '../hooks/useGsap'
import { Picture } from '../components/Picture'
import { KineticHeading } from '../components/KineticHeading'
import { Marquee } from '../components/Marquee'
import { EmberCanvas } from '../components/EmberCanvas'
import { IconArrow } from '../components/Icons'

/**
 * One span per letter so each lights up neon amber on hover (see .neon-char).
 * These serve reduced motion / pre-JS; with motion on, SplitText rebuilds the
 * letters and KineticHeading's charsClass carries the class over.
 */
const neonLetters = (word: string) =>
  [...word].map((ch, i) => (
    <span key={i} className="neon-char">
      {ch}
    </span>
  ))

export function Hero() {
  const ref = useRef<HTMLElement>(null)

  // The portrait is the LCP element, so it is never covered or faded: it zooms
  // in while an ember light-sweep crosses it. Text pieces start hidden via
  // html.js-motion (see motion.css) and are revealed here with fromTo.
  useGsap(() => {
    gsap
      .timeline({ delay: 0.1 })
      .fromTo('[data-hero-sweep]', { xPercent: -130, autoAlpha: 1 }, { xPercent: 420, duration: 1.3, ease: 'expo.inOut' })
      .fromTo('[data-hero-img]', { scale: 1.14 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0)
      .fromTo('[data-hero-fx]', { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0.4)
      .fromTo('[data-hero-fade]', { y: 28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 }, 0.75)
      .fromTo('[data-hero-marquee]', { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1 }, 0.9)
  }, ref, [], { defer: false })

  return (
    <section
      id="top"
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col overflow-hidden bg-bg [--marquee-h:clamp(5rem,8vw,7.25rem)] lg:block"
    >
      <div className="sunset-glow" aria-hidden="true" />

      {/* Portrait in a slanted manga panel.
          Phone/tablet: stacked, bleeds under the header.
          Desktop (lg+): framed inside the gutter like a real manga panel, its right
          edge aligned to the 1920px content column on ultra-wide screens. */}
      {/* Neon amber frame: ember panel ink + a static blurred halo behind it
          (.neon-glow), so the glow follows the slanted shape without re-painting. */}
      <div className="relative h-[60svh] w-full shrink-0 lg:absolute lg:top-[calc(var(--header-h)+0.5rem)] lg:right-[max(var(--gutter),calc((100vw-1920px)/2+var(--gutter)))] lg:bottom-[calc(var(--marquee-h)+1.5rem)] lg:h-auto lg:w-[min(58%,1100px)]">
        <div className="neon-glow" aria-hidden="true">
          <span className="panel-slant" />
        </div>
        <div className="panel panel-slant h-full [--panel-ink:var(--ember)]">
          <div className="panel-inner">
            <div data-hero-img className="absolute inset-0">
              <Picture
                image="hero-desktop"
                mobile={{ image: 'hero-mobile', media: '(max-width: 767px)', sizes: '100vw' }}
                alt={hero.imageAlt}
                sizes="(min-width: 1024px) 58vw, 100vw"
                priority
                className="block h-full w-full"
                imgClassName="h-full w-full object-cover object-top md:object-[72%_20%] lg:object-[72%_center]"
              />
            </div>
            <div data-hero-fx aria-hidden="true">
              <div className="focus-lines opacity-40 [--fx:62%] [--fy:28%] max-lg:[--fx:30%] max-lg:[--fy:24%]" />
              <div className="halftone bottom-0 left-0 h-1/2 w-1/2 [--ht-mask:linear-gradient(45deg,#000,transparent_60%)]" />
            </div>
            {/* Fade the art into the page so the name can overlap it */}
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,var(--bg)_0%,transparent_35%)] lg:bg-[linear-gradient(to_right,var(--bg)_0%,transparent_30%),linear-gradient(to_top,var(--bg)_0%,transparent_25%)]" />
            <div
              data-hero-sweep
              aria-hidden="true"
              className="invisible absolute inset-y-0 left-0 z-10 w-1/3 bg-[linear-gradient(90deg,transparent,rgb(241_138_54/0.45)_40%,rgb(252_193_51/0.6)_55%,transparent)] mix-blend-screen"
              style={{ transform: 'skewX(-16deg)' }}
            />
          </div>
        </div>
      </div>

      <EmberCanvas className="absolute inset-0 z-2 h-full w-full" />

      <div className="shell relative z-3 mt-6 flex flex-1 flex-col justify-end pb-10 lg:mt-0 lg:min-h-svh lg:justify-center lg:pt-[calc(var(--header-h)+1rem)] lg:pb-[calc(var(--marquee-h)+2.5rem)]">
        <KineticHeading as="h1" trigger="load" delay={0.4} label="Marco Schoeman" charsClass="neon-char" className="display text-ink [text-shadow:0_2px_30px_rgb(11_6_5/0.6)]">
          {neonLetters('Marco')}
          <br />
          {neonLetters('Schoeman')}
          <span className="text-ember">.</span>
        </KineticHeading>

        <p data-hero-fade className="label mt-6 text-muted lg:mt-8">
          {site.role}
        </p>

        <p data-hero-fade className="mt-3 font-display text-[clamp(1.125rem,2vw,1.5rem)] font-semibold uppercase tracking-wide text-ink">
          {hero.offer.map((item, i) => (
            <span key={item}>
              {i > 0 && <span className="px-2 text-ember" aria-hidden="true">/</span>}
              {item}
            </span>
          ))}
        </p>

        <p data-hero-fade className="lead mt-5 max-w-[34ch]">
          {hero.intro}
        </p>

        <div data-hero-fade className="mt-8 flex flex-wrap gap-3">
          <a href="#contact" className="btn btn-primary">
            Start a project
            <IconArrow width={18} height={18} />
          </a>
          <a href="#work" className="btn btn-secondary">
            See the work
          </a>
        </div>

        <div data-hero-fade className="hero-scroll-cue mt-12 hidden items-center gap-4 lg:flex" aria-hidden="true">
          <span className="h-10 w-px overflow-hidden bg-line">
            <span className="scroll-cue-line block h-full w-full bg-ember" />
          </span>
          <span className="label text-muted">Scroll</span>
          <span className="kana text-xs" lang="ja">スクロール</span>
        </div>
      </div>

      <div data-hero-marquee className="relative z-3 lg:absolute lg:inset-x-0 lg:bottom-0">
        <Marquee items={hero.marquee} />
      </div>
    </section>
  )
}
