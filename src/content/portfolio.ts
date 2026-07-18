export type LocalizedText = {
  readonly en: string
  readonly ko: string
}

export type ResearchArea = {
  readonly id: string
  readonly title: LocalizedText
  readonly description: LocalizedText
  readonly topics: readonly string[]
}

export type DatedEntry = {
  readonly date: string
  readonly en: string
  readonly ko: string
}

export const profile = {
  name: 'Sohye Bae',
  koreanName: '배소혜',
  role: {
    en: 'Postdoctoral Research Fellow',
    ko: '박사후연구원',
  },
  affiliation: {
    en: 'Institute of Economics and International Trade, Pusan National University',
    ko: '부산대학교 경제통상연구원',
  },
  field: {
    en: 'Tourism Management',
    ko: '관광학',
  },
  statement: {
    en: 'I study how technology, sustainability, and emerging experiences reshape tourism and hospitality.',
    ko: '기술, 지속가능성, 새로운 경험이 관광과 호스피탈리티를 어떻게 변화시키는지 연구합니다.',
  },
  about: {
    en: 'Sohye Bae is a tourism researcher working across hospitality, consumer behavior, sustainable tourism, and emerging technologies. Her research connects real-world industry questions with quantitative analysis, big-data methods, and experimental approaches.',
    ko: '배소혜는 호스피탈리티, 소비자 행동, 지속가능한 관광, 신기술을 아우르는 관광 연구자입니다. 산업 현장의 문제를 정량 분석, 빅데이터, 실험 연구와 연결합니다.',
  },
  email: 'sohye.bae@gmail.com',
  phone: '+82 10 9366 0029',
  instagram: 'https://www.instagram.com/baesohye',
  linkedin: 'https://www.linkedin.com/in/sohye-bae-511ba7134',
} as const

export const researchAreas: readonly ResearchArea[] = [
  {
    id: 'technology',
    title: { en: 'Technology & Hospitality', ko: '기술과 호스피탈리티' },
    description: {
      en: 'How service robots, robot chefs, virtual environments, and personalized media shape attitudes, trust, and behavioral intentions.',
      ko: '서빙로봇, 로봇 셰프, 가상환경, 개인화 미디어가 태도와 신뢰, 행동의도에 미치는 영향을 연구합니다.',
    },
    topics: ['Service robots', 'Robot chefs', 'VR experiments', 'Personalized advertising'],
  },
  {
    id: 'sustainability',
    title: { en: 'Sustainability & ESG', ko: '지속가능성과 ESG' },
    description: {
      en: 'Consumer participation in reusable systems, pro-environmental behavior, ESG management, and responsible tourism.',
      ko: '다회용 시스템 참여, 친환경 행동, ESG 경영, 책임 있는 관광을 소비자 관점에서 탐구합니다.',
    },
    topics: ['Reusable cups', 'ESG management', 'Pro-environmental identity', 'Food-waste reduction'],
  },
  {
    id: 'culture',
    title: { en: 'Culture, Media & Place', ko: '문화·미디어·장소' },
    description: {
      en: 'Digital discourse, cultural heritage, food culture, walking tourism, and new forms of destination experience.',
      ko: '디지털 담론, 문화유산, 음식문화, 걷기여행, 새로운 목적지 경험을 분석합니다.',
    },
    topics: ['K-food', 'K-pop discourse', 'Cultural heritage', 'Walking tourism'],
  },
  {
    id: 'space',
    title: { en: 'Space Tourism Futures', ko: '우주관광의 미래' },
    description: {
      en: 'Psychological recovery, risk perception, willingness to pay, sustainability, regulation, and the emerging space-tourism ecosystem.',
      ko: '심리적 회복, 위험 인식, 지불의사, 지속가능성, 규제, 우주관광 생태계를 연구합니다.',
    },
    topics: ['Immersive recovery', 'Risk perception', 'Space tourist experience', 'Policy & ethics'],
  },
] as const

export const projects: readonly DatedEntry[] = [
  {
    date: '2025',
    en: 'Development of the Haeundae Core Cultural Tourism Belt, Haeundae District Office, Busan.',
    ko: '해운대 핵심 문화관광벨트 조성 용역, 부산광역시 해운대구청.',
  },
  {
    date: '2025',
    en: 'Establishment of the Banyeo–Bansong Development Master Plan, Haeundae District Office, Busan.',
    ko: '반여·반송 발전 마스터플랜 수립 용역, 부산광역시 해운대구청.',
  },
  {
    date: '2019',
    en: 'Evaluation and Revitalisation Strategies for Tourism Development Projects, Ministry of Culture, Sports and Tourism.',
    ko: '관광지 등 조성사업 평가 및 활성화 방안 총괄보고서, 문화체육관광부.',
  },
] as const

export const awards: readonly DatedEntry[] = [
  {
    date: '2026.02.24',
    en: 'Presidential Commendation, Jeju · AWS Global Space Challenge Hackathon.',
    ko: '제주·AWS 글로벌 스페이스 챌린지 해커톤 제주한라대학교 총장 표창.',
  },
  {
    date: '2025.11.20',
    en: 'Youth Volunteer Corps Award, Busan Economic Promotion Agency.',
    ko: '청년봉사단 부산경제진흥원 원장 표창.',
  },
  {
    date: '2025.01.23',
    en: 'PNU-Star Award, Pusan National University.',
    ko: '2024학년도 PNU-Star 부산대학교 총장 표창.',
  },
  {
    date: '2025.01.15',
    en: 'Best Paper Award, 97th TOSOK International Tourism Conference.',
    ko: '제97차 한국관광학회 국제학술대회 우수논문상.',
  },
  {
    date: '2024.12.17',
    en: 'Excellent Paper Award, 40th Korean Foodservice Industry Association Conference.',
    ko: '제40차 한국외식산업학회 우수논문상.',
  },
  {
    date: '2024.12.04',
    en: 'Encouragement Prize, 7th Refuge Capital Busan Academic Paper Competition.',
    ko: '제7회 피란수도 부산 논문공모전 전문연구자 분야 장려상.',
  },
  {
    date: '2022.06.25',
    en: 'Excellent Paper Award, 35th Korean Foodservice Industry Association Conference.',
    ko: '제35차 한국외식산업학회 우수논문상.',
  },
] as const

export const training: readonly DatedEntry[] = [
  {
    date: '2025–2026',
    en: 'Jeju RISE · AWS Global Space Bootcamp, Amazon Web Services Korea.',
    ko: '제주 RISE·AWS 글로벌 스페이스 부트캠프, 아마존웹서비스 코리아.',
  },
  {
    date: '2022',
    en: 'Practical AI Project Programme.',
    ko: '실전형 인공지능 프로젝트 과정.',
  },
] as const
