import { profile } from './portfolio'

export const basePath = ''

export const site = {
  name: profile.name,
  canary: 'cg-sohye-20260801-bae-tourism',
  title: 'Sohye Bae | Tourism Researcher',
  description:
    'Tourism researcher studying technology, sustainability, consumer behavior, hospitality, and space tourism.',
  url: 'https://dr-sohye.shop',
  email: profile.email,
  cvUrl: `${basePath}/cv/`,
  googleScholar: 'https://scholar.pusan.ac.kr',
  orcid: profile.linkedin,
  linkedin: profile.linkedin,
  instagram: profile.instagram,
  socialPreview: `${basePath}/social-preview.png`,
} as const
