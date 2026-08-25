"""KI-Visualisierungen für die Website aufbereiten.

Die Rohdateien liegen unter ``assets/media-library/marketing/visualizations/``.
Es sind 1920×1080-Filme, in denen die Kamera stillsteht und die Visualisierung
über der Originalaufnahme aufgebaut wird: ein leerer Raum füllt sich mit
Möbeln, ein unbebautes Grundstück bekommt ein Haus. Genau daraus entstehen die
beiden Dinge, die die Seite ``/ki-visualisierung-home-staging`` braucht.

1. **Vorher/Nachher-Paare.** Aus jedem Abschnitt werden zwei Einzelbilder
   gezogen: der letzte unveränderte Frame (Original) und ein Frame am Ende des
   Aufbaus (Visualisierung). Die Zeitmarken sind pro Paar von Hand geprüft —
   beide Frames zeigen dieselbe Kameraposition. Ohne diese Prüfung entstünden
   Paare aus verschiedenen Räumen, und die Seite verspricht ausdrücklich, die
   Visualisierung *dem Originalfoto* gegenüberzustellen.

2. **Der fehlende Film.** Zwei der vier Quellfilme liegen bereits als 720p in
   ``public/videos/ai-visualizations/``. Dieses Skript ergänzt den dritten im
   gleichen Format. Der vierte (Vogelherdstraße) bleibt bewusst außen vor: er
   zeigt keinen Vorher/Nachher-Aufbau, sondern einen Rundgang.

    python scripts/curate-visualization-assets.py [--check]

``--check`` legt zusätzlich Kontaktkopien der Paare unter
``tmp/visualization-pairs/`` ab, um die Zuordnung nachzuprüfen.
"""

from __future__ import annotations

import argparse
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "assets" / "media-library" / "marketing" / "visualizations"
IMAGE_DIR = ROOT / "public" / "images" / "staging"
VIDEO_DIR = ROOT / "public" / "videos" / "ai-visualizations"
CONTACT_DIR = ROOT / "tmp" / "visualization-pairs"

# Ausgabemaß der Standbilder. Die Quelle ist 1920×1080; 1600×900 hält die
# Dateien unter ~200 kB und reicht für die halbe Spaltenbreite auf 2×-Displays.
IMAGE_WIDTH = 1600
IMAGE_HEIGHT = 900
WEBP_QUALITY = 82

# Zielmaß des Films — identisch zu den beiden bereits eingecheckten Clips.
VIDEO_HEIGHT = 720
VIDEO_CRF = 27

APARTMENT = "eigentumswohnung-visualisierung/etw-panzerstrasse-nuernberg"
HOUSE = "haus-visualisierung/rmh-woernitzstrasse"
PLOT = "grundstueck-visualisuerung/schwabach-wolkersdorf"


@dataclass(frozen=True)
class Pair:
    """Ein geprüftes Vorher/Nachher-Paar aus einem Quellfilm."""

    slug: str
    source: str
    #: Sekunde des Originalzustands.
    before: float
    #: Sekunde der fertigen Visualisierung — vor der Überblendung zum nächsten
    #: Abschnitt, sonst mischen sich zwei Räume ineinander.
    after: float


PAIRS: tuple[Pair, ...] = (
    Pair("plot-schwabach", PLOT, 0.20, 15.70),
    Pair("living-room-nuremberg", HOUSE, 5.10, 7.20),
    Pair("entrance-nuremberg", HOUSE, 0.20, 3.60),
    Pair("bedroom-nuremberg", APARTMENT, 5.10, 8.30),
)


@dataclass(frozen=True)
class Clip:
    """Ein Quellfilm, der als 720p-Fassung plus Poster ausgeliefert wird."""

    slug: str
    source: str


CLIPS: tuple[Clip, ...] = (Clip("house-nuremberg", HOUSE),)


def source_video(relative: str) -> Path:
    path = SOURCE_DIR / relative / "visualization-video.mp4"
    if not path.is_file():
        raise SystemExit(f"Quelldatei fehlt: {path}")
    return path


def run(args: list[str]) -> None:
    result = subprocess.run(args, capture_output=True, text=True)
    if result.returncode != 0:
        raise SystemExit(f"ffmpeg fehlgeschlagen:\n{result.stderr.strip()}")


def extract_frame(video: Path, second: float, target: Path) -> None:
    """Einen Frame ziehen und als WebP in Zielgröße ablegen."""
    raw = target.with_suffix(".png")
    run(
        [
            "ffmpeg", "-v", "error", "-y",
            "-ss", f"{second:.2f}",
            "-i", str(video),
            "-frames:v", "1",
            str(raw),
        ]
    )
    with Image.open(raw) as image:
        resized = image.convert("RGB").resize((IMAGE_WIDTH, IMAGE_HEIGHT), Image.LANCZOS)
        resized.save(target, "WEBP", quality=WEBP_QUALITY, method=6)
    raw.unlink()


def transcode(video: Path, target: Path) -> None:
    """Den Quellfilm auf 720p bringen. Die Clips sind tonlos — kein Audio-Stream."""
    run(
        [
            "ffmpeg", "-v", "error", "-y",
            "-i", str(video),
            "-an",
            "-vf", f"scale=-2:{VIDEO_HEIGHT}",
            "-c:v", "libx264",
            "-preset", "slow",
            "-crf", str(VIDEO_CRF),
            "-pix_fmt", "yuv420p",
            "-movflags", "+faststart",
            str(target),
        ]
    )


def write_contact_sheet(slug: str, before: Path, after: Path) -> None:
    CONTACT_DIR.mkdir(parents=True, exist_ok=True)
    with Image.open(before) as left, Image.open(after) as right:
        sheet = Image.new("RGB", (left.width + right.width, left.height))
        sheet.paste(left, (0, 0))
        sheet.paste(right, (left.width, 0))
        sheet.save(CONTACT_DIR / f"{slug}.jpg", quality=80)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Kontaktkopien schreiben")
    options = parser.parse_args()

    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    VIDEO_DIR.mkdir(parents=True, exist_ok=True)

    for pair in PAIRS:
        video = source_video(pair.source)
        before = IMAGE_DIR / f"{pair.slug}-before.webp"
        after = IMAGE_DIR / f"{pair.slug}-after.webp"
        extract_frame(video, pair.before, before)
        extract_frame(video, pair.after, after)
        print(f"{pair.slug}: {before.stat().st_size // 1024} kB / {after.stat().st_size // 1024} kB")
        if options.check:
            write_contact_sheet(pair.slug, before, after)

    for clip in CLIPS:
        video = source_video(clip.source)
        target = VIDEO_DIR / f"{clip.slug}.mp4"
        transcode(video, target)
        extract_frame(video, 0.20, VIDEO_DIR / f"{clip.slug}-poster.webp")
        print(f"{clip.slug}: {target.stat().st_size // 1024} kB")

    return 0


if __name__ == "__main__":
    sys.exit(main())
