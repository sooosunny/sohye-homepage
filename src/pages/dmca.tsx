import Head from 'next/head'
import Link from 'next/link'
import { site } from '../content/site'

export default function DMCA() {
  return (
    <>
      <Head>
        <title>Copyright / DMCA | {site.name}</title>
        <meta
          name="description"
          content="Copyright and content-use information for this academic website."
        />
      </Head>
      <main className="page">
        <div className="container container--narrow">
          <header className="page-header">
            <p className="eyebrow">Copyright</p>
            <h1 className="page-header__title">Copyright / DMCA</h1>
          </header>

          <section className="prose">
            <p>
              The text, graphics, photographs, and other original materials on this website
              are the work of {site.name} unless otherwise noted. Please do not reproduce,
              redistribute, train models on, or publish substantial portions of this material
              without permission and clear attribution.
            </p>
            <p>
              To report suspected unauthorized use, please contact{' '}
              <a href={`mailto:${site.email}`}>{site.email}</a> with the original page URL,
              the allegedly infringing URL, and a description of the material involved.
            </p>
            <p>
              This page is an informational contact point, not legal advice. Formal
              takedown requests should be reviewed for the applicable jurisdiction and
              submitted to the relevant hosting provider.
            </p>
            <p>
              <Link href="/">Return to the homepage</Link>
            </p>
          </section>
        </div>
      </main>
    </>
  )
}
