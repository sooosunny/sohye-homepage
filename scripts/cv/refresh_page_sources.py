"""Refresh page-scoped generated payloads from local Word source documents.

Word files are intentionally local-only. The generated JSON files are the
public build inputs committed to GitHub Pages.

Supported page sources under ``word/``:

  home.docx, research.docx, teaching.docx
      Use the marker format parsed by parse_site_content.py.
  publications.docx, cv.docx
      Use the CV marker format parsed by parse_docx.py.

For each English source, an optional ``*-ko.docx`` sibling is parsed as the
Korean payload. If it is absent, the Korean payload is empty and the site uses
its built-in Korean fallback until a translation document is supplied.
"""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
import sys

SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))

from parse_docx import build_payload  # noqa: E402
from parse_site_content import extract_docx_lines, parse_lines  # noqa: E402


ROOT = SCRIPT_DIR.parent.parent
WORD_DIR = ROOT / "word"
OUTPUT_DIR = ROOT / "src" / "generated" / "pages"


def parse_site_source(path: Path | None) -> dict:
    if path is None or not path.exists():
        return {}
    return parse_lines(extract_docx_lines(path), path.name)


def parse_cv_source(path: Path | None) -> dict:
    if path is None or not path.exists():
        return {}
    return build_payload(path)


def source_path(page: str, suffix: str = "") -> Path | None:
    candidate = WORD_DIR / f"{page}{suffix}.docx"
    return candidate if candidate.exists() else None


def write_payload(page: str, parser, source: Path | None, korean: Path | None) -> None:
    payload = {
        "meta": {
            "page": page,
            "source": source.name if source else f"word/{page}.docx",
            "generated_at": datetime.now(timezone.utc).isoformat(),
        },
        "en": parser(source),
        "ko": parser(korean),
    }
    output_path = OUTPUT_DIR / f"{page}.json"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    state = "parsed" if source else "fallback"
    print(f"✓ {page}: {state} → {output_path}")


def refresh_pages(pages: list[str]) -> None:
    site_pages = {"home", "research", "teaching"}
    for page in pages:
        parser = parse_site_source if page in site_pages else parse_cv_source
        write_payload(
            page,
            parser,
            source_path(page),
            source_path(page, "-ko"),
        )


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--pages",
        nargs="+",
        default=["home", "research", "publications", "teaching", "cv"],
        choices=["home", "research", "publications", "teaching", "cv"],
        help="Pages to refresh (default: all supported pages)",
    )
    return parser.parse_args()


if __name__ == "__main__":
    refresh_pages(parse_args().pages)
