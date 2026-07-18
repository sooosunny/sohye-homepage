import { site } from '../content/site'
import { getLocaleFromPath, localeText } from '../content/i18n'
import { useRouter } from 'next/router'
import CopyEmail from './CopyEmail'

export default function Footer() {
  const locale = getLocaleFromPath(useRouter().pathname)
  const labels = localeText[locale]

  return (
    <footer className="footer">
      <div className="container container--wide">
        <div className="footer__inner">
          <p className="footer__text">© {labels.displayName}</p>
          <ul className="footer__links">
            <li>
              <a
                href={site.googleScholar}
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Scholar
              </a>
            </li>
            <li>
              <a
                href={site.linkedin}
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                className="footer__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <CopyEmail email={site.email} className="footer__link" locale={locale} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
