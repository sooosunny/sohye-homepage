import rawHome from '../generated/pages/home.json'
import rawResearch from '../generated/pages/research.json'
import rawPublications from '../generated/pages/publications.json'
import rawTeaching from '../generated/pages/teaching.json'
import rawCv from '../generated/pages/cv.json'
import type { Locale } from './i18n'

export type PageProgram = {
  title: string
  overview: string[]
  key_questions: string[]
  publications: string[]
}

export type PageSitePayload = {
  home?: {
    hero?: string[]
    about?: string[]
    teaching_snapshot?: string[]
  }
  research?: {
    intro?: string[]
    programs?: PageProgram[]
  }
  teaching?: {
    intro?: string[]
    philosophy?: string[]
    courses?: { title: string; description: string[] }[]
    activities?: {
      course: string
      items: { name: string; description: string[] }[]
    }[]
    projects?: { date: string; text: string[] }[]
    awards?: { date: string; text: string[] }[]
    training?: { date: string; text: string[] }[]
  }
}

export type PageCvPublication = {
  year?: string
  status?: string
  authors: string
  title: string
  venue?: string
  doi?: string
  volume_issue_pages?: string
  manuscript_available?: boolean
}

export type PageCvPayload = {
  meta?: { source?: string; generated_at?: string }
  contact?: { email?: string; website?: string }
  employment?: { period: string; title: string; institution?: string }[]
  education?: {
    year: string
    degree: string
    institution?: string
    dissertation?: string
    details?: string[]
  }[]
  research_areas?: string[]
  publications?: {
    published?: PageCvPublication[]
    work_in_progress?: PageCvPublication[]
  }
  invited_talks?: { period: string; text: string }[]
  selected_conference_presentations?: { period: string; text: string }[]
  honors_and_grants?: { period: string; text: string }[]
  teaching?: unknown
  review_and_editorial_service?: { period: string; text: string }[]
  other_professional_service?: unknown[]
}

type GeneratedPage<T> = {
  en?: T
  ko?: T
}

const sitePages: Record<string, GeneratedPage<PageSitePayload>> = {
  home: rawHome as GeneratedPage<PageSitePayload>,
  research: rawResearch as GeneratedPage<PageSitePayload>,
  teaching: rawTeaching as GeneratedPage<PageSitePayload>,
}

const cvPages: Record<string, GeneratedPage<PageCvPayload>> = {
  publications: rawPublications as GeneratedPage<PageCvPayload>,
  cv: rawCv as GeneratedPage<PageCvPayload>,
}

export function getPageSiteContent(page: 'home' | 'research' | 'teaching', locale: Locale): PageSitePayload {
  return sitePages[page][locale] ?? {}
}

export function getPageCvContent(page: 'publications' | 'cv', locale: Locale): PageCvPayload {
  return cvPages[page][locale] ?? {}
}
