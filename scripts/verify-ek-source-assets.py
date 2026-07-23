"""Verify completeness and integrity of the curated EK source archive."""

from __future__ import annotations

import argparse
import csv
import hashlib
from collections import Counter
from pathlib import Path


EXPECTED_FILES = 108
EXPECTED_STATUSES = Counter({"curated": 88, "retained-source-only": 16, "excluded": 4})


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        while chunk := handle.read(1024 * 1024):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("manifest", type=Path)
    parser.add_argument("repo", type=Path)
    args = parser.parse_args()

    repo = args.repo.resolve()
    with args.manifest.open(encoding="utf-8-sig", newline="") as handle:
        rows = list(csv.DictReader(handle))

    errors: list[str] = []
    if len(rows) != EXPECTED_FILES:
        errors.append(f"manifest rows: expected {EXPECTED_FILES}, found {len(rows)}")

    statuses = Counter(row["status"] for row in rows)
    if statuses != EXPECTED_STATUSES:
        errors.append(f"status totals: expected {dict(EXPECTED_STATUSES)}, found {dict(statuses)}")

    original_paths = [row["original_path"] for row in rows]
    if len(original_paths) != len(set(original_paths)):
        errors.append("duplicate original_path values")

    checked = 0
    for row in rows:
        status = row["status"]
        destination = row["destination"]
        if status == "excluded":
            if destination or row["sha256"]:
                errors.append(f"excluded row has destination/hash: {row['original_path']}")
            if not row["notes"].strip():
                errors.append(f"excluded row has no reason: {row['original_path']}")
            continue

        if not destination:
            errors.append(f"missing destination: {row['original_path']}")
            continue

        path = (repo / destination).resolve()
        if repo not in path.parents:
            errors.append(f"destination escapes repo: {destination}")
            continue
        if not path.is_file():
            errors.append(f"missing destination file: {destination}")
            continue
        if path.stat().st_size != int(row["source_bytes"]):
            errors.append(f"size mismatch: {destination}")
            continue
        if sha256(path) != row["sha256"]:
            errors.append(f"hash mismatch: {destination}")
            continue
        checked += 1

    forbidden = [
        path
        for root in (repo / "assets/media-library", repo / "docs/source-material/originals")
        if root.exists()
        for path in root.rglob("*")
        if path.is_file() and path.name in {".DS_Store", "Thumbs.db"}
    ]
    if forbidden:
        errors.extend(f"forbidden system file: {path.relative_to(repo)}" for path in forbidden)

    if errors:
        print("FAILED")
        for error in errors:
            print(f"- {error}")
        raise SystemExit(1)

    print(f"PASS: {len(rows)} manifest rows reconciled")
    print(f"PASS: {checked} retained/curated files matched size and SHA-256")
    print(f"PASS: {statuses['excluded']} excluded files have reasons and no destination")
    print("PASS: no .DS_Store or Thumbs.db files in curated destinations")


if __name__ == "__main__":
    main()
