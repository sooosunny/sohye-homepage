import { useSyncExternalStore } from 'react'
import type { Locale } from '../content/i18n'

type Theme = 'light' | 'dark'

type ThemeToggleProps = {
  readonly locale: Locale
}

const labels = {
  en: {
    light: 'Switch to light mode',
    dark: 'Switch to dark mode',
  },
  ko: {
    light: '라이트 모드로 전환',
    dark: '다크 모드로 전환',
  },
} as const

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
  localStorage.setItem('sb-theme', theme)
  window.dispatchEvent(new Event('sb-theme-change'))
}

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener('sb-theme-change', onStoreChange)
  return () => window.removeEventListener('sb-theme-change', onStoreChange)
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function getServerTheme(): Theme {
  return 'light'
}

export default function ThemeToggle({ locale }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme)
  const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'

  const toggleTheme = () => {
    applyTheme(nextTheme)
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={labels[locale][nextTheme]}
      title={labels[locale][nextTheme]}
      aria-pressed={theme === 'dark'}
    >
      <svg className="theme-toggle__sun" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 2V5M12 19V22M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M2 12H5M19 12H22M4.93 19.07L7.05 16.95M16.95 7.05L19.07 4.93" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
      <svg className="theme-toggle__moon" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20.1 15.2A8.4 8.4 0 0 1 8.8 3.9 8.4 8.4 0 1 0 20.1 15.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    </button>
  )
}
