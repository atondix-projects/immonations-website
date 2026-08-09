"""Übergabe-Polaroids aufbereiten.

Nach jeder Schlüsselübergabe entsteht ein Sofortbild mit handschriftlichem
Ortsnamen. Die Rohdateien sind Handyfotos *von* diesen Polaroids: das Bild liegt
schräg auf dem Tisch, mit unterschiedlich viel Rand.

Dieses Skript schneidet jedes Polaroid frei, richtet es gerade und exportiert es
in einheitlichem Format nach ``public/images/handover/``. Die Herkunftsdateien in
``Assets/`` sind nicht Teil des Repos — das Ergebnis wird eingecheckt, der Lauf
ist reproduzierbar.

    python scripts/curate-handover-polaroids.py [--check]

``--check`` schreibt zusätzlich eine beschriftete Kontaktkopie nach
``tmp/handover-contact-sheet.jpg``, um die Zuschnitte zu prüfen.
"""

from __future__ import annotations

import argparse
import sys
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
SOURCE_DIR = ROOT / "Assets" / "Übergabebilder Polaroidkamera"
OUTPUT_DIR = ROOT / "public" / "images" / "handover"
CONTACT_SHEET = ROOT / "tmp" / "handover-contact-sheet.jpg"

# Zielmaß. Das Sofortbildformat ist annähernd quadratisch mit breitem Fuß für
# die Beschriftung — 0,84 entspricht dem gemessenen Median der Rohbilder.
TARGET_WIDTH = 840
TARGET_HEIGHT = 1000

# Analysebreite: die Maske braucht keine volle Auflösung und wird so deutlich
# schneller und rauschärmer.
ANALYSIS_WIDTH = 520


@dataclass(frozen=True)
class Polaroid:
    """Ein Rohbild und wie es zugeschnitten wird."""

    source: str
    slug: str
    town: str
    #: Feinkorrektur in Prozent der erkannten Box (links, oben, rechts, unten).
    #: Positive Werte schneiden weiter nach innen.
    inset: tuple[float, float, float, float] = (0.0, 0.0, 0.0, 0.0)
    #: Zusätzliche Drehung in Grad, falls die Kantenerkennung danebenliegt.
    rotate: float = 0.0


# Ein Polaroid je Übergabe, in der Reihenfolge, in der sie auf der Website
# erscheinen. IMG_4940 (Nürnberg) ist bewusst nicht dabei: das Sofortbild ist so
# stark unterbelichtet, dass nur Silhouetten bleiben.
POLAROIDS: tuple[Polaroid, ...] = (
    # Liegt am weitesten links im Rohbild — ohne Korrektur bleibt ein
    # Tischstreifen an der linken Kante stehen.
    Polaroid("IMG_4938.JPG", "adelsdorf-1", "Adelsdorf", inset=(2.2, 0.0, 0.0, 1.4)),
    Polaroid("IMG_4946.JPG", "heroldsbach", "Heroldsbach"),
    Polaroid("IMG_4943.JPG", "seukendorf", "Seukendorf"),
    Polaroid("IMG_4947.JPG", "nuernberg", "Nürnberg"),
    Polaroid("IMG_4944.JPG", "schwabach", "Schwabach"),
    Polaroid("IMG_4942.JPG", "erlangen", "Erlangen"),
    Polaroid("IMG_4945.JPG", "zirndorf", "Zirndorf"),
    Polaroid("IMG_4939.JPG", "adelsdorf-2", "Adelsdorf"),
)


