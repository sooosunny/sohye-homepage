import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import PublicationItem from '../components/PublicationItem'
import { getLocaleFromPath, localeText } from '../content/i18n'
import { journalArticles, worksInProgress } from '../content/publications'

export default function Publications() {
  const locale = getLocaleFromPath(useRouter().pathname)
  const labels = localeText[locale]

  return (
    <Layout title={labels.publications} description={labels.researchDescription}>
      <div className="page">
        <div className="container container--wide">
          <header className="page-header">
            <p className="eyebrow">17 KCI</p>
            <h1 className="page-header__title">{labels.publications}</h1>
            <p className="page-header__intro">
              {locale === 'ko'
                ? '관광, 외식, 호스피탈리티, 소비자 행동 분야의 학술지 논문과 진행 중 연구입니다.'
                : 'Journal articles and current work across tourism, foodservice, hospitality, and consumer behavior.'}
            </p>
          </header>
          <section className="cv-section">
            <p className="cv-section__label">{labels.journalArticles}</p>
            <ul className="pub-list">
              {journalArticles.map((publication) => (
                <PublicationItem key={publication.title} pub={publication} locale={locale} />
              ))}
            </ul>
          </section>
          <section className="cv-section">
            <p className="cv-section__label">{labels.workInProgress}</p>
            <ul className="pub-list">
              {worksInProgress.map((publication) => (
                <PublicationItem key={publication.title} pub={publication} locale={locale} />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  )
}
