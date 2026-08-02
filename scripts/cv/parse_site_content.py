"""Parse site-content.docx into structured JSON for the public site.

The document uses ALL-CAPS marker lines to delimit sections:

  HOME HERO               paragraphs for the homepage hero statement
  HOME ABOUT              paragraphs for the homepage About section
  HOME TEACHING           paragraph(s) for the homepage Teaching preview
  RESEARCH INTRO          paragraphs introducing the research page
  TEACHING INTRO          paragraphs introducing the teaching page
  PROGRAM: <title>        starts a research program; paragraphs = overview
  KEY QUESTIONS           following lines are questions, one per line
  PUBLICATIONS            following lines are publication titles; each is
                          matched against cv-data.json at render time so
                          statuses stay in sync with the CV
  TEACHING PHILOSOPHY     paragraphs
  COURSE: <title>         course description; <title> must match the course
                          name used in the CV so offerings merge automatically
  PROJECT: <period>       one teaching/project timeline entry
  AWARD: <period>         one teaching/award timeline entry
  TRAINING: <period>      one teaching/training timeline entry
  ACTIVITIES: <course>    starts an activity group for a course
  ITEM: <name>            one classroom activity; paragraphs = description

Everything else is treated as body text belonging to the most recent marker.
"""

from __future__ import annotations

import argparse
import json
import re
import zipfile
from datetime import datetime, timezone
from pathlib import Path
from xml.etree import ElementTree as ET

W_NS = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def normalize_line(line: str) -> str:
    line = line.replace(" ", " ").replace("\t", " ")
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
                chunks.append(" ")
            elif tag in (f"{W_NS}br", f"{W_NS}cr"):
                chunks.append("\n")
        raw_text = "".join(chunks)
        for raw_line in raw_text.splitlines():
            cleaned = normalize_line(raw_line)
            if cleaned:
                lines.append(cleaned)
    return lines


def marker_of(line: str) -> tuple[str, str] | None:
    """Return (marker, argument) when the line is a section marker."""
    upper = line.upper()
    plain_markers = {
        "HOME HERO": "home_hero",
        "HOME ABOUT": "home_about",
        "HOME TEACHING": "home_teaching",
        "RESEARCH INTRO": "research_intro",
        "TEACHING INTRO": "teaching_intro",
        "KEY QUESTIONS": "key_questions",
        "PUBLICATIONS": "publications",
        "TEACHING PHILOSOPHY": "teaching_philosophy",
    }
    stripped = upper.rstrip(":").strip()
    if stripped in plain_markers:
        return plain_markers[stripped], ""

    for prefix, name in (
        ("PROGRAM:", "program"),
        ("COURSE:", "course"),
        ("PROJECT:", "project"),
        ("AWARD:", "award"),
        ("TRAINING:", "training"),
        ("ACTIVITIES:", "activities"),
        ("ITEM:", "item"),
    ):
        if upper.startswith(prefix):
            return name, line[len(prefix):].strip()
    return None


def parse_lines(lines: list[str], source_name: str = "site-content.docx") -> dict:
    home_hero: list[str] = []
    home_about: list[str] = []
    home_teaching: list[str] = []
    research_intro: list[str] = []
    teaching_intro: list[str] = []
    programs: list[dict] = []
    philosophy: list[str] = []
    courses: list[dict] = []
    activity_groups: list[dict] = []
    timelines: dict[str, list[dict]] = {
        "projects": [],
        "awards": [],
        "training": [],
    }

    mode = None  # where plain lines are routed
    current_program: dict | None = None
    current_course: dict | None = None
    current_group: dict | None = None
    current_item: dict | None = None
    current_timeline: dict | None = None

    for line in lines:
        marked = marker_of(line)
        if marked:
            marker, arg = marked
            if marker == "home_hero":
                mode = "home_hero"
            elif marker == "home_about":
                mode = "home_about"
            elif marker == "home_teaching":
                mode = "home_teaching"
            elif marker == "research_intro":
                mode = "research_intro"
            elif marker == "teaching_intro":
                mode = "teaching_intro"
            elif marker == "program":
                current_program = {
                    "title": arg,
                    "overview": [],
                    "key_questions": [],
                    "publications": [],
                }
                programs.append(current_program)
                mode = "program_overview"
            elif marker == "key_questions":
                mode = "key_questions"
            elif marker == "publications":
                mode = "publications"
            elif marker == "teaching_philosophy":
                mode = "teaching_philosophy"
            elif marker in ("project", "award", "training"):
                timeline_key = {
                    "project": "projects",
                    "award": "awards",
                    "training": "training",
                }[marker]
                current_timeline = {"date": arg, "text": []}
                timelines[timeline_key].append(current_timeline)
                mode = "timeline"
            elif marker == "course":
                current_course = {"title": arg, "description": []}
                courses.append(current_course)
                mode = "course"
            elif marker == "activities":
                current_group = {"course": arg, "items": []}
                activity_groups.append(current_group)
                current_item = None
                mode = "activities"
            elif marker == "item":
                current_item = {"name": arg, "description": []}
                if current_group is not None:
                    current_group["items"].append(current_item)
                mode = "item"
            continue

        if mode == "home_hero":
            home_hero.append(line)
        elif mode == "home_about":
            home_about.append(line)
        elif mode == "home_teaching":
            home_teaching.append(line)
        elif mode == "research_intro":
            research_intro.append(line)
        elif mode == "teaching_intro":
            teaching_intro.append(line)
        elif mode == "program_overview" and current_program is not None:
            current_program["overview"].append(line)
        elif mode == "key_questions" and current_program is not None:
            current_program["key_questions"].append(line.lstrip("-• ").strip())
        elif mode == "publications" and current_program is not None:
            current_program["publications"].append(line.lstrip("-• ").strip())
        elif mode == "teaching_philosophy":
            philosophy.append(line)
        elif mode == "course" and current_course is not None:
            current_course["description"].append(line)
        elif mode == "item" and current_item is not None:
            current_item["description"].append(line)
        elif mode == "timeline" and current_timeline is not None:
            current_timeline["text"].append(line)
        # plain lines in "activities" mode (before first ITEM) are ignored

    return {
        "meta": {
            "source": source_name,
            "generated_at": datetime.now(timezone.utc).isoformat(),
        },
        "home": {
            "hero": home_hero,
            "about": home_about,
            "teaching_snapshot": home_teaching,
        },
        "research": {"intro": research_intro, "programs": programs},
        "teaching": {
            "intro": teaching_intro,
            "philosophy": philosophy,
            "courses": courses,
            "activities": activity_groups,
            "projects": timelines["projects"],
            "awards": timelines["awards"],
            "training": timelines["training"],
        },
    }


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Parse site-content.docx into JSON")
    parser.add_argument("--input", default="site-content.docx", help="Input .docx path")
    parser.add_argument(
        "--output",
        default="src/generated/site-content.json",
        help="Output JSON path",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    input_path = Path(args.input).resolve()
    output_path = Path(args.output).resolve()

    if not input_path.exists():
        # Keep builds working when the doc is absent: emit an empty payload and
        # let the site fall back to its built-in content.
        payload = parse_lines([], input_path.name)
    else:
        payload = parse_lines(extract_docx_lines(input_path), input_path.name)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )


if __name__ == "__main__":
    main()
