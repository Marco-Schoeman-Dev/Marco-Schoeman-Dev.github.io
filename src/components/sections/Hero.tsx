import { useEffect, useRef } from "react";
import { hero, site } from "../../content";
import { IconArrowRight } from "../ui/Icons";
import { useTypewriter } from "../../hooks/useTypewriter";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { text: roleText, isDeleting } = useTypewriter();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const onScroll = () => {
      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / (section.offsetHeight * 0.75)),
      );
      section.style.setProperty("--p", String(progress));
      if (reduced) section.style.setProperty("--p", "0");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const words = hero.headline.split(" ");

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-svh flex flex-col justify-center pt-16 pb-24 px-6 overflow-hidden"
      style={{ ["--p" as string]: "0" }}
      aria-label="Introduction"
    >
      {/* ── Background ── */}
      {/* The particle field itself is a global fixed layer (see App.tsx) that
          shows through every section. Hero just fades it out behind the
          headline so the text stays readable. */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--color-canvas) 0%, color-mix(in oklch, var(--color-canvas) 60%, transparent) 32%, transparent 60%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div
        ref={contentRef}
        className="hero-parallax max-w-5xl mx-auto w-full relative z-10"
      >
        {/* Availability + location */}
        <div
          className="hero-enter flex flex-wrap items-center gap-6 mb-10"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="inline-flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-[oklch(62%_0.20_142)] inline-block"
              style={{
                boxShadow: "0 0 0 3px oklch(62% 0.20 142 / 0.25)",
                animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
              }}
              aria-hidden="true"
            />
            <span
              className="text-xs font-medium text-ink-3 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Available for work
            </span>
          </div>
          <div
            className="inline-flex items-center gap-2 text-xs font-medium text-ink-3 tracking-widest uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span
              className="w-6 h-px bg-accent inline-block"
              aria-hidden="true"
            />
            {site.location}
          </div>
        </div>

        {/* Name */}
        <h1 className="text-[clamp(3.5rem,10vw,7rem)] font-bold text-ink leading-[0.92] tracking-tight mb-8">
          {words.map((word, wi) => (
            <span
              key={wi}
              className="hero-enter block"
              style={{ animationDelay: `${0.7 + wi * 0.12}s` }}
            >
              {word.split("").map((char, ci) => (
                <span key={ci} className="char">
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Typewriter role */}
        <div className="hero-enter mb-8" style={{ animationDelay: "0.96s" }}>
          <div className="flex items-baseline gap-1 text-base sm:text-lg font-medium text-ink-2 min-h-7">
            <span
              className="text-accent text-sm mr-1.5 select-none"
              style={{ fontFamily: "var(--font-mono)" }}
              aria-hidden="true"
            >
              ~/
            </span>
            <span aria-live="polite" aria-label={`Role: ${roleText}`}>
              {roleText}
            </span>
            <span
              className={`inline-block w-0.5 h-[1.1em] bg-accent ml-0.5 translate-y-[0.05em] ${!isDeleting ? "cursor-blink" : ""}`}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Intro */}
        <p
          className="hero-enter max-w-xl text-base sm:text-lg text-ink-2 leading-relaxed mb-12"
          style={{ animationDelay: "1.1s" }}
        >
          {hero.intro}
        </p>

        {/* CTAs */}
        <div
          className="hero-enter flex flex-wrap gap-4"
          style={{ animationDelay: "1.24s" }}
        >
          <a
            href={hero.ctaPrimary.href}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-canvas font-semibold rounded-lg hover:bg-accent-dark transition-colors duration-200 cursor-none"
          >
            {hero.ctaPrimary.label}
            <IconArrowRight className="w-4 h-4" />
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="inline-flex items-center gap-2 px-6 py-3 border border-line bg-surface text-ink font-semibold rounded-lg hover:border-accent hover:text-accent transition-colors duration-200 cursor-none"
          >
            {hero.ctaSecondary.label}
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="hero-enter mt-20 hidden sm:flex items-center gap-3 text-xs text-ink-3 tracking-widest uppercase"
          style={{ animationDelay: "1.5s", fontFamily: "var(--font-mono)" }}
        >
          <span
            className="w-px h-10 bg-line block cursor-blink"
            aria-hidden="true"
          />
          Scroll
        </div>
      </div>
    </section>
  );
}
