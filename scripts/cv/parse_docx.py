#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import zipfile
from pathlib import Path
import xml.etree.ElementTree as ET

# allow: SIZE_OK - build-time CV parser keeps docx extraction and section parsing together.
W_NS = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"

TOP_LEVEL_HEADINGS = {
    "EMPLOYMENT": "employment",
    "EDUCATION": "education",
    "RESEARCH AREAS": "research_areas",
    "PUBLICATIONS": "publications",
    "WORK IN PROGRESS": "work_in_progress",
    "INVITED TALKS": "invited_talks",
    "SELECTED CONFERENCE PRESENTATIONS": "selected_conference_presentations",
    "HONORS AND GRANTS": "honors_and_grants",
    "TEACHING": "teaching",
    "REVIEW AND EDITORIAL SERVICE": "review_and_editorial_service",
    "OTHER PROFESSIONAL SERVICE": "other_professional_service",
}

YEAR_LINE_RE = re.compile(
    r"^(?P<period>\d{4}(?:[.-]\d{2}(?:[.-]\d{2})?)?(?:\s*[\-–]\s*(?:\d{4}|Current))?(?:\s+(?:Fall|Spring|Summer|Winter))?)\s+(?P<text>.+)$"
)

DOI_URL_RE = re.compile(r"https?://doi\.org/\S+", flags=re.IGNORECASE)
DOI_RE = re.compile(r"10\.\d{4,9}/[-._;()/:A-Z0-9]+", flags=re.IGNORECASE)
RR_STATUS_RE = re.compile(
    r"\b(?:r\s*&\s*r|revise\s+(?:and|&)\s+resubmit)\b"
    r"(?:\s+(?:at|with)\s+(?P<venue>.+))?",
    flags=re.IGNORECASE,
)


def normalize_space(text: str) -> str:
    text = (
        text.replace("\u00a0", " ")
        .replace("\u2007", " ")
        .replace("\u202f", " ")
        .replace("\u2009", " ")
        .replace("\u2002", " ")
        .replace("\u2003", " ")
        .replace("\u200b", "")
        .replace("\ufeff", "")
        .replace("\u2028", "\n")
        .replace("\u2029", "\n")
    )
    return text


def normalize_line(line: str) -> str:
    line = normalize_space(line)
    line = line.replace("\t", " ")
    line = re.sub(r"\s+", " ", line)
    return line.strip()


def extract_docx_lines(input_path: Path) -> list[str]:
    with zipfile.ZipFile(input_path) as archive:
        xml_bytes = archive.read("word/document.xml")

    root = ET.fromstring(xml_bytes)
    paragraphs = root.findall(f".//{W_NS}p")

    lines: list[str] = []
    for paragraph in paragraphs:
        chunks: list[str] = []
        for elem in paragraph.iter():
            tag = elem.tag
            if tag == f"{W_NS}t":
                chunks.append(elem.text or "")
            elif tag == f"{W_NS}tab":
                chunks.append("\t")
            elif tag in (f"{W_NS}br", f"{W_NS}cr"):
                chunks.append("\n")

        raw_text = "".join(chunks)
        if not raw_text.strip():
            continue

        raw_text = normalize_space(raw_text)
        for raw_line in raw_text.splitlines():
            cleaned = normalize_line(raw_line)
            if cleaned:
                lines.append(cleaned)

    return lines


def heading_key(line: str) -> str | None:
    heading = re.sub(r"\s+", " ", normalize_line(line).upper()).strip()
    return TOP_LEVEL_HEADINGS.get(heading)


def split_sections(lines: list[str]) -> dict[str, list[str]]:
    sections: dict[str, list[str]] = {"header": []}
    current = "header"
    for line in lines:
        key = heading_key(line)
        if key:
            current = key
            sections.setdefault(current, [])
        else:
            sections.setdefault(current, []).append(line)
    return sections


def coalesce(lines: list[str], starts_new: callable) -> list[str]:
    items: list[str] = []
    current = ""

    for line in lines:
        if not line:
            continue
        if starts_new(line):
            if current:
                items.append(current.strip())
            current = line.strip()
        else:
            if current:
                current = f"{current} {line.strip()}".strip()
            else:
                current = line.strip()

    if current:
        items.append(current.strip())

    return items


