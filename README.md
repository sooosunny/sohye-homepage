# Academic Personal Website

A clean, professional, static academic website built with Next.js.

## Quick Start

```bash
npm install
npm run dev          # local development at http://localhost:3000
npm run build        # production build/export → /out folder
```

## Deployment (GitHub Pages)

A GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys the static export on pushes to `main`.

## Routine Content Updates

The public repository contains only the generated website content and public
PDF. The two Word source documents remain local and are intentionally ignored.
When they are available at the repository root, refresh the generated output
before committing a content update:

- `public/cv.docx` -> `scripts/cv/parse_docx.py` -> `src/generated/cv-data.json`
  (publications + statuses, employment, education, teaching offerings, CV page)
- `site-content.docx` -> `scripts/cv/parse_site_content.py` -> `src/generated/site-content.json`
  (homepage hero/About/Teaching preview text, research program narratives, key
  questions, teaching philosophy, course descriptions, classroom activities)

Run `npm run refresh:content` to perform both parsing steps. It also runs
`npm run check:content-sync`, which prints a non-fatal
warning listing any publication title in `site-content.docx` that doesn't
match a title in `public/cv.docx` — that reference will render without
authors/venue/status/DOI on the Research page until the paper is added to
the CV or the title text is fixed.

The Research page lists publications by title under each program; each title is
matched against the parsed CV, so statuses/DOIs update from `public/cv.docx` alone.
Course offerings on the Teaching page also come from the CV.

### Publication-only update

To update the Publications page from the local CV without refreshing the site
narratives:

1. Edit the `PUBLICATIONS` and `WORK IN PROGRESS` sections in `public/cv.docx`.
2. Run `npm run refresh:publications`.
3. Run `npm run build` to verify the generated site.
4. Commit the updated `src/generated/cv-data.json` and push it with the code.

The Word file is intentionally local-only; the committed generated JSON is
what GitHub Pages uses during deployment.

The Korean pages are generated from the English `site-content.docx` source.
Existing reviewed translations in `scripts/cv/create_korean_site_content.py`
are reused first. New or changed prose is translated automatically through the
OpenAI Responses API and saved in
`scripts/cv/site_content_ko_auto_translations.json` for later review and reuse.
Publication titles, course names, activity names, and CV data remain in English.
After updating the English Word source, refresh both language payloads together:

```bash
npm run refresh:content
```

`npm run generate:content:ko` is also available when only the Korean payload
needs refreshing. It regenerates the local `site-content-ko.docx` and the
committed `src/generated/site-content-ko.json`. Set `OPENAI_API_KEY` in the
environment before running it when the English source contains new prose. The
default translation model is `gpt-5.4-mini`; set `OPENAI_TRANSLATION_MODEL` to
override it. Review or edit newly generated translations directly in the JSON
cache when desired. The Korean Word source remains local alongside the English
source document.

`site-content.docx` uses ALL-CAPS marker lines (`HOME HERO`, `HOME ABOUT`, `HOME TEACHING`,
`RESEARCH INTRO`, `PROGRAM:`, `KEY QUESTIONS`, `PUBLICATIONS`,
`TEACHING PHILOSOPHY`, `COURSE:`, `ACTIVITIES:`, `ITEM:`). Everything under a
marker is body text for it. `HOME HERO`, `HOME ABOUT`, and `HOME TEACHING` render
as plain paragraphs (no inline links) in the homepage hero, About, and Teaching
preview sections.

| What to update | File |
|---|---|
| Update master CV (local only) | `public/cv.docx` |
| Update research narratives / teaching text (local only) | `site-content.docx` |
| Regenerate Korean site narratives / teaching text | `npm run generate:content:ko` |
| Refresh public generated data | `npm run refresh:content` |
| Update links (Scholar, ORCID) | `src/content/site.ts` |

## Adding Your Headshot

Replace `public/headshot.png` with the public headshot you want the site to
serve. The homepage already references that asset:

```tsx
<img
  src="/headshot.png"
  alt="Academic profile photo"
  className="hero__headshot"
  width={180}
  height={220}
/>
```

## Updating Google Scholar and ORCID Links

Edit `src/content/site.ts`:

```ts
googleScholar: 'https://scholar.google.com/citations?user=YOUR_ACTUAL_ID',
orcid: 'https://orcid.org/YOUR-ACTUAL-ORCID',
```

## Copyguard hardening

The site includes lightweight copyguard hardening: AI crawler opt-out signals
in `public/robots.txt`, a supplemental `public/ai.txt` policy, `noai` and
`noimageai` metadata, a unique `cg-canary` marker for clone detection, an
informational `/dmca/` contact page, and production source-map suppression.

These measures raise copying and attribution costs but cannot prevent copying
of content that a browser renders. The site is deployed as a static GitHub
Pages export, so response-header protections such as CSP `frame-ancestors` and
`X-Frame-Options` must be configured at a host or proxy that supports custom
headers; they are not enforced by this repository alone. Right-click and
whole-page copy blocking are intentionally omitted because they are easy to
bypass and harm accessibility, SEO, and normal use.

## Project Structure

```
src/
  components/   Reusable UI components
  content/      All text content — edit here for routine updates
  generated/    Auto-generated data from CV parser
  pages/        One file per page
  styles/       Global CSS with design tokens
scripts/
  cv/           CV parsing scripts
public/
  headshot.png  Public homepage photo
```
