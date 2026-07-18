export type Locale = 'en' | 'ko'

export const localeText = {
  en: {
    displayName: 'Sohye Bae',
    home: 'Home',
    research: 'Research',
    teaching: 'Experience',
    cv: 'CV',
    about: 'About',
    publications: 'Publications',
    teachingPreview: 'Professional Experience',
    teachingLink: 'View experience →',
    keyQuestions: 'Key questions',
    relatedWork: 'Related work',
    teachingPhilosophy: 'Teaching Philosophy',
    courses: 'Courses',
    classroomActivities: 'Selected Classroom Activities',
    activitiesFor: 'Activities for',
    cvTitle: 'Curriculum Vitae',
    cvDescription:
      'Curriculum vitae of Sohye Bae, tourism researcher at Pusan National University.',
    cvDownload: 'Download CV (PDF)',
    cvOpenPdf: 'Open PDF in New Tab',
    lastUpdated: 'Last updated',
    employment: 'Employment',
    education: 'Education',
    researchAreas: 'Research Areas',
    invitedTalks: 'Invited Talks',
    presentations: 'Selected Conference Presentations',
    honors: 'Honors & Grants',
    service: 'Review & Editorial Service',
    otherService: 'Other Professional Service',
    journalArticles: 'Journal Articles',
    bookChapters: 'Book Chapters',
    workInProgress: 'Work in Progress',
    workshops: 'Workshops',
    dissertation: 'Dissertation',
    email: 'Email',
    copied: 'Copied!',
    copyEmail: 'Copy email address',
    textSize: 'Text size',
    decreaseTextSize: 'Decrease text size',
    increaseTextSize: 'Increase text size',
    resetTextSize: 'Reset text size to default',
    resetTextSizeTitle: 'Reset text size',
    language: 'Language',
    mainNavigation: 'Main navigation',
    switchToKorean: '한국어',
    switchToEnglish: 'English',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
    homeDescription:
      'Tourism researcher studying technology, sustainability, hospitality, consumer behavior, and space tourism.',
    profileTitle: 'Postdoctoral Research Fellow',
    positioningStatement:
      'I study how technology, sustainability, and emerging experiences reshape tourism and hospitality.',
    headshotAlt: '관광 연구자 배소혜의 프로필 사진',
    researchDescription:
      'Research on technology, sustainability, culture, hospitality, and space tourism.',
    teachingDescription:
      'Research projects, awards, training, and professional activities.',
  },
  ko: {
    displayName: '배소혜',
    home: '홈',
    research: '연구',
    teaching: '경력',
    cv: 'CV',
    about: '소개',
    publications: '논문',
    teachingPreview: '주요 경력',
    teachingLink: '경력 보기 →',
    keyQuestions: '핵심 질문',
    relatedWork: '관련 연구',
    teachingPhilosophy: '강의 철학',
    courses: '과목',
    classroomActivities: '수업 활동 사례',
    activitiesFor: '수업 활동:',
    cvTitle: 'Curriculum Vitae',
    cvDescription:
      '부산대학교 관광 연구자 배소혜의 온라인 이력서입니다.',
    cvDownload: '영문 CV 다운로드 (PDF)',
    cvOpenPdf: '영문 PDF 새 탭에서 열기',
    lastUpdated: '최근 업데이트',
    employment: '경력',
    education: '학력',
    researchAreas: '연구 분야',
    invitedTalks: '초청 강연',
    presentations: '주요 학술대회 발표',
    honors: '수상 및 연구비',
    service: '심사 및 편집 활동',
    otherService: '기타 전문 활동',
    journalArticles: '학술지 논문',
    bookChapters: '저서 수록 논문',
    workInProgress: '진행 중인 연구',
    workshops: '워크숍',
    dissertation: '학위논문',
    email: '이메일',
    copied: '복사됨!',
    copyEmail: '이메일 주소 복사',
    textSize: '글자 크기',
    decreaseTextSize: '글자 크기 줄이기',
    increaseTextSize: '글자 크기 키우기',
    resetTextSize: '기본 글자 크기로 되돌리기',
    resetTextSizeTitle: '글자 크기 초기화',
    language: '언어',
    mainNavigation: '주 메뉴',
    switchToKorean: '한국어',
    switchToEnglish: 'English',
    openMenu: '메뉴 열기',
    closeMenu: '메뉴 닫기',
    homeDescription:
      '기술, 지속가능성, 호스피탈리티, 소비자 행동, 우주관광을 연구하는 관광학 연구자입니다.',
    profileTitle: '박사후연구원',
    positioningStatement:
      '기술, 지속가능성, 새로운 경험이 관광과 호스피탈리티를 어떻게 변화시키는지 연구합니다.',
    headshotAlt: '관광 연구자 배소혜',
    researchDescription:
      '기술, 지속가능성, 문화, 호스피탈리티, 우주관광에 관한 연구입니다.',
    teachingDescription:
      '연구용역, 수상, 교육 수료, 전문 활동을 소개합니다.',
  },
} as const

export function getLocaleFromPath(pathname: string): Locale {
  return /^\/ko(?:\/|$)/.test(pathname) ? 'ko' : 'en'
}

export function localizedPath(pathname: string, locale: Locale): string {
  const withoutLocale = pathname.replace(/^\/ko(?=\/|$)/, '') || '/'
  if (locale === 'en') return withoutLocale
  return withoutLocale === '/' ? '/ko/' : `/ko${withoutLocale}`
}
