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
import { basePath, site } from '../content/site'

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
                  <LinkButton href={`${basePath}${localizedPath('/research', locale)}`} filled>
                    {locale === 'ko' ? '연구 보기' : 'Explore research'}
                  </LinkButton>
                  <LinkButton href={`${basePath}${localizedPath('/cv', locale)}`}>CV</LinkButton>
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
                          <span className="hero__contact-icon hero__contact-icon--phone" aria-hidden="true" />
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
                          <img
                            src={`${basePath}/icons/linkedin-in-bug.png`}
                            alt=""
                            className="hero__contact-icon"
                            width="20"
                            height="20"
                            aria-hidden="true"
                          />
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
                          <span className="hero__contact-picture" aria-hidden="true">
                            <img
                              src={`${basePath}/icons/instagram-glyph-black.svg`}
                              alt=""
                              className="hero__contact-icon hero__contact-icon--instagram hero__contact-icon--theme-light"
                              width="29"
                              height="29"
                            />
                            <img
                              src={`${basePath}/icons/instagram-glyph-white.svg`}
                              alt=""
                              className="hero__contact-icon hero__contact-icon--instagram hero__contact-icon--theme-dark"
                              width="29"
                              height="29"
                            />
                          </span>
                        </a>
                      </li>
                    </ul>
                  </address>
                </div>
              </div>
              <Image src={`${basePath}/headshot.png`} alt={labels.headshotAlt} className="hero__headshot" width={320} height={400} priority />
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
