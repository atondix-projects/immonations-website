# Andreas-PDF · Blocker-Recheck vor onOffice

Stand: 11. September 2026  
Branch: `codex/immonation-pdf-loop`

## Ergebnis

Alle offenen P1-/P2-Punkte wurden erneut gegen den lokalen `assets/`-Bestand, die vorhandene Konfiguration und die abgeschlossenen Nachweise geprüft. Kein Blocker darf ohne neue Freigabe, belastbare Quelldaten oder einen externen Live-Nachweis auf `PASS` gesetzt werden.

| PDF-ID | Recheck | Fehlender Abschlussnachweis |
| --- | --- | --- |
| PDF-S-01 | weiterhin BLOCKIERT | Andreas' visuelle Größenfreigabe für den bereits verifizierten Finanzierungsteaser |
| PDF-S-04 | weiterhin BLOCKIERT | finale Partnerliste einschließlich Reihenfolge, Ziel-URLs und Nutzungsrechten |
| PDF-R-02 | weiterhin BLOCKIERT | vollständige Kennzahlen für `adelsdorf-reuthseering`, `schwabach-abenberger` und `zirndorf-carl-benz`; eindeutige Freigabe des Fürther `8 %`-Ergebnisses |
| PDF-R-03 | weiterhin BLOCKIERT | `GOOGLE_PLACES_API_KEY` in der Zielumgebung und erfolgreicher Nachweis mit `data-review-source="google-live"` |
| PDF-KI-01 | weiterhin BLOCKIERT | freigegebenes Gewerbe-Vorher-/Nachher-Paar oder ausdrückliche Abweichung sowie Prototyp-Abnahme |
| PDF-V-01 | weiterhin BLOCKIERT | Andreas' inhaltliche Freigabe der technisch verifizierten Ogulo-Seite |
| PDF-V-02 | weiterhin BLOCKIERT | freigegebene aktuelle Suchprofile mit Profil-ID, Gebiet, Budget, Kriterien, Gültigkeit und Veröffentlichungsfreigabe; alternativ onOffice-Quelle |
| PDF-W-05 | weiterhin BLOCKIERT | Andreas' redaktionelle Freigabe der vier neuen DE-/EN-Ratgeber |
| PDF-W-07 | weiterhin BLOCKIERT | belegte lokale Inhalte für bislang nicht abgedeckte Stadtteile, insbesondere Schwabach, sowie redaktionelle Freigabe |
| PDF-W-08 | weiterhin BLOCKIERT | Andreas' redaktionelle Freigabe der erweiterten Immobilienpreise-Seite |
| PDF-W-09 | weiterhin BLOCKIERT | Andreas' visuelle Freigabe des redaktionellen Marktdossiers auf Desktop und Mobil |

## Konfigurationsprüfung

- `.env.example` dokumentiert `GOOGLE_PLACES_API_KEY` und `GOOGLE_PLACE_ID`; im Worktree und in der aktuellen Prozessumgebung ist keine echte Google-Konfiguration vorhanden.
- Im lokalen Bestand existieren keine onOffice-Zugangsdaten. Zugangsdaten werden nicht erfunden oder committed.
- Die onOffice-Runde wird deshalb vollständig gegen eine kontrollierte Test-Provider-Implementierung geprüft. Echte Objektstichprobe und echte Testleads bleiben bis zur sicheren Bereitstellung der Zielumgebungs-Zugangsdaten `BLOCKIERT`.

## Fortsetzung

Die unabhängigen Blocker bleiben ehrlich sichtbar. Gemäß der festgelegten Reihenfolge beginnt nun die finale onOffice-Runde: `PDF-K-02`, danach `PDF-I-01`, danach `PDF-T-03`.
