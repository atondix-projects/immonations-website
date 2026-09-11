# Andreas-PDF · P1-Review

Stand: 11. September 2026  
Branch: `codex/immonation-pdf-loop`  
Basis: `main` (`bd0e430`)

## Ergebnis

| PDF-ID | Status | Kurzbefund |
| --- | --- | --- |
| PDF-Ü-02 | PASS | Beanstandete September-Stempel sind auf den Preis- und Marktseiten entfernt. |
| PDF-Ü-03 | PASS | Die deutsche Quellenzeile lautet einheitlich `basierend auf Vermittlungsdaten der Immonation`; Englisch ist sinngleich. |
| PDF-S-01 | BLOCKIERT | Kompakte Finanzierungskachel und vollständige Unterseite sind technisch verifiziert; die visuelle Freigabe durch Andreas fehlt. |
| PDF-S-02 | PASS | Vier freigegebene Feedback-Videos ersetzen die Google-Screenshots. |
| PDF-R-01 | PASS | Referenzen besitzen exakt vier öffentliche Kategorien. |
| PDF-R-02 | BLOCKIERT | Das vollständige Kennzahlenschema ist implementiert; freigegebene Werte fehlen für einen Teil der Referenzen. |
| PDF-R-03 | BLOCKIERT | Google-Places-Provider und ehrlicher Fallback sind implementiert; API-Key und Live-Nachweis fehlen. |
| PDF-KI-01 | BLOCKIERT | Bedienbare Vorher-/Nachher-Vergleiche und Startseiten-Link sind umgesetzt; freigegebenes kommerzielles Bildpaar und Designfreigabe fehlen. |
| PDF-V-01 | BLOCKIERT | Ogulo-Rundgang, Consent, Vollbild und Fehlerzustand sind verifiziert; die inhaltliche Freigabe durch Andreas fehlt. |
| PDF-V-02 | BLOCKIERT | Bestehender Prozess ist geprüft; freigegebene aktive Suchprofile mit Budget, Einwilligung und Ablaufdatum fehlen. |
| PDF-W-01 | PASS | Preisatlas verwendet die freigegebene Quellenzeile ohne September-Stempel und mit genau einem Footer. |
| PDF-W-05 | BLOCKIERT | Vier substanzielle DE-/EN-Ratgeber sind veröffentlicht und technisch geprüft; die redaktionelle Freigabe fehlt. |
| PDF-W-07 | BLOCKIERT | Vorhandene Vermittlungsdaten werden auf Stadtteilseiten ausgespielt; Datensätze für alle veröffentlichten Stadtteile und die redaktionelle Freigabe fehlen. |
| PDF-W-08 | BLOCKIERT | Die Marktseite ist erweitert und nutzt nur die freigegebene Quellenzeile; die redaktionelle Freigabe fehlt. |

P1 gesamt: **5 PASS · 0 FAIL · 9 BLOCKIERT**

## Automatisierte Prüfung

- `pnpm format:check`: PASS
- `pnpm lint`: PASS
- `pnpm typecheck`: PASS
- `pnpm test`: PASS, 118 Tests
- `pnpm build`: PASS, 430 statische Seiten generiert
- `pnpm exec playwright test`: PASS, 52 Tests
- `pnpm run verify:andreas:contracts`: PASS, 18 Tests

Die fokussierten Befehle `pnpm run verify:andreas:contracts`, `pnpm run verify:andreas:e2e` und `pnpm run verify:andreas` sind in `package.json` hinterlegt. Ein erster Buildversuch endete unter Windows mit einem transienten Worker-Pipe-Fehler (`UNKNOWN`, `syscall: write`) auf wechselnden Routen; der unveränderte Wiederholungslauf und die vollständige Browser-Suite waren grün.

## Visueller Nachweis

Die großen Screenshots und Traces bleiben wie vereinbart außerhalb von Git unter:

- `output/verification/PDF-S-01/`
- `output/verification/PDF-S-02/`
- `output/verification/PDF-KI-01/`
- `output/verification/PDF-V-01/`
- `output/verification/PDF-W-05/`
- `output/verification/PDF-W-07/`
- `output/verification/PDF-W-08/`

Die zugehörigen Browserprüfungen verwenden jeweils 390×844 und 1440×900.

## Benötigte Freigaben und Daten

- [ ] Kompakte Finanzierungskachel visuell freigeben (`PDF-S-01`).
- [ ] Vollständige freigegebene Referenzkennzahlen liefern oder eine Abweichung freigeben (`PDF-R-02`).
- [ ] Google-Places-API-Key in der Zielumgebung bereitstellen und Live-Abruf bestätigen (`PDF-R-03`).
- [ ] Freigegebenes kommerzielles Vorher-/Nachher-Paar liefern oder die vorhandenen Beispiele freigeben (`PDF-KI-01`).
- [ ] Virtuelle-Besichtigung-Seite inhaltlich freigeben (`PDF-V-01`).
- [ ] Aktive Suchprofile mit Budget, Einwilligung und Ablaufdatum liefern; alternativ bis zur onOffice-Runde zurückstellen (`PDF-V-02`).
- [ ] Vier neue Ratgeber redaktionell freigeben (`PDF-W-05`).
- [ ] Fehlende Stadtteil-Marktdaten liefern und die Darstellung freigeben (`PDF-W-07`).
- [ ] Immobilienpreise-Seite redaktionell freigeben (`PDF-W-08`).

## Nächster Loop

Die P2-Punkte werden trotz der dokumentierten, voneinander unabhängigen P1-Blocker seriell fortgesetzt. Vor der finalen onOffice-Runde werden alle Blocker erneut geprüft.
