# Immonation - priorisierte Aenderungsliste von Andreas

Quelle: `docs/source-material/originals/Immonation_Aenderungen_Andreas_final.pdf`  
Stand der Quelle: September 2026  
Triage erstellt: 2026-09-09

> Diese Datei priorisiert das Kundenfeedback und ist noch keine verifizierte Aussage zum aktuellen Implementierungsstand. Vor der Umsetzung jeden Punkt gegen den aktuellen Code pruefen und nur bestaetigte Restarbeiten in die kanonische `TODO.md` uebernehmen.

## Prioritaetslogik

- **P0 - vor Go-live:** Sicherheits-, Lead-, Indexierungs- oder klar sichtbare Produktionsfehler.
- **P1 - fuer die fachlich vollstaendige Freigabe:** Fehlende Kerninhalte und zentrale Funktionen.
- **P2 - Optimierung:** Struktur-, Darstellungs- und Vertrauensverbesserungen ohne unmittelbares Launch-Risiko.

## P0 - vor Go-live

### P0-01 - Markenzertifikat aus dem oeffentlichen Download entfernen

- [ ] Das Markenzertifikat auf der Download-Seite nicht mehr als Download anbieten.
- [ ] Pruefen, dass die Datei auch nicht mehr direkt ueber eine bekannte Public-URL erreichbar ist.
- [ ] Falls die Datei anderweitig benoetigt wird, nur in einem nicht oeffentlichen Ablageort vorhalten.
- **Abnahme:** Weder Download-Link noch oeffentlich erreichbare Zertifikatsdatei vorhanden.
- **Grund:** Missbrauchsrisiko durch Dritte, die sich damit als Inhaber ausgeben koennten.

### P0-02 - Produktionsdomain und Social-Metadaten korrigieren

- [ ] `metadataBase` auf `https://immonationgmbh.de` setzen.
- [ ] Canonical URLs, `og:url` und `og:image` auf allen Seitentypen pruefen.
- [ ] Sicherstellen, dass nirgends `http://localhost:3000` ausgegeben wird.
- **Abnahme:** Gerenderte Metadaten enthalten ausschliesslich `https://immonationgmbh.de` und funktionierende Social-Preview-URLs.
- **Status:** Produktionsdomain durch Andreas am 2026-09-09 bestaetigt.

### P0-03 - Kennzahlen serverseitig mit echten Werten rendern

- [ ] Platzhalter wie `0,0/5`, `0+ Verkaeufe`, `0 Mio EUR`, `0 Team` und Portalbewertungen `0,0/5` beseitigen.
- [ ] Echte, freigegebene Werte bereits im initialen HTML ausgeben; Count-up nur als progressive Animation verwenden.
- [ ] Verhalten ohne JavaScript pruefen.
- **Abnahme:** Im initialen HTML und beim ersten sichtbaren Rendern stehen die echten Werte, nie Null-Platzhalter.
- **Kontext benoetigt:** Freigegebene aktuelle Kennzahlen und deren Quellen.

### P0-04 - Bewertungs-Wizard und Kontaktformular produktiv anbinden

- [ ] Bewertungs-Wizard an die freigegebene Lead-Strecke anbinden.
- [ ] Kontaktformular so anbinden, dass echte Anfragen an onOffice und/oder E-Mail gesendet werden.
- [ ] Erfolgs-, Fehler- und Wiederholungsfaelle end-to-end testen.
- [ ] Keine Prototyp-Hinweise wie "keine Anfrage uebertragen" mehr in der Produktionsversion ausgeben.
- **Abnahme:** Testanfragen kommen vollstaendig am vereinbarten Ziel an; Nutzende erhalten einen ehrlichen Status.
- **Kontext benoetigt:** Zielsystem, Empfaenger, Zugangsdaten, Feldmapping und verantwortliche Person fuer Testanfragen.

### P0-05 - onOffice fuer den echten Objektbestand anbinden

