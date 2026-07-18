import { profile } from './portfolio'

export const basePath = ''

export const site = {
  name: profile.name,
  title: 'Sohye Bae | Tourism Researcher',
  description:
    'Tourism researcher studying technology, sustainability, consumer behavior, hospitality, and space tourism.',
  url: 'https://sooosunny.github.io/myweb_sohye',
  email: profile.email,
  cvUrl: `${basePath}/cv/`,
  googleScholar: 'https://scholar.pusan.ac.kr',
  orcid: profile.linkedin,
  linkedin: profile.linkedin,
  instagram: profile.instagram,
  socialPreview: `${basePath}/social-preview.png`,
} as const