def _warmth(rgb: np.ndarray) -> tuple[np.ndarray, float]:
    """Farbtemperatur-Karte R−B plus das Tischniveau aus den vier Bildecken.

    Der Schreibtisch ist ein warmes Beige (R−B ≈ 10…26), der Sofortbildrahmen
    neutral bis kühl (R−B ≈ 8). Diese Differenz trennt beide zuverlässiger als
    Helligkeit, weil Rahmen und Tisch nahezu gleich hell sind.
    """
    warmth = ndimage.gaussian_filter(rgb[:, :, 0] - rgb[:, :, 2], sigma=2.0)
    h, w = warmth.shape
    patch = max(4, min(h, w) // 22)
    corners = np.concatenate(
        [
            warmth[:patch, :patch].ravel(),
            warmth[:patch, -patch:].ravel(),
            warmth[-patch:, :patch].ravel(),
            warmth[-patch:, -patch:].ravel(),
        ]
    )
    return warmth, float(np.median(corners))


def _foreground_mask(warmth: np.ndarray, threshold: float) -> np.ndarray:
    """Maske des Polaroids: alles, was nicht vom Bildrand her Tisch ist.

    Der Tisch wird vom Rand aus geflutet. Warme Stellen *innerhalb* des
    Sofortbilds — eine Holztür, eine Wiese — bleiben dadurch Vordergrund,
    obwohl sie farblich wie Tisch aussehen: der kühle Rahmen schließt sie ein.
    """
    background = warmth > threshold
    seed = np.zeros_like(background)
    seed[0, :] = seed[-1, :] = True
    seed[:, 0] = seed[:, -1] = True
    outside = ndimage.binary_propagation(seed & background, mask=background)

    foreground = ndimage.binary_fill_holes(~outside)
    foreground = ndimage.binary_opening(foreground, np.ones((5, 5)))

    labels, count = ndimage.label(foreground)
    if count == 0:
        return foreground
    sizes = ndimage.sum(foreground, labels, range(1, count + 1))
    return labels == (int(np.argmax(sizes)) + 1)


def _detect(rgb: np.ndarray) -> np.ndarray:
    """Polaroid-Maske mit selbstkalibrierter Schwelle.

    Eine feste Schwelle scheitert, weil das Tischniveau je nach Aufnahme um gut
    15 Einheiten schwankt: zu hoch, und die Flutung bricht durch den Rahmen ins
    Motiv; zu tief, und der Tisch zählt als Sofortbild. Statt zu raten, wird die
    Schwelle durchgestimmt und die Maske genommen, deren Seitenverhältnis dem
    bekannten Sofortbildformat am nächsten kommt — ein Prüfmaß, das das Bild
    selbst nicht kennt und das darum nicht mitdriftet.
    """
    warmth, desk = _warmth(rgb)
    total = rgb.shape[0] * rgb.shape[1]

    best: tuple[float, np.ndarray] | None = None
    for offset in np.arange(2.0, 13.5, 0.5):
        mask = _foreground_mask(warmth, desk - offset)
        area = int(mask.sum())
        # Unter einem Fünftel der Fläche ist der Rahmen durchbrochen, über 96 %
        # wurde der Tisch mitgenommen.
        if not 0.20 * total < area < 0.96 * total:
            continue
        rows = np.where(mask.any(axis=1))[0]
        cols = np.where(mask.any(axis=0))[0]
        height = rows[-1] - rows[0] + 1
        if height == 0:
            continue
        aspect = (cols[-1] - cols[0] + 1) / height
        score = abs(aspect - TARGET_WIDTH / TARGET_HEIGHT)
        if best is None or score < best[0]:
            best = (score, mask)

    if best is None:
        raise RuntimeError("Kein Sofortbild erkannt — Schwellenbereich prüfen")
    return best[1]


#: Handyfotos vom Schreibtisch liegen nie stärker schief. Alles darüber ist ein
#: gescheiterter Fit, keine echte Neigung.
MAX_TILT_DEGREES = 4.0


def _fit_slope(positions: np.ndarray, edge: np.ndarray) -> float | None:
    """Steigung einer Polaroidkante über das mittlere Drittel.

    Nur die Mitte einer Kante ist verlässlich: an den Ecken rundet das
    Sofortbild ab, und wo es über den Bildrand hinausragt, klebt die erkannte
    Kante am Rahmen des Handyfotos.
    """
    count = len(positions)
    lo, hi = int(count * 0.34), int(count * 0.66)
    x = positions[lo:hi].astype(float)
    y = edge[lo:hi].astype(float)
    if len(x) < 20:
        return None
    # Ausreißer (Glanzkanten, Schattenränder) über die Streuung kappen.
    keep = np.abs(y - np.median(y)) < 3 * (np.std(y) + 1e-6)
    if keep.sum() < 20:
        return None
    return float(np.polyfit(x[keep], y[keep], 1)[0])


def _edge_angle(mask: np.ndarray) -> float:
    """Neigung des Sofortbilds in Grad.

    Alle vier Kanten werden einzeln vermessen und der Median genommen. Ein
    Mittel aus nur zwei Kanten kippt, sobald eine davon danebengeht — bei einem
    der Bilder liefert die Unterkante −14°, weil das Sofortbild dort aus dem
    Handyfoto herausragt. Der Median über vier Schätzungen steckt das weg.
    """
    h, w = mask.shape
    columns = np.arange(w)[mask.any(axis=0)]
    rows = np.arange(h)[mask.any(axis=1)]
    if len(columns) < 20 or len(rows) < 20:
        return 0.0

    horizontal = (
        np.argmax(mask, axis=0)[mask.any(axis=0)],
        (h - 1 - np.argmax(mask[::-1], axis=0))[mask.any(axis=0)],
    )
    vertical = (
        np.argmax(mask, axis=1)[mask.any(axis=1)],
        (w - 1 - np.argmax(mask[:, ::-1], axis=1))[mask.any(axis=1)],
    )

    angles = [
        np.degrees(np.arctan(slope))
        for edge in horizontal
        if (slope := _fit_slope(columns, edge)) is not None
    ]
    # Senkrechte Kanten werden in (Zeile → Spalte) gefittet; dieselbe Drehung
    # zeigt sich dort mit umgekehrtem Vorzeichen.
    angles += [
        -np.degrees(np.arctan(slope))
        for edge in vertical
        if (slope := _fit_slope(rows, edge)) is not None
    ]

    if not angles:
        return 0.0
    return float(np.clip(np.median(angles), -MAX_TILT_DEGREES, MAX_TILT_DEGREES))


def _crop_box(mask: np.ndarray) -> tuple[int, int, int, int]:
    rows = np.where(mask.any(axis=1))[0]
    cols = np.where(mask.any(axis=0))[0]
    return int(cols[0]), int(rows[0]), int(cols[-1]) + 1, int(rows[-1]) + 1


def curate(item: Polaroid) -> tuple[Image.Image, str]:
    source = SOURCE_DIR / item.source
    original = Image.open(source).convert("RGB")

    scale = ANALYSIS_WIDTH / original.width
    small = original.resize(
        (ANALYSIS_WIDTH, max(1, round(original.height * scale))), Image.BILINEAR
    )
    mask = _detect(np.asarray(small, dtype=np.float32))
    angle = _edge_angle(mask) + item.rotate

    # Bild und Maske um denselben Winkel drehen. Die Maske mitzudrehen ist
    # zwingend: der aufgefüllte Rand des gedrehten Bildes ist keine Tischfläche,
    # eine erneute Erkennung darauf würde am Eckabgleich scheitern.
    straight = original.rotate(angle, resample=Image.BICUBIC, expand=True, fillcolor=(255, 255, 255))
    rotated_mask = np.asarray(
        Image.fromarray((mask * 255).astype(np.uint8)).rotate(
            angle, resample=Image.NEAREST, expand=True, fillcolor=0
        )
    )
    left, top, right, bottom = _crop_box(rotated_mask > 127)

    factor = straight.width / rotated_mask.shape[1]
    box_w = (right - left) * factor
    box_h = (bottom - top) * factor
    px = (
        left * factor + box_w * item.inset[0] / 100,
        top * factor + box_h * item.inset[1] / 100,
        right * factor - box_w * item.inset[2] / 100,
        bottom * factor - box_h * item.inset[3] / 100,
    )
    cropped = straight.crop(tuple(round(v) for v in px))

    note = f"{item.source} → {item.slug}  {cropped.width}×{cropped.height}px  {angle:+.2f}°"
    return _fit_to_target(cropped), note


def _fit_to_target(image: Image.Image) -> Image.Image:
    """Auf einheitliches Format bringen, ohne das Sofortbild zu verzerren.

    Die Rohbilder sind aus leicht unterschiedlichen Winkeln fotografiert, das
    freigestellte Seitenverhältnis schwankt daher um wenige Prozent. Skalieren
    auf Deckung und mittiger Beschnitt bleibt maßhaltig; gestreckte Gesichter
    und schiefe Handschrift fallen sofort auf.
    """
    scale = max(TARGET_WIDTH / image.width, TARGET_HEIGHT / image.height)
    scaled = image.resize(
        (max(TARGET_WIDTH, round(image.width * scale)), max(TARGET_HEIGHT, round(image.height * scale))),
        Image.LANCZOS,
    )
    left = (scaled.width - TARGET_WIDTH) // 2
    top = (scaled.height - TARGET_HEIGHT) // 2
    return scaled.crop((left, top, left + TARGET_WIDTH, top + TARGET_HEIGHT))


def write_contact_sheet(images: list[tuple[str, Image.Image]]) -> None:
    columns, tile = 4, 320
    label = 26
    rows = (len(images) + columns - 1) // columns
    sheet = Image.new(
        "RGB",
        (columns * tile, rows * (round(tile * TARGET_HEIGHT / TARGET_WIDTH) + label)),
        (18, 18, 18),
    )
    draw = ImageDraw.Draw(sheet)
    height = round(tile * TARGET_HEIGHT / TARGET_WIDTH)
    for index, (name, image) in enumerate(images):
        x = (index % columns) * tile
        y = (index // columns) * (height + label)
        draw.text((x + 6, y + 8), name, fill=(255, 214, 64))
        sheet.paste(image.resize((tile, height), Image.LANCZOS), (x, y + label))
    CONTACT_SHEET.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(CONTACT_SHEET, quality=88)
    print(f"Kontaktkopie: {CONTACT_SHEET}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="Kontaktkopie zur Sichtprüfung")
    args = parser.parse_args()

    # Windows-Konsolen laufen per Default auf cp1252 und würden an Umlauten und
    # Pfeilen in den Statuszeilen scheitern.
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")

    if not SOURCE_DIR.is_dir():
        print(f"Quellordner fehlt: {SOURCE_DIR}", file=sys.stderr)
        return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    rendered: list[tuple[str, Image.Image]] = []

    for item in POLAROIDS:
        image, note = curate(item)
        target = OUTPUT_DIR / f"{item.slug}.webp"
        image.save(target, "WEBP", quality=82, method=6)
        print(f"{note}  →  {target.relative_to(ROOT)}  {target.stat().st_size // 1024} KB")
        rendered.append((item.slug, image))

    if args.check:
        write_contact_sheet(rendered)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
