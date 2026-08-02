#!/usr/bin/env python3
"""Create editable page Word sources from the current public site content."""

from __future__ import annotations

from html import escape
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


ROOT = Path(__file__).resolve().parents[2]
WORD_DIR = ROOT / "word"


def write_docx(path: Path, paragraphs: list[str]) -> None:
    body = "".join(
        f'<w:p><w:r><w:t xml:space="preserve">{escape(text)}</w:t></w:r></w:p>'
        for text in paragraphs
    )
    document = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        f"<w:body>{body}<w:sectPr/></w:body></w:document>"
    )
    content_types = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
        '</Types>'
    )
    relationships = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'
        '</Relationships>'
    )
    path.parent.mkdir(parents=True, exist_ok=True)
    with ZipFile(path, "w", ZIP_DEFLATED) as archive:
        archive.writestr("[Content_Types].xml", content_types)
        archive.writestr("_rels/.rels", relationships)
        archive.writestr("word/document.xml", document)


RESEARCH_PROGRAMS = [
    (
        "Technology & Hospitality",
        "How service robots, robot chefs, virtual environments, and personalized media shape attitudes, trust, and behavioral intentions.",
        ["Service robots", "Robot chefs", "VR experiments", "Personalized advertising"],
    ),
    (
        "Sustainability & ESG",
        "Consumer participation in reusable systems, pro-environmental behavior, ESG management, and responsible tourism.",
        ["Reusable cups", "ESG management", "Pro-environmental identity", "Food-waste reduction"],
    ),
    (
        "Culture, Media & Place",
        "Digital discourse, cultural heritage, food culture, walking tourism, and new forms of destination experience.",
        ["K-food", "K-pop discourse", "Cultural heritage", "Walking tourism"],
    ),
    (
        "Space Tourism Futures",
        "Psychological recovery, risk perception, willingness to pay, sustainability, regulation, and the emerging space-tourism ecosystem.",
        ["Immersive recovery", "Risk perception", "Space tourist experience", "Policy & ethics"],
    ),
]

RESEARCH_PROGRAMS_KO = [
    ("기술과 호스피탈리티", "서빙로봇, 로봇 셰프, 가상환경, 개인화 미디어가 태도와 신뢰, 행동의도에 미치는 영향을 연구합니다.", ["서빙로봇", "로봇 셰프", "VR 실험", "개인화 광고"]),
    ("지속가능성과 ESG", "다회용 시스템 참여, 친환경 행동, ESG 경영, 책임 있는 관광을 소비자 관점에서 탐구합니다.", ["다회용 컵", "ESG 경영", "친환경 정체성", "음식물 쓰레기 감축"]),
    ("문화·미디어·장소", "디지털 담론, 문화유산, 음식문화, 걷기여행, 새로운 목적지 경험을 분석합니다.", ["K-푸드", "K-pop 담론", "문화유산", "걷기여행"]),
    ("우주관광의 미래", "심리적 회복, 위험 인식, 지불의사, 지속가능성, 규제, 우주관광 생태계를 연구합니다.", ["몰입형 회복", "위험 인식", "우주관광객 경험", "정책과 윤리"]),
]