- [ ] Auf "Aktuelle Objekte" den echten, automatisch aktualisierten Objektbestand anzeigen.
- [ ] Darstellung gegenueber der bisherigen Website verbessern, ohne Bestands- oder Verfuegbarkeitsdaten zu verfremden.
- [ ] Leere, Lade- und Fehlerzustaende definieren und testen.
- **Abnahme:** Freigegebene Objekte und Status werden automatisch aus onOffice geladen und korrekt verlinkt.
- **Kontext benoetigt:** onOffice-Zugang/API, freigegebene Felder, bestehendes Integrationsbeispiel und Testbestand.
- **Reihenfolge:** Die onOffice-Anbindung ist der letzte Umsetzungsschritt vor der abschliessenden End-to-End- und Go-live-Pruefung.

### P0-06 - Internen Partner-Login entfernen

- [ ] Den Partner-Login am Ende der oeffentlichen Finanzierungsseite entfernen.
- [ ] Pruefen, ob derselbe interne Einstieg an weiteren oeffentlichen Stellen verlinkt ist.
- **Abnahme:** Auf der oeffentlichen Website ist kein interner Partner-Login mehr sichtbar.

### P0-07 - Eigene Meta-Description pro Seite ausgeben

- [ ] Die aktuell identische Meta-Description durch eine seitenindividuelle, keyword-passende Description ersetzen.
- [ ] Beide Sprachen und alle indexierbaren Seitentypen abdecken.
- [ ] Duplikate automatisiert oder stichprobenartig pruefen.
- **Abnahme:** Jede indexierbare Seite besitzt eine inhaltlich passende und lokalisierte Description.

### P0-08 - Doppelte Fusszeile global beheben

- [ ] Den footerartigen vorletzten Block nicht zusaetzlich zum echten globalen Footer rendern.
- [ ] Betroffene Seiten pruefen: Kontakt & Oeffnungszeiten, alle weiteren Immonation-Seiten, FAQ, Lexikon, Bodenrichtwert, Staedte & Stadtteile, Immobilienpreise sowie Immobilienpreise & Trends.
- [ ] Die Loesung als einmalige globale Komponente absichern.
- **Abnahme:** Auf jeder betroffenen Seite erscheint genau eine Fusszeile.
- **Status:** "Weitere Immonation-Seite" meint allgemein die weiteren Seiten im Immonation-Bereich, nicht eine einzelne Route.

## P1 - fachlich vollstaendige Freigabe

### P1-01 - Referenzen auf vier Kategorien vereinheitlichen

- [ ] Alle Referenzen exakt einer der vier Kategorien zuordnen: **Wohnung**, **Haus**, **Gewerbe**, **Investment**.
- [ ] Filter, Labels und Inhalte auf Startseite und Referenzen-Seite identisch halten.
- [ ] Bestehende abweichende Objektarten migrieren.
- **Abnahme:** Es werden genau vier Kategorien verwendet; jede Referenz ist eindeutig zugeordnet.

### P1-02 - Kennzahlen je Referenzobjekt ergaenzen

- [ ] Pro Objekt mindestens Vermarktungszeit, Anzahl Anfragen, Besichtigungen und Preis bzw. die freigegebene Preiskennzahl anzeigen.
- [ ] Dieselben Daten in den Startseiten-Karten und auf der Referenzen-Seite verwenden.
- [ ] Fehlende oder nicht freigegebene Werte ehrlich behandeln, nicht erfinden.
- **Abnahme:** Alle freigegebenen Referenzobjekte zeigen konsistente, belegte Kennzahlen.
- **Lokale Quelle:** `assets/Referenz Objekte/Immonation_Referenztexte.docx.md` und die zugeordneten Objektordner. Die Datei enthaelt bereits Anfragen, Besichtigungen, Vermarktungszeit und Verkaufsergebnis; verbliebene `X`-Platzhalter vor der Veroeffentlichung pruefen.
- **Kontext benoetigt:** Freigabe, welche Preis- bzw. Verkaufsergebnis-Angabe oeffentlich sein darf.

