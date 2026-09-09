# Andreas-PDF · P0-Review

Stand: 9. September 2026  
Branch: `codex/immonation-pdf-loop`  
Basis: `main` (`bd0e430`)

## Ergebnis

| PDF-ID | Status | Kurzbefund |
| --- | --- | --- |
| PDF-W-02 | PASS | Öffentliches Markenzertifikat und alle Download-Verweise entfernt. |
| PDF-K-01 | PASS | Kein öffentlicher Partner-Login vorhanden. |
| PDF-T-02 | PASS | Produktionsbasis ist `https://immonationgmbh.de`. |
| PDF-T-01 | PASS | Initiales HTML enthält Endwerte statt Null-Platzhaltern. |
| PDF-T-04 | PASS | Indexierbare DE-/EN-Routen besitzen eindeutige lokalisierte Descriptions. |
| PDF-Ü-01 | PASS | Abschluss-CTA ist hell; nur der globale Footer bleibt dunkel. |
| PDF-W-03 | PASS | FAQ besitzt genau einen globalen Footer. |
| PDF-W-04 | PASS | Lexikon besitzt genau einen globalen Footer. |
| PDF-W-06 | PASS | Bodenrichtwert-Seite besitzt genau einen globalen Footer. |
| PDF-I-02 | PASS | Der vollständige Immonation-Bereich wird vom Footer-Vertrag erfasst. |

P0 gesamt: **10 PASS · 0 FAIL · 0 BLOCKIERT**

## Automatisierte Prüfung

- `pnpm format:check`: PASS
- `pnpm lint`: PASS
- `pnpm typecheck`: PASS
- `pnpm test`: PASS, 108 Tests
- `pnpm build`: PASS, 426 statische Seiten generiert
- `pnpm exec playwright test`: PASS, 31 Tests

Die PDF-spezifischen Tests tragen ihre jeweilige `PDF-*`-ID. Der Route-Katalog prüft sämtliche indexierbaren DE-/EN-Seiten auf Erreichbarkeit, Canonical, Hreflang, Sitemap, genau einen globalen Footer sowie eindeutige lokalisierte Meta-Descriptions.

## Visueller Nachweis

Die großen Dateien bleiben wie vereinbart außerhalb von Git:

- `output/verification/PDF-Ü-01/contact-mobile.png` · 390×844
- `output/verification/PDF-Ü-01/contact-desktop.png` · 1440×900

Beide Ansichten zeigen die helle Abschluss-CTA als eigene Sektion und darunter den einzigen dunklen globalen Footer. Die responsive Darstellung weist keine Überlagerung oder zweite Footer-Komposition auf.

## Review durch Andreas

- [ ] Helle Abschluss-CTA auf Mobil und Desktop gestalterisch freigeben.
- [ ] Entfernen des öffentlichen Markenzertifikat-Downloads bestätigen.
- [ ] Produktionsdomain ohne `www` als verbindliche Canonical-Basis bestätigen.

## Offene Blocker

Keine innerhalb der P0-Welle.