PUBLICATIONS = [
    ("2026", "Bae, S., Song, H. G., & Sunny, H. W.", "From viewing to buying: How viewer attitudes and para-social bonds drive short food content purchase intentions.", "Culinary Science & Hospitality Research", "32(2)"),
    ("2025", "Bae, S., & Park, G. G.", "The Effects of Consumers’ Perceptions of ESG Management in Foodservice Franchises on Reuse Intention: An Ordered Probit Analysis.", "Culinary Science & Hospitality Research", "31(12), 243–254"),
    ("2025", "Bae, S., & Park, G.", "An Ordered Probit Analysis of the Factors Influencing Relationships among Cultural Heritage Tourism Motivation, Constraints, and Attitudes.", "FoodService Industry Journal", "21(6), 431–454"),
    ("2025", "Bae, S., & Kim, I.", "Comparative Analysis of Foreign Consumers’ Perceptions of K-Food Emotions: Focusing on Reddit Cases.", "The Journal of Internet Electronic Commerce Research", "25(5), 121–131"),
    ("2025", "Lee, S., Bae, S., & Kim, I.", "Exploring formation process of willingness to accept online personalised advertising for travel products.", "The e-Business Studies", "26(2), 109–125"),
    ("2025", "Nam, J. H., Bae, S., & Kwon, E. K.", "The impact of senior tourists’ package tour experiences on travel satisfaction, trust, and intention to pay premium.", "Journal of Tourism Enhancement", "129–148"),
    ("2025", "Yoon, H., Bae, S., & Park, E.", "Effects of Experiential Economic Factors on Emotional Attachment and Pro-Environmental Behaviour Among Nature-based Walking Tourists.", "Journal of Tourism Enhancement", "13(1), 91–111"),
    ("2024", "Bae, S., & Kim, I.", "Social Perception and Activation Strategies of Templestay: A Big Data Analysis.", "FoodService Industry Journal", "20(6), 275–288"),
    ("2024", "Kim, I., & Bae, S.", "The Effects of Motivation for Open-Kitchen Restaurants Adopting Robot Chefs on Consumer Attitude, Intentions to Use, and Word-of-Mouth.", "FoodService Industry Journal", "20(6), 383–397"),
    ("2024", "Park, E., Bae, S., & Kim, I.", "Exploring motivations influencing customers’ attitudes toward using reusable cups in eco-friendly coffee shops.", "Journal of Tourism Enhancement", "167–184"),
    ("2024", "Kim, Y., Bae, S., & Kim, I.", "Effects of Robotic Chefs’ Food Quality Prediction and Personal Innovativeness on Consumer Attitudes and Intention to Visit.", "Journal of Tourism Enhancement", "12(3), 27–42"),
    ("2024", "Bae, S., Kim, J., Kim, D., & Kim, I.", "Investigating benefits of operating shared kitchens for virtual restaurants: Small-business owner perspectives.", "Journal of Hospitality and Tourism Studies", "26(4), 193–204"),
    ("2024", "Kang, S., Han, S. H., Bae, S. H., & Yoon, Y. H.", "The effect of serving robots on attitude and behavioural intention of restaurant customers.", "Korean Journal of Franchise Management", "15(2), 57–75"),
    ("2024", "Bae, S., & Kim, I.", "Investigating barriers hindering attitude formation towards reusable cup usage in the coffee shop industry.", "FoodService Industry Journal", "20(3), 119–131"),
    ("2024", "Bae, S., & Kim, I.", "Exploring the structure of motivations, benefits and values of walking travel experience sharing on social media.", "Journal of Hospitality and Tourism Studies", "26(2), 65–79"),
    ("2023", "Bae, S., Park, H., Kang, S., & Han, S.", "How Usage Motivation Regarding Serving Robots Affect Customer Attitudes and Intent to Revisit Restaurants.", "FoodService Industry Journal", "19(6), 281–295"),
    ("2022", "Bae, S., & Kim, I.", "Importance-satisfaction Analysis for Campsite Selection Attributes after the COVID-19 Outbreak.", "Korean Journal of Hospitality & Tourism", "31(4), 127–145"),
]

WORK_IN_PROGRESS = [
    ("Bae, S., Lee, H., Soeiro, J. D., Shin, H., Metzger, P., & Kim, M. J.", "Immersive Recovery Through Space Tourism: An Experimental Study on Psychological and Physiological Responses.", "Tourism Management"),
    ("Lee, H., Bae, S., Soeiro, J. D., Shin, H., Metzger, P., & Kim, M. J.", "Does Microgravity-like VR Recalibrate Risk? Evidence from Underwater vs. Ground VR for Space Tourism.", "Annals of Tourism Research"),
    ("Park, G., Bae, S., Lee, H., Soeiro, J. D., Metzger, P., & Kim, M. J.", "Estimating Consumer Preferences for Space Tourism Experiences.", "Journal of Travel Research"),
    ("Bae, S., Choi, H., Kim, N., Petrick, J. F., & Kim, M. J.", "Space Flight Experience Interview.", "Annals of Tourism Research"),
    ("Bae, S., Lim, W. M., Lee, H., Hong, M., & Kim, M. J.", "Space tourism bibliometric analysis: Sustainability, ethics & corporate social responsibility.", "Annals of Tourism Research"),
]

