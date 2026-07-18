import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { getLocaleFromPath, localeText } from '../content/i18n'
import { researchAreas } from '../content/portfolio'

export default function Research() {
  const locale = getLocaleFromPath(useRouter().pathname)
  const labels = localeText[locale]

  return (
    <Layout title={labels.research} description={labels.researchDescription}>
      <div className="page">
        <div className="container container--wide">
          <header className="page-header">
            <p className="eyebrow">{locale === 'ko' ? '연구 의제' : 'Research agenda'}</p>
            <h1 className="page-header__title">{labels.research}</h1>
            <p className="page-header__intro">
              {locale === 'ko'
                ? '관광과 호스피탈리티의 변화를 기술, 지속가능성, 문화, 미래 경험이라는 네 축에서 탐구합니다.'
                : 'My work examines tourism and hospitality through four connected lenses: technology, sustainability, culture, and future experiences.'}
            </p>
          </header>

          {researchAreas.map((area, index) => (
            <section className="research-program" id={area.id} key={area.id}>
              <p className="research-card__index">0{index + 1}</p>
              <h2 className="research-program__title">{area.title[locale]}</h2>
              <p className="research-program__overview">{area.description[locale]}</p>
              <p className="research-program__pubs-label">{locale === 'ko' ? '주요 주제' : 'Current themes'}</p>
              <ul className="kq-list">
                {area.topics.map((topic) => <li key={topic}>{topic}</li>)}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  )
}
