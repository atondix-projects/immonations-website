"""Curate the EK ZIP into stable repository paths and write a provenance manifest."""

from __future__ import annotations

import argparse
import csv
import hashlib
import re
import shutil
import zipfile
from collections import defaultdict
from pathlib import Path, PurePosixPath


TRANSLATION = str.maketrans(
    {
        "ä": "ae",
        "ö": "oe",
        "ü": "ue",
        "Ä": "ae",
        "Ö": "oe",
        "Ü": "ue",
        "ß": "ss",
    }
)


def slugify(value: str) -> str:
    value = value.translate(TRANSLATION).lower()
    return re.sub(r"[^a-z0-9]+", "-", value).strip("-") or "asset"


def normalized_extension(path: PurePosixPath) -> str:
    extension = path.suffix.lower()
    return ".jpg" if extension == ".jpeg" else extension


def leaf(parts: tuple[str, ...], index: int, fallback: str) -> str:
    return slugify(parts[index]) if len(parts) > index else fallback


def classify(
    path: PurePosixPath,
    reference_counters: dict[str, int],
    handover_counter: list[int],
) -> tuple[str, str, str]:
    parts = path.parts[1:]
    top = parts[0] if parts else ""
    extension = normalized_extension(path)
    stem = slugify(path.stem)

    if path.name in {".DS_Store", "Thumbs.db"}:
        return "excluded", "", "Operating-system metadata; not reusable."

    if extension == ".docx":
        folder = slugify(top)
        parent = slugify(parts[-2]) if len(parts) > 1 else "general"
        name = slugify("-".join((*parts[:-1], path.stem))) + extension
        return "retained-source-only", f"docs/source-material/originals/content/{folder}/{parent}/{name}", "Editable source retained for provenance; not public."

    if top == "Kostenlose Dokumente " and extension == ".pdf":
        label = "house-handover-protocol" if "Hausübergabe" in path.name else "apartment-handover-protocol"
        return "curated", f"assets/media-library/downloads/handover-templates/{label}.pdf", "Public download candidate; review branding and legal wording before launch."

    if top == "Patent Immonation" and extension == ".pdf":
        return "retained-source-only", "docs/source-material/originals/legal/euipo-immonation-trademark-certificate.pdf", "Legal evidence; intentionally not public."

    if top == "Logos Immonation":
        logo_names = {
            "01bb9a16-f561-444e-9fa6-e3cddac28c0f": "immonation-logo-photo",
            "Immonation - Stempel Vorlage SW": "immonation-stamp-black-white",
            "logo4": "immonation-logo-variant-04",
            "33 - Immonation Facelift Logo-Grey": "immonation-logo-grey",
            "33 - Immonation Facelift Logo": "immonation-logo-facelift",
            "LOGO Vektor": "immonation-logo-vector",
        }
        if "Einzelnes I" in parts:
            background = "transparent" if any("transparenter" in part for part in parts) else "solid"
            name = f"immonation-mark-{background}-{stem}"
        else:
            name = logo_names.get(path.stem, f"immonation-{stem}")
        return "curated", f"assets/media-library/brand/immonation/{name}{extension}", "Brand asset."

    if top == "Unternehmensgruppe Immonation":
        company = leaf(parts, 1, "group")
        name = f"{company}-logo-{stem}"
        return "curated", f"assets/media-library/brand/group/{company}/{name}{extension}", "Group-company brand asset."

    if top == "Auszeichnungen":
        provider = "immowelt" if "Immowelt" in parts else "faz-top-makler-2026"
        if path.stem == "FAZ Ausgabe TOP Makler 2026 Immonaiton":
            name = "award-letter-2026"
            note = "Dated award letter naming Immonation; seal/logo use requires a valid license."
        elif path.stem.strip() == "TOP Makler 2026 Immonation":
            name = "generic-award-kit-mockup"
            note = "Generic mockup containing placeholder names; not proof of an Immonation certificate."
        else:
            name = stem
            note = "Award evidence; verify usage/licensing and current claims before publication."
        return "curated", f"assets/media-library/trust/awards/{provider}/{name}{extension}", note

    if top == "Referenz Objekte":
        city = leaf(parts, 1, "unknown-location")
        property_name = leaf(parts, 2, "general")
        key = f"{city}/{property_name}"
        reference_counters[key] += 1
        index = reference_counters[key]
        return "curated", f"assets/media-library/references/{key}/property-photo-{index:02d}{extension}", "Reference-property image; publication requires case-specific approval."

    if top == "Testimonial Kunden - mit Bild ":
        person = leaf(parts, 1, "customer")
        label = "illustrative-portrait" if person == "frau-hartmann" and path.stem == "Frau Hartmann" else "property-photo"
        note = "Illustrative/synthetic-looking portrait; do not present as the actual customer without proof." if label == "illustrative-portrait" else "Customer proof asset; publication requires testimonial/image approval."
        return "curated", f"assets/media-library/trust/testimonials/{person}/{label}{extension}", note

    if top == "Verkäufer Feedback Videos":
        person = leaf(parts, 1, "customer")
        label = "interview" if extension == ".mp4" else "thumbnail"
        return "curated", f"assets/media-library/trust/testimonials/{person}/{label}{extension}", "Seller testimonial media; publication requires consent."

    if top == "Übergabebilder Polaroidkamera":
        handover_counter[0] += 1
        return "curated", f"assets/media-library/trust/handovers/handover-photo-{handover_counter[0]:02d}{extension}", "Handover/social-proof image; check visible personal data and consent."

    if top == "Verkauft Videos inkl. Ortschaften ":
        name = slugify(path.stem.replace("VERKAUFT", "sold", 1))
        return "curated", f"assets/media-library/marketing/sold-clips/{name}{extension}", "Sold-property motion asset."

    if top == "KI Visualisierungen":
        media_type = leaf(parts, 1, "general")
        project = leaf(parts, 2, "project")
        label = "visualization-video" if extension == ".mp4" else "visualization-image"
        return "curated", f"assets/media-library/marketing/visualizations/{media_type}/{project}/{label}{extension}", "AI visualization; label transparently when published."

    if top == "Sponsoring TSV Zirndorf Bundesathleten ":
        return "curated", f"assets/media-library/community/tsv-zirndorf/{stem}{extension}", "Community sponsorship asset; verify athlete image usage."

    if top == "Spende Schulbildung Uganda":
        return "curated", f"assets/media-library/community/uganda-school-support/{stem}{extension}", "Community support image; check consent, especially for minors."

    if top == "Inhouse Ingenieur":
        return "curated", f"assets/media-library/services/inhouse-engineering/{stem}{extension}", "Service proof asset."

    return "retained-source-only", f"docs/source-material/originals/other/{slugify('-'.join(parts))}{extension}", "Unclassified source retained for provenance."


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("archive", type=Path)
    parser.add_argument("repo", type=Path)
    args = parser.parse_args()

    manifest_path = args.repo / "docs/source-material/asset-manifest.csv"
    manifest_path.parent.mkdir(parents=True, exist_ok=True)
    reference_counters: dict[str, int] = defaultdict(int)
    handover_counter = [0]
    hashes: dict[str, str] = {}
    rows: list[dict[str, str | int]] = []

    with zipfile.ZipFile(args.archive) as archive:
        entries = sorted((entry for entry in archive.infolist() if not entry.is_dir()), key=lambda item: item.filename)
        for entry in entries:
            source_path = PurePosixPath(entry.filename)
            status, destination, notes = classify(source_path, reference_counters, handover_counter)
            digest = ""

            if status != "excluded":
                hasher = hashlib.sha256()
                destination_path = args.repo / destination
                destination_path.parent.mkdir(parents=True, exist_ok=True)
                temporary_path = destination_path.with_suffix(destination_path.suffix + ".partial")

                with archive.open(entry) as source, temporary_path.open("wb") as target:
                    while chunk := source.read(1024 * 1024):
                        hasher.update(chunk)
                        target.write(chunk)

                digest = hasher.hexdigest()
                if digest in hashes:
                    temporary_path.unlink()
                    status = "duplicate"
                    destination = hashes[digest]
                    notes = f"Byte-identical duplicate of {destination}."
                else:
                    shutil.move(temporary_path, destination_path)
                    hashes[digest] = destination

            rows.append(
                {
                    "original_path": entry.filename,
                    "source_bytes": entry.file_size,
                    "sha256": digest,
                    "kind": normalized_extension(source_path).lstrip(".") or "other",
                    "status": status,
                    "destination": destination,
                    "notes": notes,
                }
            )

    with manifest_path.open("w", encoding="utf-8-sig", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)

    print(f"Curated {len(rows)} archive files; manifest: {manifest_path}")


if __name__ == "__main__":
    main()
