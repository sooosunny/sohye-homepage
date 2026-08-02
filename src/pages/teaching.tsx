import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { getLocaleFromPath, localeText } from '../content/i18n'
import { getPageSiteContent } from '../content/pageContent'
import { awards, projects, training } from '../content/portfolio'

function PageTimeline({ entries }: { entries: readonly { date: string; text: string[] }[] }) {
  return (
    <div className="timeline">
      {entries.map((entry) => (
        <div className="cv-row" key={`${entry.date}-${entry.text.join(' ')}`}>
          <p className="cv-row__period">{entry.date}</p>
          <div className="cv-row__body"><p>{entry.text.join(' ')}</p></div>
        </div>
      ))}
    </div>
  )
}

export default function Experience() {
  const locale = getLocaleFromPath(useRouter().pathname)
  const labels = localeText[locale]
  const pageContent = getPageSiteContent('teaching', locale)
  const teaching = pageContent.teaching
  const pageProjects = teaching?.projects?.length
    ? teaching.projects
    : projects.map((entry) => ({ date: entry.date, text: [entry[locale]] }))
  const pageAwards = teaching?.awards?.length
    ? teaching.awards
    : awards.map((entry) => ({ date: entry.date, text: [entry[locale]] }))
  const pageTraining = teaching?.training?.length
    ? teaching.training
    : training.map((entry) => ({ date: entry.date, text: [entry[locale]] }))

  return (
    <Layout title={labels.teaching} description={labels.teachingDescription}>
      <div className="page">
        <div className="container container--wide">
          <header className="page-header">
            <p className="eyebrow">{locale === 'ko' ? '현장과 연구의 연결' : 'Research in practice'}</p>
            <h1 className="page-header__title">{labels.teaching}</h1>
            <p className="page-header__intro">
              {teaching?.intro?.length
                ? teaching.intro.join(' ')
                : locale === 'ko'
                  ? '공공 관광 프로젝트, 학술 수상, 전문 교육을 통해 연구를 현장과 연결합니다.'
                  : 'Public tourism projects, academic recognition, and professional training connect my research with practice.'}
            </p>
          </header>
          {teaching?.philosophy?.length ? (
            <section className="cv-section">
              <p className="cv-section__label">{locale === 'ko' ? '교육 철학' : 'Teaching Philosophy'}</p>
              {teaching.philosophy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ) : null}
          {teaching?.courses?.length ? (
            <section className="cv-section">
              <p className="cv-section__label">{locale === 'ko' ? '강의' : 'Courses'}</p>
              {teaching.courses.map((course) => (
                <div className="cv-row" key={course.title}>
                  <p className="cv-row__period">{course.title}</p>
                  <div className="cv-row__body">
                    {course.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
              ))}
            </section>
          ) : null}
          {teaching?.activities?.length ? (
            <section className="cv-section">
              <p className="cv-section__label">{locale === 'ko' ? '수업 활동' : 'Classroom Activities'}</p>
              {teaching.activities.map((group) => (
                <div className="cv-row" key={group.course}>
                  <p className="cv-row__period">{group.course}</p>
                  <div className="cv-row__body">
                    {group.items.map((item) => (
                      <div key={item.name}>
                        <p>{item.name}</p>
                        {item.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ) : null}
          <section className="cv-section">
            <p className="cv-section__label">{locale === 'ko' ? '연구용역' : 'Research & Consulting Projects'}</p>
            <PageTimeline entries={pageProjects} />
          </section>
          <section className="cv-section">
            <p className="cv-section__label">{locale === 'ko' ? '수상' : 'Awards'}</p>
            <PageTimeline entries={pageAwards} />
          </section>
          <section className="cv-section">
            <p className="cv-section__label">{locale === 'ko' ? '교육 수료' : 'Training & Certificates'}</p>
            <PageTimeline entries={pageTraining} />
          </section>
        </div>
      </div>
    </Layout>
  )
}