def parse_contact(lines: list[str]) -> dict[str, str]:
    contact = {}
    for line in lines:
        lower = line.lower()
        if lower.startswith("email:"):
            contact["email"] = line.split(":", 1)[1].strip()
        elif lower.startswith("website:"):
            contact["website"] = line.split(":", 1)[1].strip()
    return contact


def parse_year_entries(lines: list[str]) -> list[dict[str, str]]:
    merged = coalesce(lines, lambda line: bool(YEAR_LINE_RE.match(line)))
    results: list[dict[str, str]] = []

    for item in merged:
        match = YEAR_LINE_RE.match(item)
        if not match:
            if results:
                results[-1]["text"] = f"{results[-1]['text']} {item}".strip()
            continue
        results.append(
            {
                "period": match.group("period").strip(),
                "text": match.group("text").strip(),
            }
        )
    return results


def parse_employment(lines: list[str]) -> list[dict[str, object]]:
    records: list[dict[str, object]] = []
    index = 0

    while index < len(lines):
        line = lines[index]
        match = YEAR_LINE_RE.match(line)
        if not match:
            index += 1
            continue

        period = match.group("period").strip()
        title = match.group("text").strip()
        institution = ""
        details: list[str] = []

        lookahead = index + 1
        while lookahead < len(lines):
            next_line = lines[lookahead]
            if YEAR_LINE_RE.match(next_line):
                break

            if not institution:
                institution = next_line
            else:
                details.append(next_line)
            lookahead += 1

        record: dict[str, object] = {
            "period": period,
            "title": title,
        }
        if institution:
            record["institution"] = institution
        if details:
            record["details"] = details

        records.append(record)
        index = lookahead

    return records


def parse_education(lines: list[str]) -> list[dict[str, object]]:
    entries: list[dict[str, object]] = []
    current: dict[str, object] | None = None

    for line in lines:
        match = re.match(r"^(\d{4})\s+(.+)$", line)
        if match:
            if current:
                entries.append(current)
            current = {"year": match.group(1), "lines": [match.group(2).strip()]}
            continue
        if current is not None:
            current["lines"].append(line)  # type: ignore[index]

    if current:
        entries.append(current)

    parsed: list[dict[str, object]] = []
    for entry in entries:
        lines_for_entry: list[str] = entry["lines"]  # type: ignore[assignment]
        degree = lines_for_entry[0] if lines_for_entry else ""
        dissertation = ""
        institution = ""
        details: list[str] = []

        for extra_line in lines_for_entry[1:]:
            lower = extra_line.lower()
            if lower.startswith("dissertation:"):
                dissertation = extra_line.split(":", 1)[1].strip()
            elif "university" in lower:
                if not institution:
                    institution = extra_line
                else:
                    details.append(extra_line)
            else:
                details.append(extra_line)

        if not institution:
            uni_match = re.search(r"(.+?)\s+((?:The\s+)?University\s+of\s+.+|Yonsei University)$", degree)
            if uni_match:
                degree = uni_match.group(1).strip()
                institution = uni_match.group(2).strip()

        record: dict[str, object] = {
            "year": entry["year"],
            "degree": degree,
        }
        if institution:
            record["institution"] = institution
        if dissertation:
            record["dissertation"] = dissertation
        if details:
            record["details"] = details

        parsed.append(record)

    return parsed


def parse_research_areas(lines: list[str]) -> list[str]:
    blob = normalize_line(" ".join(lines)).strip(" .")
    if not blob:
        return []
    return [piece.strip(" .") for piece in re.split(r",|;", blob) if piece.strip(" .")]


def normalize_doi_url(text: str) -> str:
    if text.lower().startswith("http"):
        return text.rstrip(").,; ")
    return f"https://doi.org/{text.rstrip(').,; ')}"


def extract_doi(text: str) -> tuple[str | None, str]:
    doi_url = DOI_URL_RE.search(text)
    if doi_url:
        url = normalize_doi_url(doi_url.group(0))
        text = text.replace(doi_url.group(0), " ").strip()
        return url, normalize_line(text)

    doi_raw = DOI_RE.search(text)
    if doi_raw:
        url = normalize_doi_url(doi_raw.group(0))
        text = text.replace(doi_raw.group(0), " ").strip()
        return url, normalize_line(text)

    return None, normalize_line(text)


