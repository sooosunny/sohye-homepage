import { profile } from './portfolio'

export const basePath = '/sohye-portfolio'

export const site = {
  name: profile.name,
  title: 'Sohye Bae | Tourism Researcher',
  description:
    'Tourism researcher studying technology, sustainability, consumer behavior, hospitality, and space tourism.',
  url: 'https://cameleonh.github.io/sohye-portfolio',
  email: profile.email,
  cvUrl: `${basePath}/cv/`,
  googleScholar: 'https://scholar.pusan.ac.kr',
  orcid: profile.linkedin,
  linkedin: profile.linkedin,
  instagram: profile.instagram,
  socialPreview: `${basePath}/social-preview.png`,
} as const
