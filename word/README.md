# Page Word Sources

Create or edit one Word document per page. Keep the marker lines exactly as
written; the text below each marker becomes the corresponding page content.
These source documents are versioned alongside the site so the editable source
travels with the project.

## Site pages

Use this format for `home.docx`, `research.docx`, and `teaching.docx`:

```text
HOME HERO
Short statement shown below the name on the homepage.

HOME ABOUT
Homepage About paragraph.

RESEARCH INTRO
Introduction shown at the top of the Research page.

PROGRAM: Research program title
Program overview paragraph.
KEY QUESTIONS
- First research question
- Second research question
PUBLICATIONS
Publication title or reference.

TEACHING INTRO
Introduction shown at the top of the Teaching page.
TEACHING PHILOSOPHY
Teaching philosophy paragraph.
COURSE: Course name
Course description.
PROJECT: 2026
Project description.
AWARD: 2025
Award description.
TRAINING: 2024
Training or certificate description.
```

Use only the markers relevant to that page. For example, `HOME HERO` and
`HOME ABOUT` belong in `home.docx`; `PROGRAM:` belongs in `research.docx`.
Multiple `PROGRAM:`, `COURSE:`, `PROJECT:`, `AWARD:`, and `TRAINING:` blocks
are supported.

## Publications and CV

`publications.docx` and `cv.docx` use the existing CV format. The important
headings are:

```text
RESEARCH AREAS
Tourism, Hospitality, Consumer Behavior, ESG

PUBLICATIONS
2026 Bae, S. "Article title." Journal Name, 12(1), 1-10.

WORK IN PROGRESS
Bae, S. "Working paper title." Target Journal [In Progress]

EMPLOYMENT
2026–Current Assistant Professor
University name

HONORS AND GRANTS
2025 Research award or grant
```

The parser also supports `EDUCATION`, `INVITED TALKS`, `SELECTED CONFERENCE
PRESENTATIONS`, `TEACHING`, `REVIEW AND EDITORIAL SERVICE`, and `OTHER
PROFESSIONAL SERVICE` using the same headings as the existing CV parser.

## Korean content

Add an optional sibling such as `research-ko.docx` when the page needs Korean
content. If it is absent, the site uses the built-in Korean fallback. English
and Korean documents are parsed independently.

## Refresh and publish

After editing a Word source and pushing it to `main`, GitHub Actions refreshes
the page data automatically before building GitHub Pages.

```bash
npm run refresh:page:research
npm run build
git add src/generated/pages/research.json
git commit -m "Update research page content"
git push origin main
```

Repeat with the relevant page command and generated JSON file. Commit both the
edited `.docx` source and its generated JSON; the generated JSON is the
deployable source used by GitHub Pages.
