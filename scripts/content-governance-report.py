"""Report the content-governance gaps that only a human can close.

This is a *report*, not a gate. It never exits non-zero for an unverified claim —
the contract tests in `tests/contracts/provenance.test.ts` assert that governance
fields are *present*, and this script says what those fields currently admit.

Checks performed:

1. Claims in `src/lib/content/provenance.ts` with no owner or no established source.
2. Videos that carry sound but ship without a WebVTT caption track.
3. Blog articles without a per-person byline.
4. Asset-manifest reconciliation: which curated destinations are absent from this
   checkout. `assets/` is gitignored, so a fresh clone has the manifest but not the
   files. For full hash verification on a machine that does have them, use
   `scripts/verify-ek-source-assets.py`.
5. Situational seller topics versus the article library, to show where distinct
   pages would beat overlapping thin content.

Usage:  python scripts/content-governance-report.py
"""

from __future__ import annotations

import csv
import re
import subprocess
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent


def heading(title: str) -> None:
    print(f"\n{title}\n{'-' * len(title)}")


def bullet(text: str) -> None:
    print(f"  - {text}")


def report_claims() -> int:
    """Claims whose provenance record still needs a human decision."""
    heading("1. Claims needing an owner or a source")

    source = (REPO / "src/lib/content/provenance.ts").read_text(encoding="utf-8")
    registry = source.split("export const CLAIM_REGISTRY", 1)[-1]

    # Entries are flat object literals keyed by claim id; a regex is adequate for a
    # report and avoids adding a TypeScript runtime to a repo that has none.
    entries = re.findall(r"'([\w:-]+)':\s*\{(.*?)\n  \},", registry, re.DOTALL)

    findings = 0
    for claim_id, body in entries:
        problems = []
        if "owner: 'unassigned'" in body:
            problems.append("no owner")
        if "state: 'unverified'" in body:
            problems.append("no established source")
        if not problems:
            continue
        findings += 1
        note = re.search(r"note:\s*\n?\s*'(.*?)'(?:\s*\+|,)", body, re.DOTALL)
        bullet(f"{claim_id} — {', '.join(problems)}")
        if note:
            print(f"      {' '.join(note.group(1).split())}")

    if not findings:
        bullet("none — every claim has an owner and a source")
    return findings


def has_audio_stream(video: Path) -> bool | None:
    """True/False when ffprobe can inspect the file, None when it cannot.

    Guessing which clips are silent from their folder name would be wrong in both
    directions, so ask the file itself. A missing ffprobe degrades to 'unknown'
    rather than to a false claim.
    """
    try:
        result = subprocess.run(
            [
                "ffprobe", "-v", "error",
                "-select_streams", "a",
                "-show_entries", "stream=codec_type",
                "-of", "csv=p=0",
                str(video),
            ],
            capture_output=True,
            text=True,
            timeout=30,
        )
    except (OSError, subprocess.SubprocessError):
        return None
    if result.returncode != 0:
        return None
    return "audio" in result.stdout


def report_captions() -> int:
    """Videos with sound that have no caption track."""
    heading("2. Videos with sound and no captions (WCAG 1.2.2)")

    public = REPO / "public"
    findings = 0
    silent = 0
    unknown = []

    for video in sorted(public.rglob("*.mp4")):
        rel = video.relative_to(public).as_posix()
        if list(video.parent.glob(f"{video.stem}*.vtt")):
            continue

        audio = has_audio_stream(video)
        if audio is False:
            silent += 1
            continue
        if audio is None:
            unknown.append(rel)
            continue

        findings += 1
        bullet(f"{rel} — has an audio track, no .vtt alongside")

    if silent:
        bullet(f"({silent} silent clips skipped — no captions required)")
    for rel in unknown:
        bullet(f"{rel} — could not inspect audio (ffprobe unavailable)")

    if not findings:
        bullet("none — every spoken video has a caption track")
    else:
        print(
            "\n      VideoDialog renders <track> as soon as a registry entry points at a\n"
            "      .vtt file. Supply the transcripts; no code change is needed."
        )
    return findings


