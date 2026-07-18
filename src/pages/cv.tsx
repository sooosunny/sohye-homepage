import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import PublicationItem from '../components/PublicationItem'
import { getLocaleFromPath, localeText } from '../content/i18n'
import { journalArticles } from '../content/publications'
import { awards, profile, projects, training } from '../content/portfolio'

export default function CV() {
  const locale = getLocaleFromPath(useRouter().pathname)
  const labels = localeText[locale]

  return (
    <Layout title="CV" description={labels.cvDescription}>
      <div className="page">
        <div className="container container--wide">
          <header className="page-header cv-intro">
            <p className="eyebrow">{profile.field[locale]}</p>
            <h1 className="page-header__title">{labels.cvTitle}</h1>
            <p className="page-header__intro">
              {profile.role[locale]} · {profile.affiliation[locale]}
            </p>
          </header>

          <section className="cv-section">
            <p className="cv-section__label">{locale === 'ko' ? '연구 분야' : 'Research Areas'}</p>
            <p className="cv-areas">
              {locale === 'ko'
                ? '관광 · 호스피탈리티 · 소비자 행동 · ESG · 서비스 로봇 · 빅데이터 · 우주관광'
                : 'Tourism · Hospitality · Consumer Behavior · ESG · Service Robots · Big Data · Space Tourism'}
            </p>
          </section>

          <section className="cv-section">
            <p className="cv-section__label">{labels.publications}</p>
            <ul className="pub-list">
              {journalArticles.map((publication) => (
                <PublicationItem key={publication.title} pub={publication} locale={locale} />
              ))}
            </ul>
          </section>

          <section className="cv-section">
            <p className="cv-section__label">{locale === 'ko' ? '연구용역' : 'Projects'}</p>
            {projects.map((entry) => (
              <div className="cv-row" key={entry.en}>
                <p className="cv-row__period">{entry.date}</p>
                <div className="cv-row__body"><p>{entry[locale]}</p></div>
              </div>
            ))}
          </section>

          <section className="cv-section">
            <p className="cv-section__label">{locale === 'ko' ? '주요 수상' : 'Selected Awards'}</p>
            {awards.map((entry) => (
              <div className="cv-row" key={entry.en}>
                <p className="cv-row__period">{entry.date}</p>
                <div className="cv-row__body"><p>{entry[locale]}</p></div>
              </div>
            ))}
          </section>

          <section className="cv-section">
            <p className="cv-section__label">{locale === 'ko' ? '교육 수료' : 'Training'}</p>
            {training.map((entry) => (
              <div className="cv-row" key={entry.en}>
                <p className="cv-row__period">{entry.date}</p>
                <div className="cv-row__body"><p>{entry[locale]}</p></div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </Layout>
  )
}
