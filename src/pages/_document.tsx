import { Html, Head, Main, NextScript } from 'next/document'
import type { DocumentProps } from 'next/document'

// Applies the saved text-size scale before first paint so pages never
// flash at the default size. Must stay in sync with TextSizeControl.
const FONT_SCALE_SCRIPT = `
try {
  var s = parseFloat(localStorage.getItem('jl-font-scale'));
  if (s && s > 0.5 && s < 2 && s !== 1) {
    document.documentElement.style.fontSize = (112.5 * s) + '%';
  }
} catch (e) {}
`

const THEME_SCRIPT = `
var storedTheme = localStorage.getItem('sb-theme');
var theme = storedTheme === 'dark' || storedTheme === 'light'
  ? storedTheme
  : 'light';
document.documentElement.dataset.theme = theme;
`

export default function Document({ __NEXT_DATA__ }: DocumentProps) {
  const lang = __NEXT_DATA__.page === '/ko' || __NEXT_DATA__.page.startsWith('/ko/')
    ? 'ko'
    : 'en'

  return (
    <Html lang={lang}>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: FONT_SCALE_SCRIPT }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