def parse_publication_core(text: str) -> dict[str, str]:
    quote_match = re.search(r"[\"“](.+?)[\"”]", text)
    if quote_match:
        authors = text[: quote_match.start()].strip().rstrip(".")
        title = quote_match.group(1).strip().rstrip(".")
        remainder = text[quote_match.end() :].strip().lstrip(".").strip()
    else:
        parts = text.split(".", 1)
        authors = parts[0].strip()
        title = ""
        remainder = parts[1].strip() if len(parts) > 1 else ""

    venue = remainder.rstrip(".")
    volume_issue_pages = ""

    vip_match = re.match(r"^(.*?),\s*(\d.*)$", venue)
    if vip_match:
        venue = vip_match.group(1).strip().rstrip(".")
        volume_issue_pages = vip_match.group(2).strip().rstrip(".")

    record = {
        "authors": authors,
        "title": title,
        "venue": venue,
    }
    if volume_issue_pages:
        record["volume_issue_pages"] = volume_issue_pages
    return record


def parse_publications(lines: list[str]) -> list[dict[str, str]]:
    merged = coalesce(lines, lambda line: bool(re.match(r"^(Forthcoming|\d{4})\b", line)))
    records: list[dict[str, str]] = []

    for item in merged:
        status = "Published"
        year = ""
        body = item

        if item.startswith("Forthcoming"):
            status = "Forthcoming"
            year = "Forthcoming"
            body = item[len("Forthcoming") :].strip()
        else:
            year_match = re.match(r"^(\d{4})\s+(.+)$", item)
            if year_match:
                year = year_match.group(1)
                body = year_match.group(2)

        doi, body_without_doi = extract_doi(body)
        core = parse_publication_core(body_without_doi)

        record: dict[str, str] = {
            "year": year,
            "status": status,
            "authors": core.get("authors", ""),
            "title": core.get("title", ""),
            "venue": core.get("venue", ""),
        }
        if doi:
            record["doi"] = doi
        if core.get("volume_issue_pages"):
            record["volume_issue_pages"] = core["volume_issue_pages"]

        records.append(record)

    return records


def map_work_status(raw: str) -> tuple[str, bool, str | None]:
    lower = raw.lower().strip()
    manuscript_available = "manuscript available" in lower

    rr_match = RR_STATUS_RE.search(raw.strip())
    if rr_match:
        venue = normalize_line(rr_match.group("venue") or "").rstrip(".") or None
        return "Revise & Resubmit", manuscript_available, venue
    if "under review" in lower:
        return "Under Review", manuscript_available, None
    if "in progress" in lower:
        return "In Progress", manuscript_available, None
    if "conditionally accepted" in lower:
        return "Conditionally Accepted", manuscript_available, None
    if "working paper" in lower or manuscript_available:
        return "Working Paper", manuscript_available, None
    return "Working Paper", manuscript_available, None


def parse_work_in_progress(lines: list[str]) -> list[dict[str, object]]:
    items: list[str] = []
    buffer: list[str] = []

    for line in lines:
        buffer.append(line)
        if re.search(r"\[[^\]]+\]\.?$", line):
            items.append(normalize_line(" ".join(buffer)))
            buffer = []

    if buffer:
        items.append(normalize_line(" ".join(buffer)))

    records: list[dict[str, object]] = []
    for item in items:
        status_text = ""
        status_match = re.search(r"\[([^\]]+)\]\.?$", item)
        if status_match:
            status_text = status_match.group(1).strip()
            item = item[: status_match.start()].strip().rstrip(".")

        core = parse_publication_core(item)
        status, manuscript_available, status_venue = map_work_status(status_text)

        record: dict[str, object] = {
            "status": status,
            "authors": core.get("authors", ""),
            "title": core.get("title", ""),
        }
        if status_venue:
            record["venue"] = status_venue
        elif core.get("venue"):
            record["venue"] = core["venue"]
        if manuscript_available:
            record["manuscript_available"] = True

        records.append(record)

    return records


