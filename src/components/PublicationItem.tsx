import { Publication, PublicationStatus } from '../content/publications'
import { localeText, type Locale } from '../content/i18n'

function boldMyName(text: string) {
  const parts = text.split(/(Bae,\s*S\.?(?:\s*H\.)?|Bae,\s*Sohye|Sohye\s+Bae)/)
  return parts.map((part, i) =>
    /^(Bae,\s*S\.?(?:\s*H\.)?|Bae,\s*Sohye|Sohye\s+Bae)$/.test(part)
      ? <strong key={`${part}-${text.slice(0, i)}`}>{part}</strong>
      : part
  )
}

interface PublicationItemProps {
  pub: Publication
  showStatus?: boolean
  locale?: Locale
}

const statusLabelsEnglish: Record<PublicationStatus, string> = {
  Published: 'Published',
  Forthcoming: 'Forthcoming',
  'Conditionally Accepted': 'Conditionally Accepted',
  'Revise & Resubmit': 'R&R',
  'Under Review': 'Under Review',
  'Working Paper': 'Working Paper',
  'In Progress': 'In Progress',
}

const statusClass: Record<PublicationStatus, string> = {
  Published: 'pub-item__status--published',
  Forthcoming: 'pub-item__status--forthcoming',
  'Conditionally Accepted': 'pub-item__status--forthcoming',
  'Revise & Resubmit': 'pub-item__status--under-review pub-item__status--rnr',
  'Under Review': 'pub-item__status--under-review',
  'Working Paper': 'pub-item__status--in-progress',
  'In Progress': 'pub-item__status--in-progress',
}

export default function PublicationItem({
  pub,
  showStatus = true,
  locale = 'en',
}: PublicationItemProps) {
  const displayVenue = pub.status === 'Revise & Resubmit' ? '' : pub.venue
  const labels = localeText[locale]

  // When the year field just spells out the status ("Forthcoming") and the
  // status badge is already showing, keep only the badge — otherwise the
  // same word appears twice in one citation.
  const showsStatusBadge = showStatus && pub.status !== 'Published'
  const yearRedundantWithStatus =
    showsStatusBadge &&
    pub.year?.trim().toLowerCase() === statusLabelsEnglish[pub.status].toLowerCase()
  const showYear = pub.year && !yearRedundantWithStatus

  return (
    <li className="pub-item">
      <p className="pub-item__citation">
        <span>{boldMyName(pub.authors)} </span>
        {showYear && <span>{pub.year}. </span>}
        {pub.doi ? (
          <a
            href={pub.doi}
            className="pub-item__title"
            target="_blank"
            rel="noopener noreferrer"
          >
            {pub.title}
          </a>
        ) : (
          <em className="pub-item__title">{pub.title}</em>
        )}{' '}
        {displayVenue && <em className="pub-item__venue">{displayVenue}</em>}
        {pub.volumeIssuePages ? (
          <span>, {pub.volumeIssuePages}</span>
        ) : displayVenue ? (
          <span>.</span>
        ) : null}
        {pub.doi && (
          <>
            {' '}
            <a
              href={pub.doi}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.825rem',
                color: 'var(--color-text-muted)',
              }}
            >
              DOI ↗
            </a>
          </>
        )}
        {showsStatusBadge && (
          <span
            className={`pub-item__status ${statusClass[pub.status]}`}
            aria-label={`${labels.publications}: ${statusLabelsEnglish[pub.status]}`}
          >
            {statusLabelsEnglish[pub.status]}
          </span>
        )}
      </p>
    </li>
  )
}
