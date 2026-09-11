# Andreas-PDF · technischer Abschlussreview

Stand: 11. September 2026  
Branch: `codex/immonation-pdf-loop`  
Produktionsdeployment: nicht durchgeführt

## Ergebnis

Alle 32 PDF-Punkte sind einzeln bearbeitet und nach der zuletzt erfolgten onOffice-Implementierung erneut geprüft.

| Status | Anzahl |
| --- | ---: |
| PASS | 18 |
| FREIGEGEBENE ABWEICHUNG | 0 |
| FAIL | 0 |
| BLOCKIERT | 14 |
| Gesamt | 32 |

Der Branch ist technisch releasefähig, aber noch nicht final freigabefähig: Die 14 blockierten Punkte benötigen echte Zielzugänge, fehlende Quelldaten oder Andreas' subjektive Freigabe. Kein fehlender Wert wurde durch einen Platzhalter oder eine Annahme ersetzt.

## Finaler Qualitätslauf

- `pnpm format:check`: PASS
- `pnpm lint`: PASS
- `pnpm typecheck`: PASS
- `pnpm test`: 16 Dateien, 131 Tests, PASS
- `pnpm build`: PASS; 419 statisch erzeugte Seiten, Objektübersicht/-details und Sitemap dynamisch
- `pnpm exec playwright test --workers=1`: 68/68 Tests, PASS
- Viewports der PDF-Prüfungen: Chromium 390×844 und 1440×900
- Negative Produktionsprüfung: kein öffentliches Markenzertifikat im Build, keine beanstandeten September-/Quellen-/Null-Platzhalter in den geprüften HTML-Artefakten

Ein vorheriger Lauf mit zwei Browser-Workern erzeugte sieben identische `page.goto`-Timeouts auf bereits vollständig gerenderten Seiten. Der unveränderte Build bestand anschließend alle 68 Tests seriell; die Fehler waren damit lokale Ressourcenflanken und keine fachlichen Regressionen.

## onOffice als letzte Runde

`OnOfficeProvider` kapselt Objektbestand und Lead-Übertragung. Er verwendet HMAC v2, übernimmt nur veröffentlichte bzw. reservierte Objekte, liest ausschließlich für `Homepage` freigegebene Bilder, ergänzt aktuelle Detail-URLs in der dynamischen Sitemap und mischt keine Demoobjekte bei. Kontakt und Bewertung besitzen getrennte, serverseitig validierte POST-Routen; Erfolg wird erst nach einer bestätigten onOffice-Datensatz-ID angezeigt.

Technisch geprüft sind Feld-/Statusmapping, Signatur, Leer-/Fehlerzustände, Same-Origin, Größenlimit, Honeypot, Rate-Limit, Validierungsfehler und Providerfehler. Für die echte Abnahme fehlen weiterhin Zugangsdaten, ein mandantenspezifisch bestätigtes Statusmapping, eine Objektstichprobe sowie je eine empfangene Kontakt- und Bewertungs-Testanfrage.

## Offene 14 Punkte

| PDF-ID | Benötigter Abschlussnachweis |
| --- | --- |
| PDF-S-01 | Andreas' visuelle Größenfreigabe des Finanzierungsteasers |
| PDF-S-04 | finale Partnerliste, Reihenfolge, Ziel-URLs und Nutzungsrechte |
| PDF-R-02 | drei vollständige Kennzahlensätze und Freigabe des Fürther 8-%-Ergebnisses |
| PDF-R-03 | Google-API-Konfiguration und Live-Nachweis des richtigen Profils |
| PDF-KI-01 | freigegebenes Gewerbe-Bildpaar oder Abweichung plus Prototyp-Abnahme |
| PDF-V-01 | Andreas' inhaltliche Freigabe der Ogulo-Seite |
| PDF-V-02 | aktuelle, freigegebene Suchprofile mit Gültigkeit und Datenschutzfreigabe |
| PDF-W-05 | Andreas' redaktionelle Freigabe der Ratgeber |
| PDF-W-07 | belegte lokale Inhalte für nicht abgedeckte Stadtteile plus Freigabe |
| PDF-W-08 | Andreas' redaktionelle Freigabe der Immobilienpreise-Seite |
| PDF-W-09 | Andreas' visuelle Freigabe des Marktdossiers |
| PDF-K-02 | onOffice-Zugang, Statusmapping und reale Objektstichprobe |
| PDF-I-01 | bestätigte Kontakt-Testanfrage-ID im Zielmandanten |
| PDF-T-03 | bestätigte Kontakt-/Bewertungs-IDs sowie Zuständigkeit und Aufbewahrungsfrist |

## Freigabeschritt

Nach Bereitstellung der fehlenden Daten und Zielzugänge werden nur die 14 Blocker erneut geprüft. Erst bei `FAIL = 0` und `BLOCKIERT = 0`, Andreas' subjektiver Abnahme und nachgewiesenen onOffice-Testleads ist die in der Verification definierte finale Freigabebedingung erfüllt. Nach einem später separat beauftragten Deployment folgt zusätzlich ein Smoke-Test auf `https://immonationgmbh.de`.

Der ursprüngliche schmutzige Worktree auf `codex/hero-logo-house-scroll` wurde nicht verändert.
