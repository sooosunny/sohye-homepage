import type { AppProps } from 'next/app'
import { IBM_Plex_Mono, Inter, Source_Serif_4 } from 'next/font/google'
import Script from 'next/script'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-source-serif', display: 'swap' })
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: '500', variable: '--font-ibm-plex-mono', display: 'swap' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`font-shell ${inter.variable} ${sourceSerif.variable} ${ibmPlexMono.variable}`}>
      {process.env.NODE_ENV === 'development' && (
        <>
          <Script src="//unpkg.com/react-grab/dist/index.global.js" strategy="afterInteractive" />
          <Script src="//unpkg.com/react-scan/dist/auto.global.js" strategy="afterInteractive" />
        </>
      )}
      <Component {...pageProps} />
    </div>
  )
}