### P1-03 - Google-Rezensionen live statt als Screenshots einbinden

- [ ] Statische Google-Screenshots im Referenzen-Bereich entfernen.
- [ ] Im Block "Dieselben Erfahrungen, schriftlich festgehalten" laufend aktuelle Google-Rezensionen anzeigen.
- [ ] Lade-, Fehler-, Datenschutz- und Consent-Verhalten beruecksichtigen.
- **Abnahme:** Die freigegebene Live-Quelle funktioniert; statische Google-Screenshots sind entfernt.
- **Kontext benoetigt:** Google-Unternehmensprofil/Place ID, gewuenschte Integrationsart und Consent-Vorgaben.

### P1-04 - KI-Visualisierung als vollstaendigen Baustein umsetzen

- [ ] Eigene Unterseite inhaltlich ausbauen.
- [ ] Interaktiven Vorher/Nachher-Regler wie im Prototyp umsetzen.
- [ ] Szenarien abdecken: vermietet, renovierungsbeduerftig, leerstehend/veraltet und geerbt.
- [ ] Bildgruppen fuer Haus, Wohnung und Gewerbe verwenden.
- [ ] Einen klaren Teaser auf der Startseite ergaenzen.
- **Abnahme:** Unterseite und Startseiten-Teaser sind vollstaendig, interaktiv, mobil bedienbar und zweisprachig.
- **Lokale Quelle:** `assets/KI Visualisierungen/` mit Material fuer Eigentumswohnung, Grundstueck und Haus.
- **Kontext benoetigt:** Freigabe der finalen Auswahl und Zuordnung zu den gewuenschten Szenarien.

### P1-05 - Datumsstempel und Datenquellen-Formulierung bereinigen

- [ ] "Stand September 2026" bzw. "Stand September" auf Preisatlas, Immobilienpreise und Immobilienpreise & Trends entfernen; weitere Vorkommen mitpruefen.
- [ ] "einige Vermittlungsdaten" einheitlich durch "basierend auf Vermittlungsdaten der Immonation" ersetzen.
- [ ] Formulierung auf Preisatlas und Immobilienpreise einheitlich halten.
- **Abnahme:** Keine ungewollten September-Stempel; Datenherkunft wird einheitlich und korrekt beschrieben.
- **Verbindliche Formulierung:** "basierend auf Vermittlungsdaten der Immonation"
- **Status:** Durch Andreas am 2026-09-09 bestaetigt; einheitlich auf Preisatlas und Immobilienpreise verwenden.

### P1-06 - Startseiten-Testimonials auf Videos umstellen

- [ ] Im Block "Ausgewaehlte Stimmen zu echten Verkaeufen" die Google-Screenshots entfernen.
- [ ] Stattdessen die freigegebenen Kunden-/Referenzvideos einblenden.
- [ ] Mobile Wiedergabe, Poster, Untertitel, Datenschutz und Ladeverhalten pruefen.
- **Abnahme:** Der Block zeigt ausschliesslich freigegebene Videos und funktioniert performant auf Mobilgeraeten.
- **Lokale Quelle:** `assets/Verkäufer Feedback Videos/` mit Videos, Titelbildern und begleitenden Texten.
- **Kontext benoetigt:** Finale Auswahl, Untertitel und Publikationsfreigaben.

### P1-07 - Finanzierungsblock auf der Startseite verdichten

- [ ] Den grossen Finanzierungsblock auf einen kompakten Anreisser reduzieren.
- [ ] Nur Tool-Abbildung/Andeutung und eine kurze Zusammenfassung "was wir bieten" zeigen.
- [ ] Auf die vollstaendige Finanzierungs-Unterseite verlinken.
- **Abnahme:** Der Startseitenblock ist kompakt; die inhaltliche Tiefe liegt auf der Unterseite.