AWARDS = [
    ("2026.02.24", "Presidential Commendation, Jeju · AWS Global Space Challenge Hackathon."),
    ("2025.11.20", "Youth Volunteer Corps Award, Busan Economic Promotion Agency."),
    ("2025.01.23", "PNU-Star Award, Pusan National University."),
    ("2025.01.15", "Best Paper Award, 97th TOSOK International Tourism Conference."),
    ("2024.12.17", "Excellent Paper Award, 40th Korean Foodservice Industry Association Conference."),
    ("2024.12.04", "Encouragement Prize, 7th Refuge Capital Busan Academic Paper Competition."),
    ("2022.06.25", "Excellent Paper Award, 35th Korean Foodservice Industry Association Conference."),
]

AWARDS_KO = [
    ("2026.02.24", "제주·AWS 글로벌 스페이스 챌린지 해커톤 제주한라대학교 총장 표창."),
    ("2025.11.20", "청년봉사단 부산경제진흥원 원장 표창."),
    ("2025.01.23", "2024학년도 PNU-Star 부산대학교 총장 표창."),
    ("2025.01.15", "제97차 한국관광학회 국제학술대회 우수논문상."),
    ("2024.12.17", "제40차 한국외식산업학회 우수논문상."),
    ("2024.12.04", "제7회 피란수도 부산 논문공모전 전문연구자 분야 장려상."),
    ("2022.06.25", "제35차 한국외식산업학회 우수논문상."),
]


def site_page(home: str, research: list[tuple[str, str, list[str]]], teaching: list[str]) -> list[str]:
    lines = ["HOME HERO", home, "HOME ABOUT"]
    lines += [
        "Sohye Bae is a tourism researcher working across hospitality, consumer behavior, sustainable tourism, and emerging technologies. Her research connects real-world industry questions with quantitative analysis, big-data methods, and experimental approaches.",
        "RESEARCH INTRO",
        "My work examines tourism and hospitality through four connected lenses: technology, sustainability, culture, and future experiences.",
    ]
    for title, overview, topics in research:
        lines += [f"PROGRAM: {title}", overview, "KEY QUESTIONS", *[f"- {topic}" for topic in topics]]
    lines += ["TEACHING INTRO", "Public tourism projects, academic recognition, and professional training connect my research with practice.", *teaching]
    return lines


def site_page_ko(teaching: list[str]) -> list[str]:
    lines = ["HOME HERO", "기술, 지속가능성, 새로운 경험이 관광과 호스피탈리티를 어떻게 변화시키는지 연구합니다.", "HOME ABOUT", "배소혜는 호스피탈리티, 소비자 행동, 지속가능한 관광, 신기술을 아우르는 관광 연구자입니다. 산업 현장의 문제를 정량 분석, 빅데이터, 실험 연구와 연결합니다.", "RESEARCH INTRO", "관광과 호스피탈리티의 변화를 기술, 지속가능성, 문화, 미래 경험이라는 네 축에서 탐구합니다."]
    for title, overview, topics in RESEARCH_PROGRAMS_KO:
        lines += [f"PROGRAM: {title}", overview, "KEY QUESTIONS", *[f"- {topic}" for topic in topics]]
    lines += ["TEACHING INTRO", "공공 관광 프로젝트, 학술 수상, 전문 교육을 통해 연구를 현장과 연결합니다.", *teaching]
    return lines


