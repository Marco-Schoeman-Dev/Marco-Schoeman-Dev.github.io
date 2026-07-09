import { useEffect, useState } from 'react'
import { site } from '../../content'
import { IconMenu, IconX, IconSun, IconMoon } from '../ui/Icons'

const navLinks = [
  { label: 'About',    href: '#about' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
]

interface HeaderProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-canvas/95 backdrop-blur-md shadow-[0_1px_0_0_var(--color-line)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-bold text-ink text-base tracking-tight hover:text-accent transition-colors duration-200"
          aria-label="Marco Schoeman — home"
        >
          MS<span className="text-accent">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-2 hover:text-ink transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-ink-2 hover:text-ink hover:bg-surface transition-colors duration-200 cursor-pointer"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <IconSun className="w-4 h-4" /> : <IconMoon className="w-4 h-4" />}
          </button>

          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-canvas bg-ink px-4 py-2 rounded-lg hover:bg-accent transition-colors duration-200 cursor-pointer"
          >
            GitHub
          </a>
        </nav>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={onToggleTheme}
            className="w-11 h-11 flex items-center justify-center text-ink-2 hover:text-ink transition-colors cursor-pointer"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <IconSun className="w-4 h-4" /> : <IconMoon className="w-4 h-4" />}
          </button>
          <button
            className="w-11 h-11 flex items-center justify-center text-ink-2 hover:text-ink transition-colors cursor-pointer"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconX /> : <IconMenu />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden bg-canvas/98 backdrop-blur-md border-t border-line px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="text-base font-medium text-ink-2 hover:text-accent transition-colors duration-200 py-3 min-h-11 flex items-center"
            >
              {link.label}
            </a>
          ))}
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleNavClick}
            className="text-sm font-medium text-canvas bg-ink px-4 py-2.5 rounded-lg hover:bg-accent transition-colors duration-200 text-center cursor-pointer mt-2"
          >
            GitHub
          </a>
        </div>
      )}
    </header>
  )
}