### P1-08 - Virtuelle Besichtigung inhaltlich staerken

- [ ] Die Unterseite mit zusaetzlichem erklaerendem Inhalt ausbauen.
- [ ] Die 360-Grad-Tour der Startseite als direkt abrufbares Beispiel einbinden.
- **Abnahme:** Die Seite erklaert Nutzen und Ablauf und bietet eine funktionierende Beispieltour.
- **Lokale Quelle:** Zuerst vorhandene Tour-/Objektmaterialien unter `assets/` pruefen; `assets/Objektvideo-Präsentation/Wörnitzstr.mov` ist ein Objektvideo, aber nicht automatisch eine interaktive 360-Grad-Tour.
- **Kontext benoetigt:** Falls die interaktive Tour nicht lokal vorliegt, deren freigegebene Einbindungs-URL.

### P1-09 - Aktive Suchkunden mit echten Profilen ausbauen

- [ ] Reale, freigegebene Suchprofile hinterlegen und ueber die passenden Stadtteile verteilen.
- [ ] Mindestens die gewuenschten Profiltypen abdecken: Familie/EFH, Single/Appartement, Investor/Anlageimmobilie.
- [ ] Budgets, Orte und Objektanforderungen aktuell und datenschutzkonform halten.
- **Abnahme:** Die Seite enthaelt substanzielle, lokal zugeordnete Suchprofile und einen klaren naechsten Schritt.
- **Kontext benoetigt:** Freigegebene aktuelle Suchprofile, Laufzeit/Aktualisierungsprozess und zulaessige Detailtiefe.

### P1-10 - Objektartseiten intern mit Preiswissen verknuepfen

- [ ] Auf Mehrfamilienhaus-, Wohnungs-, Grundstuecks- und Hausverkaufsseiten auf Bodenrichtwert und Preisatlas verlinken.
- [ ] Links in DE und EN auf die jeweils lokalisierte Route fuehren.
- **Abnahme:** Alle vier Seiten besitzen kontextuelle, funktionierende interne Links zu beiden Wissensangeboten.

### P1-11 - Inhaltlich duenne Wissens- und Preisseiten ausbauen

- [ ] Ratgeber & News mit mehr redaktioneller Substanz versehen.
- [ ] Staedte & Stadtteile mit mehr lokalem, nicht dupliziertem Inhalt ausbauen.
- [ ] Immobilienpreise mit Methodik, Einordnung und hilfreichen Erklaerungen staerken.
- [ ] Inhaltliche Tiefe in beiden Sprachen sicherstellen.
- **Abnahme:** Die Seiten beantworten die zentralen Nutzerfragen substanziell und enthalten keine duennen Platzhalterabschnitte.
- **Kontext benoetigt:** Themenprioritaeten, fachlich freigegebene Fakten und redaktionelle Verantwortung.

## P2 - Optimierung und visuelle Verfeinerung

### P2-01 - Polaroid-Bilder an die Verkaufsglocke verschieben

- [ ] Die Polaroid-Bilder direkt unter "Jeder Abschluss wird bei uns gelaeutet" platzieren.
- [ ] Responsive Reihenfolge und Abstaende pruefen.
- **Abnahme:** Glocken- und Polaroid-Inhalte bilden visuell einen zusammenhaengenden Abschnitt.

### P2-02 - Partnerbereich vervollstaendigen

- [ ] Fehlende Partner ergaenzen.
- [ ] Logos, Namen, Links, Reihenfolge und Nutzungsrechte pruefen.
- **Abnahme:** Die freigegebene Partnerliste ist vollstaendig und konsistent dargestellt.
- **Lokale Quelle:** Vorhandene Partner- und Markenmaterialien unter `assets/` pruefen.
- **Kontext benoetigt:** Bestaetigung der finalen Partnerliste, Ziel-URLs und Freigaben.

### P2-03 - Objektart-Slideshows ergaenzen

