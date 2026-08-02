import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { getLocaleFromPath, localeText } from '../content/i18n'
import { getPageSiteContent, type PageProgram } from '../content/pageContent'
import { researchAreas } from '../content/portfolio'

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'program'
}

export default function Research() {
  const locale = getLocaleFromPath(useRouter().pathname)
  const labels = localeText[locale]
  const pageContent = getPageSiteContent('research', locale)
  const generatedPrograms = pageContent.research?.programs ?? []
  const programs = generatedPrograms.length
    ? generatedPrograms.map((program: PageProgram, index) => ({
        id: `${slugify(program.title)}-${index}`,
        title: program.title,
        overview: program.overview.join(' '),
        topics: program.key_questions,
      }))
    : researchAreas.map((area) => ({
        id: area.id,
        title: area.title[locale],
        overview: area.description[locale],
        topics: area.topics,
      }))
  const intro = pageContent.research?.intro?.length
    ? pageContent.research.intro.join(' ')
    : locale === 'ko'
      ? '관광과 호스피탈리티의 변화를 기술, 지속가능성, 문화, 미래 경험이라는 네 축에서 탐구합니다.'
      : 'My work examines tourism and hospitality through four connected lenses: technology, sustainability, culture, and future experiences.'

  return (
    <Layout title={labels.research} description={labels.researchDescription}>
      <div className="page">
        <div className="container container--wide">
          <header className="page-header">
            <p className="eyebrow">{locale === 'ko' ? '연구 의제' : 'Research agenda'}</p>
            <h1 className="page-header__title">{labels.research}</h1>
            <p className="page-header__intro">{intro}</p>
          </header>

          {programs.map((program, index) => (
            <section className="research-program" id={program.id} key={program.id}>
              <p className="research-card__index">0{index + 1}</p>
              <h2 className="research-program__title">{program.title}</h2>
              <p className="research-program__overview">{program.overview}</p>
              <p className="research-program__pubs-label">{locale === 'ko' ? '주요 주제' : 'Current themes'}</p>
              <ul className="kq-list">
                {program.topics.map((topic) => <li key={topic}>{topic}</li>)}
              </ul>
              {generatedPrograms[index]?.publications?.length ? (
                <>
                  <p className="research-program__pubs-label">{locale === 'ko' ? '관련 논문' : 'Related publications'}</p>
                  <ul className="kq-list">
                    {generatedPrograms[index].publications.map((publication) => <li key={publication}>{publication}</li>)}
                  </ul>
                </>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </Layout>
  )
}
