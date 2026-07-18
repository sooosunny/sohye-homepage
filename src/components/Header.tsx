import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  getLocaleFromPath,
  localizedPath,
  localeText,
} from '../content/i18n'
import TextSizeControl from './TextSizeControl'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { href: '/', key: 'home' },
  { href: '/research', key: 'research' },
  { href: '/publications', key: 'publications' },
  { href: '/teaching', key: 'teaching' },
  { href: '/cv', key: 'cv' },
] as const

export default function Header() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const locale = getLocaleFromPath(router.pathname)
  const labels = localeText[locale]
  const targetLocale = locale === 'en' ? 'ko' : 'en'
  const languageHref = localizedPath(router.pathname, targetLocale)
  const englishPath = localizedPath(router.pathname, 'en')

  const isActive = (href: string) => {
    if (href === '/') return englishPath === '/'
    if (href.includes('#')) return false
    return englishPath.startsWith(href)
  }

  return (
    <nav className="nav" aria-label={labels.mainNavigation}>
      <div className="nav__inner">
        <Link href={localizedPath('/', locale)} className="nav__brand">
          {labels.displayName}
        </Link>

        <div className="nav__controls">
          <TextSizeControl locale={locale} />
          <ThemeToggle locale={locale} />

          <Link
            href={languageHref}
            className="nav__link nav__language"
            aria-label={`${labels.language}: ${targetLocale === 'ko' ? labels.switchToKorean : labels.switchToEnglish}`}
            title={`${labels.language}: ${targetLocale === 'ko' ? labels.switchToKorean : labels.switchToEnglish}`}
          >
            <span aria-hidden="true">{targetLocale === 'ko' ? 'KOR' : 'ENG'}</span>
          </Link>
        </div>

        {/* Desktop nav */}
        <ul className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={localizedPath(item.href, locale)}
                className={`nav__link${isActive(item.href) ? ' nav__link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {labels[item.key]}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="nav__toggle"
          aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}