- [ ] Auf "Mehrfamilienhaus verkaufen" unter "Die entscheidenden Schritte" eine Slideshow mit Altbau-MFH, Putzfassade-MFH und Neubau-MFH ergaenzen.
- [ ] Dasselbe Prinzip objektpassend auf Wohnung, Grundstueck und Haus anwenden.
- [ ] Bilder, Beschriftungen und Reihenfolge fuer Mobil und Desktop abstimmen.
- **Abnahme:** Alle vier Objektartseiten besitzen eine passende, barrierearm bedienbare Slideshow.
- **Lokale Quelle:** `assets/verkaufen/`, `assets/Referenz Objekte/` und `assets/Bilder für Homepage/` auf geeignete objektbezogene Bilder pruefen.
- **Kontext benoetigt:** Freigabe der finalen Bildauswahl und Beschriftungen pro Objektart.

### P2-04 - Immobilienpreise & Trends gestalterisch schaerfen

- [ ] Die Seite weniger generisch und weniger nach "KI-Design" wirken lassen.
- [ ] Informationshierarchie, Typografie, Kartenmuster und visuelle Wiederholungen ueberarbeiten.
- [ ] Bestehende Inhalte und Funktionalitaet erhalten.
- **Abnahme:** Die Seite wirkt eigenstaendig, markenkonform und redaktionell gestaltet.

## Empfohlene Umsetzungsreihenfolge

1. **Sofort absichern:** P0-01 und P0-06.
2. **Produktionsgrundlage ohne onOffice herstellen:** P0-02, P0-03 und die interne Vorbereitung von P0-04.
3. **SEO und sichtbare globale Fehler schliessen:** P0-07 und P0-08.
4. **Lokale Assets auswerten:** Referenzdaten, Videos, Visualisierungen, Partner- und Objektmaterial aus `assets/` zuordnen.
5. **Fehlende externe Angaben einsammeln:** Unternehmenskennzahlen, Suchprofile, Freigaben und gegebenenfalls die 360-Grad-Einbindungs-URL.
6. **Kerninhalte und Funktionen liefern:** P1-01 bis P1-11.
7. **Visuelle und strukturelle Verfeinerung:** P2-01 bis P2-04.
8. **onOffice zuletzt anbinden:** P0-05 sowie die finale onOffice-Uebertragung aus P0-04.
9. **Abschliessend testen:** Formulare, Objektbestand, Metadaten und alle Go-live-Pfade end-to-end pruefen.

## Benoetigter Kontext / externe Zuarbeit

- [x] Produktionsdomain bestaetigt: `https://immonationgmbh.de`.
- [x] Quelldaten und Medien sind lokal unter `assets/` vorhanden; relevante Ordner wurden identifiziert.
- [ ] Freigegebene aktuelle Unternehmenskennzahlen liefern.
- [ ] onOffice-Zugang, Datenmapping und Ziel fuer Kontakt-/Bewertungsanfragen fuer den letzten Umsetzungsschritt klaeren.
- [ ] Finale Auswahl und Publikationsfreigabe fuer Videos, 360-Grad-Tour, Partner und Bilder bestaetigen.
- [ ] Google-Unternehmensprofil/Place ID und gewuenschte Live-Review-Loesung bestaetigen.
- [x] Datenquellen-Formulierung bestaetigt: "basierend auf Vermittlungsdaten der Immonation".
- [x] "Weitere Immonation-Seiten" meint allgemein die weiteren Seiten des Immonation-Bereichs.

## Abgleich mit der kanonischen TODO

Mehrere Punkte ueberschneiden sich bereits mit `TODO.md`, insbesondere onOffice, Formularuebertragung, Produktionsdomain, belegte Kennzahlen, individuelle Metadaten sowie Rechte an Bildern/Videos/Partnerlogos. Beim Uebertragen dieser Triage in die aktive Planung keine Duplikate anlegen; vorhandene TODO-Punkte stattdessen konkretisieren oder referenzieren.
