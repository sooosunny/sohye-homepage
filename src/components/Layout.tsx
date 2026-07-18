import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { basePath, site } from '../content/site'
import { getLocaleFromPath, localizedPath, localeText } from '../content/i18n'

function serializeStructuredData(value: object): string {
  return JSON.stringify(value).replace(/[<>&]/g, (character) => {
    const codePoint = character.codePointAt(0)
    return codePoint === undefined ? '' : `\\u${codePoint.toString(16).padStart(4, '0')}`
  })
}

interface LayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  ogImage?: string
}

export default function Layout({
  children,
  title,
  description,
  ogImage,
}: LayoutProps) {
  const router = useRouter()
  const locale = getLocaleFromPath(router.pathname)
  const labels = localeText[locale]
  const pageTitle = title ? `${title} | ${labels.displayName}` : locale === 'ko' ? '배소혜 | 관광 연구자' : site.title
  const pageDescription = description || site.description
  const pageImage = ogImage || site.socialPreview
  const canonicalPath = localizedPath(router.pathname, locale)
  const englishUrl = `${site.url}${localizedPath(router.pathname, 'en')}`
  const koreanUrl = `${site.url}${localizedPath(router.pathname, 'ko')}`
  const canonicalUrl = `${site.url}${canonicalPath}`

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="author" content={site.name} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={englishUrl} />
        <link rel="alternate" hrefLang="ko" href={koreanUrl} />
        <link rel="icon" type="image/svg+xml" href={`${basePath}/favicon.svg`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/favicon-32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${basePath}/favicon-16.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${basePath}/apple-touch-icon.png`} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:locale" content={locale === 'ko' ? 'ko_KR' : 'en_US'} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />

        <script type="application/ld+json">
          {serializeStructuredData({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: site.name,
              jobTitle: 'Postdoctoral Research Fellow',
              affiliation: {
                '@type': 'Organization',
                name: 'Pusan National University',
              },
              url: site.url,
              image: `${site.url}/headshot.png`,
              sameAs: [site.linkedin, site.instagram],
            })}
        </script>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
