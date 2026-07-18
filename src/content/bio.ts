import { profile } from './portfolio'

export const bio = {
  name: profile.name,
  title: profile.role.en,
  affiliation: profile.affiliation.en,
  positioningStatement: profile.statement.en,
  about: profile.about.en,
  teachingSnapshot:
    'Research projects, awards, professional training, and public-facing activities connect scholarship with tourism practice.',
  headshotAlt: 'Portrait of Sohye Bae, tourism researcher',
} as const
