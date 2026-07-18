import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import LinkButton from '../components/LinkButton'
import PublicationItem from '../components/PublicationItem'
import { getLocaleFromPath, localizedPath, localeText } from '../content/i18n'
import { journalArticles } from '../content/publications'
import { profile, researchAreas } from '../content/portfolio'
import { site } from '../content/site'

function ResearchMotif() {
  return (
    <svg className="hero__motif" width="620" height="440" viewBox="0 0 620 440" fill="none" aria-hidden="true">
      <path d="M84 336C178 225 263 254 330 159C383 84 470 72 563 110" stroke="var(--color-motif-muted)" strokeWidth="2" opacity=".24" />
      <path d="M68 365C179 302 247 326 350 229C421 163 499 161 583 180" stroke="var(--color-navy)" strokeWidth="2" opacity=".2" />
      {[84, 184, 330, 458, 563].map((x, index) => (
        <circle key={x} cx={x} cy={[336, 244, 159, 88, 110][index]} r="8" fill="var(--color-navy)" opacity=".2" />
      ))}
    </svg>
  )
}

export default function Home() {
  const router = useRouter()
  const locale = getLocaleFromPath(router.pathname)
  const labels = localeText[locale]
  const [emailCopied, setEmailCopied] = useState(false)
  const local = <T extends { readonly en: string; readonly ko: string }>(value: T) => value[locale]

  const copyEmail = async () => {
    await navigator.clipboard.writeText(site.email)
    setEmailCopied(true)
    window.setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <Layout description={labels.homeDescription}>
      <div className="page page--home">
        <section className="hero" aria-labelledby="hero-name">
          <ResearchMotif />
          <div className="container container--wide">
            <div className="hero__inner">
              <div className="hero__text">
                <p className="eyebrow">{local(profile.field)}</p>
                <h1 className="hero__name" id="hero-name">
                  {locale === 'ko' ? profile.koreanName : profile.name}, Ph.D.
                </h1>
                <p className="hero__title">{local(profile.role)}</p>
                <p className="hero__affiliation">{local(profile.affiliation)}</p>
                <p className="hero__statement">{local(profile.statement)}</p>
                <div className="hero__links">
                  <LinkButton href={localizedPath('/research', locale)} filled>
                    {locale === 'ko' ? '연구 보기' : 'Explore research'}
                  </LinkButton>
                  <LinkButton href={localizedPath('/cv', locale)}>CV</LinkButton>
                  <button onClick={copyEmail} className="link-btn" type="button">
                    {emailCopied ? labels.copied : labels.email}
                  </button>
                  <address className="hero__contact">
                    <ul className="hero__contact-list">
                      <li>
                        <a
                          href={`tel:${profile.phone.replace(/\s/g, '')}`}
                          className="hero__contact-link"
                          aria-label={`${locale === 'ko' ? '전화' : 'Call'}: ${profile.phone}`}
                          title={`${locale === 'ko' ? '전화' : 'Call'}: ${profile.phone}`}
                        >
                          <svg
                            className="hero__contact-icon"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path d="M17.4864 12.7192L13.5489 11.0317C13.3807 10.96 13.1937 10.9449 13.0162 10.9887C12.8386 11.0324 12.6801 11.1327 12.5645 11.2743L10.8207 13.4048C8.08409 12.1145 5.88171 9.91208 4.59141 7.17542L6.72187 5.43167C6.86379 5.31625 6.96424 5.15773 7.00801 4.98011C7.05178 4.80249 7.03649 4.61545 6.96445 4.4473L5.27695 0.509798C5.19789 0.328536 5.05806 0.180541 4.88157 0.0913331C4.70508 0.00212525 4.50299 -0.0227041 4.31016 0.0211265L0.653906 0.864877C0.467989 0.907809 0.302114 1.01249 0.183352 1.16184C0.0645909 1.31118 -4.28277e-05 1.49637 2.12914e-08 1.68718C2.12914e-08 10.7048 7.30898 17.9997 16.3125 17.9997C16.5034 17.9998 16.6886 17.9352 16.8381 17.8164C16.9875 17.6977 17.0922 17.5318 17.1352 17.3458L17.9789 13.6895C18.0225 13.4958 17.9971 13.2929 17.9072 13.1158C17.8173 12.9387 17.6685 12.7984 17.4864 12.7192Z" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href={profile.linkedin}
                          className="hero__contact-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={locale === 'ko' ? 'LinkedIn 프로필 열기' : 'Open LinkedIn profile'}
                          title="LinkedIn"
                        >
                          <svg
                            className="hero__contact-icon"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path d="M16 8A6 6 0 0 1 22 14V21H18V14A2 2 0 0 0 14 14V21H10V14A6 6 0 0 1 16 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                            <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                            <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.8" />
                          </svg>
                        </a>
                      </li>
                      <li>
                        <a
                          href={profile.instagram}
                          className="hero__contact-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={locale === 'ko' ? 'Instagram 프로필 열기' : 'Open Instagram profile'}
                          title="Instagram"
                        >
                          <svg
                            className="hero__contact-icon"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.8" />
                            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
                            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </address>
                </div>
              </div>
              <Image src="/headshot.png" alt={labels.headshotAlt} className="hero__headshot" width={320} height={400} priority />
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="about-heading">
          <div className="container container--wide">
            <p className="section__heading" id="about-heading">{labels.about}</p>
            <p className="about-lead">{local(profile.about)}</p>
          </div>
        </section>

        <section className="section section--bordered" aria-labelledby="areas-heading">
          <div className="container container--wide">
            <p className="section__heading" id="areas-heading">{labels.research}</p>
            <div className="research-grid">
              {researchAreas.map((area) => (
                <article className="research-card" key={area.id}>
                  <p className="research-card__index">0{researchAreas.indexOf(area) + 1}</p>
                  <h2 className="research-card__title">{local(area.title)}</h2>
                  <p className="research-card__desc">{local(area.description)}</p>
                  <ul className="topic-list" aria-label={local(area.title)}>
                    {area.topics.map((topic) => <li key={topic}>{topic}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <Link href={localizedPath('/research', locale)} className="text-link">
              {locale === 'ko' ? '연구 프로그램 자세히 보기 →' : 'View research programs →'}
            </Link>
          </div>
        </section>

        <section className="section section--bordered" aria-labelledby="selected-publications">
          <div className="container container--wide">
            <p className="section__heading" id="selected-publications">
              {locale === 'ko' ? '주요 논문' : 'Selected Publications'}
            </p>
            <ul className="pub-list">
              {journalArticles.slice(0, 4).map((publication) => (
                <PublicationItem key={publication.title} pub={publication} locale={locale} />
              ))}
            </ul>
            <Link href={localizedPath('/publications', locale)} className="text-link">
              {locale === 'ko' ? '전체 논문 보기 →' : 'View all publications →'}
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  )
}