def parse_teaching(lines: list[str]) -> dict[str, object]:
    institutions: list[dict[str, object]] = []
    workshop_lines: list[str] = []
    current_institution: dict[str, object] | None = None
    in_workshops = False

    for line in lines:
        lower = line.lower()
        if lower.startswith("at the "):
            current_institution = {
                "institution": line[7:].strip(),
                "courses": [],
            }
            institutions.append(current_institution)
            in_workshops = False
            continue

        if lower.startswith("workshops"):
            in_workshops = True
            current_institution = None
            continue

        is_course_line = False
        if line.startswith("•"):
            is_course_line = True
        elif (
            current_institution is not None
            and not in_workshops
            and not YEAR_LINE_RE.match(line)
            and not lower.startswith("at the ")
            and not lower.startswith("workshops")
        ):
            # Word bullet formatting is not always preserved in extracted text.
            is_course_line = True

        if is_course_line:
            if current_institution is None:
                continue
            raw_course = line.lstrip("•").strip()
            title = raw_course
            offering = ""
            match = re.match(r"^(.*?)\s*\((.+)\)$", raw_course)
            if match:
                title = match.group(1).strip()
                offering = match.group(2).strip()

            course = {
                "title": title,
            }
            if offering:
                course["offering"] = offering
            current_institution["courses"].append(course)  # type: ignore[index]
            continue

        if in_workshops:
            workshop_lines.append(line)

    workshops = parse_year_entries(workshop_lines)
    return {
        "institutions": institutions,
        "workshops": workshops,
    }


def parse_grouped_service(lines: list[str]) -> list[dict[str, object]]:
    groups: list[dict[str, object]] = []
    current_heading = "General"
    current_lines: list[str] = []

    def flush() -> None:
        nonlocal current_lines
        entries = parse_year_entries(current_lines)
        if entries:
            groups.append({"group": current_heading, "items": entries})
        current_lines = []

    for line in lines:
        if YEAR_LINE_RE.match(line):
            current_lines.append(line)
            continue

        if current_lines:
            flush()

        current_heading = line.rstrip(":").strip()

    if current_lines:
        flush()

    return groups


def build_payload(input_path: Path) -> dict[str, object]:
    lines = extract_docx_lines(input_path)
    sections = split_sections(lines)

    payload: dict[str, object] = {
        "meta": {
            "source": str(input_path.name),
            "generated_at": dt.datetime.now(dt.timezone.utc).isoformat(),
        },
        "contact": parse_contact(sections.get("header", [])),
        "employment": parse_employment(sections.get("employment", [])),
        "education": parse_education(sections.get("education", [])),
        "research_areas": parse_research_areas(sections.get("research_areas", [])),
        "publications": {
            "published": parse_publications(sections.get("publications", [])),
            "work_in_progress": parse_work_in_progress(sections.get("work_in_progress", [])),
        },
        "invited_talks": parse_year_entries(sections.get("invited_talks", [])),
        "selected_conference_presentations": parse_year_entries(
            sections.get("selected_conference_presentations", [])
        ),
        "honors_and_grants": parse_year_entries(sections.get("honors_and_grants", [])),
        "teaching": parse_teaching(sections.get("teaching", [])),
        "review_and_editorial_service": parse_year_entries(
            sections.get("review_and_editorial_service", [])
        ),
        "other_professional_service": parse_grouped_service(
            sections.get("other_professional_service", [])
        ),
    }
    return payload


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Parse CV .docx into structured JSON")
    parser.add_argument("--input", default="cv.docx", help="Input CV .docx path")
    parser.add_argument(
        "--output",
        default="src/generated/cv-data.json",
        help="Output JSON path",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    requested_input = Path(args.input)
    input_path = requested_input.resolve()
    output_path = Path(args.output).resolve()

    if not input_path.exists():
        fallback_candidates = []
        if requested_input.name == "cv.docx":
            fallback_candidates = [Path("public/cv.docx"), Path("public/CV.docx")]

        for candidate in fallback_candidates:
            candidate_resolved = candidate.resolve()
            if candidate_resolved.exists():
                input_path = candidate_resolved
                break
        else:
            raise FileNotFoundError(f"CV file not found: {input_path}")

    payload = build_payload(input_path)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