def teaching_lines(ko: bool = False) -> list[str]:
    if ko:
        projects = [("2025", "해운대 핵심 문화관광벨트 조성 용역, 부산광역시 해운대구청."), ("2025", "반여·반송 발전 마스터플랜 수립 용역, 부산광역시 해운대구청."), ("2019", "관광지 등 조성사업 평가 및 활성화 방안 총괄보고서, 문화체육관광부.")]
        training = [("2025–2026", "제주 RISE·AWS 글로벌 스페이스 부트캠프, 아마존웹서비스 코리아."), ("2022", "실전형 인공지능 프로젝트 과정.")]
    else:
        projects = [("2025", "Development of the Haeundae Core Cultural Tourism Belt, Haeundae District Office, Busan."), ("2025", "Establishment of the Banyeo–Bansong Development Master Plan, Haeundae District Office, Busan."), ("2019", "Evaluation and Revitalisation Strategies for Tourism Development Projects, Ministry of Culture, Sports and Tourism.")]
        training = [("2025–2026", "Jeju RISE · AWS Global Space Bootcamp, Amazon Web Services Korea."), ("2022", "Practical AI Project Programme.")]
    lines: list[str] = []
    for date, text in projects:
        lines += [f"PROJECT: {date}", text]
    for date, text in (AWARDS_KO if ko else AWARDS):
        lines += [f"AWARD: {date}", text]
    for date, text in training:
        lines += [f"TRAINING: {date}", text]
    return lines


def publication_lines() -> list[str]:
    lines = ["PUBLICATIONS"]
    for year, authors, title, venue, pages in PUBLICATIONS:
        lines.append(f'{year} {authors} "{title}" {venue}, {pages}.')
    lines.append("WORK IN PROGRESS")
    for authors, title, venue in WORK_IN_PROGRESS:
        lines.append(f'{authors} "{title}" {venue} [In Progress]')
    return lines


def cv_lines(ko: bool = False) -> list[str]:
    areas = "관광, 호스피탈리티, 소비자 행동, ESG, 서비스 로봇, 빅데이터, 우주관광" if ko else "Tourism, Hospitality, Consumer Behavior, ESG, Service Robots, Big Data, Space Tourism"
    lines = ["RESEARCH AREAS", areas, *publication_lines(), "HONORS AND GRANTS"]
    for date, text in (AWARDS_KO if ko else AWARDS):
        lines.append(f"{date} {text}")
    return lines


def main() -> None:
    teaching_en = teaching_lines()
    teaching_ko = teaching_lines(ko=True)
    write_docx(WORD_DIR / "home.docx", site_page("I study how technology, sustainability, and emerging experiences reshape tourism and hospitality.", RESEARCH_PROGRAMS, teaching_en))
    write_docx(WORD_DIR / "home-ko.docx", site_page_ko(teaching_ko))
    write_docx(WORD_DIR / "research.docx", site_page("", RESEARCH_PROGRAMS, []))
    write_docx(WORD_DIR / "research-ko.docx", [line for line in site_page_ko([]) if not line.startswith("HOME ") and line not in {"기술, 지속가능성, 새로운 경험이 관광과 호스피탈리티를 어떻게 변화시키는지 연구합니다.", "배소혜는 호스피탈리티, 소비자 행동, 지속가능한 관광, 신기술을 아우르는 관광 연구자입니다. 산업 현장의 문제를 정량 분석, 빅데이터, 실험 연구와 연결합니다."}])
    write_docx(WORD_DIR / "teaching.docx", ["TEACHING INTRO", "Public tourism projects, academic recognition, and professional training connect my research with practice.", *teaching_en])
    write_docx(WORD_DIR / "teaching-ko.docx", ["TEACHING INTRO", "공공 관광 프로젝트, 학술 수상, 전문 교육을 통해 연구를 현장과 연결합니다.", *teaching_ko])
    write_docx(WORD_DIR / "publications.docx", publication_lines())
    write_docx(WORD_DIR / "publications-ko.docx", publication_lines())
    write_docx(WORD_DIR / "cv.docx", cv_lines())
    write_docx(WORD_DIR / "cv-ko.docx", cv_lines(ko=True))
    print(f"Created 10 Word sources in {WORD_DIR}")


if __name__ == "__main__":
    main()