def report_article_owners() -> int:
    """Blog articles without a real per-person byline."""
    heading("3. Articles without a per-person byline")

    findings = 0
    for article in sorted((REPO / "content/blog").rglob("*.mdx")):
        text = article.read_text(encoding="utf-8")
        author = re.search(r"^author:\s*(.+)$", text, re.MULTILINE)
        value = author.group(1).strip().strip("'\"") if author else None
        if value and value not in ("Immonation Redaktion", "Immonation Editorial"):
            continue
        findings += 1
        rel = article.relative_to(REPO).as_posix()
        bullet(f"{rel} — author: {value or 'missing'}")

    if not findings:
        bullet("none — every article names a person")
    return findings


def report_asset_manifest() -> int:
    """Curated assets the manifest promises that this checkout does not have."""
    heading("4. Asset-manifest destinations missing from this checkout")

    manifest = REPO / "docs/source-material/asset-manifest.csv"
    if not manifest.exists():
        bullet(f"manifest not found at {manifest.relative_to(REPO).as_posix()}")
        return 1

    missing = 0
    total = 0
    with manifest.open(encoding="utf-8", newline="") as handle:
        for row in csv.DictReader(handle):
            destination = (row.get("destination") or "").strip()
            if not destination:
                continue
            total += 1
            if not (REPO / destination).exists():
                missing += 1
                if missing <= 10:
                    bullet(destination)

    if missing > 10:
        bullet(f"... and {missing - 10} more")
    if missing:
        print(
            f"\n      {missing} of {total} curated destinations are absent. `assets/` is\n"
            "      gitignored, so provenance is only reproducible on a machine holding the\n"
            "      original tree. Archiving it somewhere durable is an open decision."
        )
    else:
        bullet(f"none — all {total} curated destinations are present")
    return missing


def report_topic_overlap() -> int:
    """Situational seller routes versus the bilingual article library."""
    heading("5. Situational seller topics versus the article library")

    catalog = (REPO / "src/lib/routing/route-catalog.ts").read_text(encoding="utf-8")
    # SITUATIONS is an array of [de, en] slug pairs; match to the closing bracket
    # that sits at column 0, not to the first inner one.
    block = re.search(r"const SITUATIONS[^=]*=\s*\[(.*?)^\]", catalog, re.DOTALL | re.MULTILINE)
    situations = re.findall(r"\['([a-z0-9-]+)',\s*'([a-z0-9-]+)'\]", block.group(1)) if block else []

    articles = {}
    for article in sorted((REPO / "content/blog").rglob("*.mdx")):
        locale = article.parent.name
        key = re.search(r"^translationKey:\s*(.+)$", article.read_text(encoding="utf-8"), re.MULTILINE)
        if key:
            articles.setdefault(key.group(1).strip().strip("'\""), set()).add(locale)

    bullet(f"{len(situations)} situational topics, {len(articles)} article topics")

    uncovered = [
        pair
        for pair in situations
        if not any(any(slug in topic or topic in slug for slug in pair) for topic in articles)
    ]
    for de_slug, en_slug in uncovered:
        bullet(f"no article supports /{de_slug} (en: /{en_slug})")

    for topic, locales in sorted(articles.items()):
        if locales != {"de", "en"}:
            bullet(f"article '{topic}' exists only in {', '.join(sorted(locales))}")

    return len(uncovered)


def main() -> None:
    print("Immonation content-governance report")
    print("=" * 36)

    totals = {
        "claims": report_claims(),
        "captions": report_captions(),
        "bylines": report_article_owners(),
        "assets": report_asset_manifest(),
        "topics": report_topic_overlap(),
    }

    heading("Summary")
    for name, count in totals.items():
        bullet(f"{name}: {count} open")
    print("\nNone of these block the build. Each needs a human decision.\n")


if __name__ == "__main__":
    main()
