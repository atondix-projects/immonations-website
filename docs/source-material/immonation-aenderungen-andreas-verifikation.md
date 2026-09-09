# Immonation - 1:1-Verifikation gegen die Änderungs-PDF

Quelle: `docs/source-material/originals/Immonation_Aenderungen_Andreas_final.pdf`  
Referenzstand: September 2026  
Produktionsdomain: `https://immonationgmbh.de`  
Verifikationsliste erstellt: 2026-09-09

## Zweck und Abnahmeregel

Diese Liste bildet jede der 32 Feedbackzeilen aus der PDF einzeln ab. Das Endergebnis gilt erst als vollständig abgenommen, wenn:

- [ ] alle 32 PDF-Prüfpunkte den Status **PASS** haben oder eine ausdrücklich von Andreas freigegebene Abweichung dokumentiert ist;
- [ ] alle globalen Punkte in Deutsch und Englisch geprüft wurden;
- [ ] alle seitenspezifischen Punkte mindestens auf der deutschen Referenzseite geprüft wurden und ihre englische Entsprechung keine Regression zeigt;
- [ ] Desktop und Mobilansicht geprüft wurden;
- [ ] funktionale Punkte nicht nur optisch, sondern end-to-end getestet wurden;
- [ ] jeder PASS einen nachvollziehbaren Nachweis besitzt, zum Beispiel URL, Screenshot, HTML-Auszug, Testprotokoll oder empfangene Testanfrage;
- [ ] die onOffice-Anbindung als letzter Umsetzungsschritt abgeschlossen und danach die gesamte Abschlussprüfung wiederholt wurde.

Nicht messbare PDF-Aussagen wie "zu dünn", "zu schwach" oder "zu viel KI-Design" benötigen zusätzlich eine visuelle bzw. redaktionelle Freigabe durch Andreas.

## Prüfprotokoll

- **Deployment/URL:**
- **Commit oder Release:**
- **Prüfdatum:**
- **Prüfende Person:**
- **Desktop-Browser und Viewport:**
- **Mobil-Browser und Viewport:**
- **Testkonto/Testdatensatz:**
- **Nachweisordner:**

Status je Punkt: `OFFEN`, `PASS`, `FAIL`, `BLOCKIERT`, `FREIGEGEBENE ABWEICHUNG`.

## Vollständigkeitskontrolle der PDF

| PDF-Abschnitt | Erwartete Prüfpunkte |
|---|---:|
| Übergreifend | 3 |
| 1. Startseite | 4 |
| 2. Referenzen | 3 |
| 3. KI-Visualisierung | 1 |
| 4. Ich will verkaufen | 4 |
| 5. Ich will kaufen | 2 |
| 6. Preise & Wissen | 9 |
| 7. Immonation | 2 |
| 8. Technik-/Launch-Punkte | 4 |
| **Gesamt** | **32** |

## A. Übergreifend - 3 Prüfpunkte

### PDF-Ü-01 - Doppelte Fußzeile

- [x] **Soll:** Das footerartige Design erscheint pro Seite genau einmal, nicht zusätzlich im vorletzten Block und nochmals im echten Footer.
- [x] **Seitenumfang:** `/de/kontakt`, `/de/faq`, `/de/lexikon`, `/de/bodenrichtwert`, `/de/staedte`, `/de/markt`, `/de/marktdaten` sowie alle weiteren Immonation-Seiten prüfen.
- [x] **Immonation-Bereich vollständig prüfen:** `/de/ueber`, `/de/magazin`, `/de/referenzen`, `/de/verkauft`, `/de/bewertungen`, `/de/kundenstimmen`, `/de/auszeichnungen`, `/de/engagement`, `/de/gruppe`, `/de/karriere`, `/de/partnermakler`, `/de/tippgeber` und `/de/kontakt`.
- [x] **Technische Prüfung:** Pro Seite nur ein globales `<footer>` und keine visuell duplizierte Footer-Komposition unmittelbar davor.
- [x] **Responsive Prüfung:** Desktop und Mobilansicht besitzen jeweils genau eine Fußzeile.
- **Status:** PASS
- **Nachweis:** `CtaBand` ist als helle Markenfläche vom dunklen, mit `data-site-footer` eindeutig markierten globalen Footer getrennt. Der Katalog-Crawl prüft jede indexierbare DE-/EN-Seite auf genau einen globalen Footer; Playwright bestätigt die unterschiedlichen Hintergründe bei 390×844 und 1440×900.

### PDF-Ü-02 - Datumsstempel "Stand September 2026"

- [x] **Soll:** Der unerwünschte Datumsstempel ist entfernt.
- [x] **Pflichtseiten:** `/de/preisatlas`, `/de/markt` und `/de/marktdaten` visuell und im gerenderten Text prüfen.
- [x] **Globale Negativsuche:** In indexierbaren Seiten darf weder "Stand September 2026" noch "Stand September" als beanstandeter Stempel erscheinen.
- [x] **Ausnahmeprüfung:** Andere fachlich notwendige und ausdrücklich freigegebene Datumsangaben separat dokumentieren, nicht stillschweigend entfernen.
- **Status:** PASS
- **Nachweis:** Contract-Test `PDF-Ü-02` erzwingt die optionale Datumsangabe und verbietet `DATA_AS_OF` auf den drei Marktseiten. Playwright prüft `/de/preisatlas`, `/de/markt` und `/de/marktdaten` negativ. `/de/bodenrichtwert` behält den fachlich notwendigen Stichtag für amtliche Tabellen ausdrücklich als dokumentierte Ausnahme.

### PDF-Ü-03 - Einheitliche Datenquellen-Formulierung

- [ ] **Solltext exakt:** `basierend auf Vermittlungsdaten der Immonation`
- [ ] **Pflichtseiten:** Preisatlas und Immobilienpreise enthalten diese Formulierung einheitlich.
- [ ] **Negativprüfung:** Die beanstandete Formulierung `einige Vermittlungsdaten` kommt nicht mehr vor.
- [ ] **Sprachprüfung:** Die englischen Seiten verwenden eine sinngleiche, eindeutige Übersetzung und keine widersprüchliche Quellenbeschreibung.
- **Status:**
- **Nachweis:**

## B. 1. Startseite - 4 Prüfpunkte

Referenz-URL: `/de`

### PDF-S-01 - Finanzierungsblock verkleinern

- [ ] **Soll:** Der Finanzierungsblock ist ein kompakter Anreißer und keine vollständige Inhaltsseite innerhalb der Startseite.
- [ ] Eine Tool-Abbildung oder kurze Andeutung ist vorhanden.
- [ ] Ein kurzer Text erklärt, was Immonation anbietet.
- [ ] Ein eindeutiger Link führt auf `/de/finanzierung`.
- [ ] Die vollständige Inhaltstiefe befindet sich auf der Finanzierungs-Unterseite.
- [ ] Andreas bestätigt visuell, dass der Block nicht mehr "zu groß" wirkt.
- **Status:**
- **Nachweis:**

### PDF-S-02 - Videos statt Google-Screenshots

- [ ] **Soll:** Im Block "Ausgewählte Stimmen zu echten Verkäufen" sind die Google-Screenshots entfernt.
- [ ] Stattdessen werden die freigegebenen Videos aus `assets/Verkäufer Feedback Videos/` verwendet.
- [ ] Wiedergabe, Poster, Untertitel, Tastaturbedienung und Mobilansicht funktionieren.
- [ ] Es werden nur freigegebene Kunden- und Objektinformationen veröffentlicht.
- **Status:**
- **Nachweis:**

### PDF-S-03 - Polaroid-Bilder direkt unter der Verkaufsglocke

- [ ] **Soll:** Die Polaroid-Bilder stehen direkt unter dem Abschnitt "Jeder Abschluss wird bei uns geläutet".
- [ ] Die Bilder stammen aus dem freigegebenen Bestand, insbesondere `assets/Übergabebilder Polaroidkamera/`.
- [ ] Zwischen Glockenabschnitt und Polaroids liegt kein sachfremder Inhaltsblock.
- [ ] Reihenfolge, Abstände und Lesbarkeit funktionieren auf Desktop und Mobil.
- **Status:**
- **Nachweis:**

### PDF-S-04 - Partner vervollständigen

- [ ] **Soll:** Alle von Immonation gewünschten Partner sind vorhanden.
- [ ] Namen, Logos, Links und Reihenfolge stimmen mit der final freigegebenen Partnerliste überein.
- [ ] Es fehlen keine Partner; es werden keine nicht freigegebenen Partner gezeigt.
- [ ] Logoqualität, Alternativtexte und externe Links sind geprüft.
- [ ] Andreas bestätigt die Vollständigkeit.
- **Status:**
- **Nachweis/Freigabeliste:**

## C. 2. Referenzen - 3 Prüfpunkte

Referenz-URLs: `/de` und `/de/referenzen`

### PDF-R-01 - Genau vier Referenzkategorien

- [ ] **Soll:** Es existieren genau die Kategorien `Wohnung`, `Haus`, `Gewerbe` und `Investment`.
- [ ] Startseiten-Karten, Referenzen-Seite, Filter und Detailseiten verwenden dieselbe Zuordnung.
- [ ] Bezeichnungen wie Eigentumswohnung, Reihenhaus, Mehrfamilienhaus oder Dreifamilienhaus erscheinen nicht als zusätzliche Hauptkategorien.
- [ ] Jede veröffentlichte Referenz ist genau einer der vier Kategorien zugeordnet.
- [ ] Deutsch und Englisch besitzen dieselbe fachliche Kategorisierung.
- **Status:**
- **Nachweis:**

### PDF-R-02 - Kennzahlen pro Referenzobjekt

- [ ] **Soll:** Pro freigegebenem Objekt werden Vermarktungszeit, Anzahl Anfragen, Besichtigungen und eine freigegebene Preis-/Ergebniskennzahl gezeigt.
- [ ] Quelldaten werden mit `assets/Referenz Objekte/Immonation_Referenztexte.docx.md` abgeglichen.
- [ ] Verbliebene `X`-Platzhalter, leere Werte oder erfundene Ersatzwerte sind ausgeschlossen.
- [ ] Startseiten-Karte und Referenzen-Seite zeigen für dasselbe Objekt identische Werte.
- [ ] Rundung, Einheit und Schreibweise sind konsistent.
- [ ] Preis- oder Ergebnisangaben besitzen die notwendige Veröffentlichungsfreigabe.
- **Status:**
- **Nachweis/Stichprobe:**

### PDF-R-03 - Google-Rezensionen live einbinden

- [ ] **Soll:** Der Block "Dieselben Erfahrungen, schriftlich festgehalten" verwendet eine laufend aktualisierbare Google-Rezensionsquelle.
- [ ] Statische Google-Screenshots sind entfernt.
- [ ] Die angezeigten Bewertungen gehören zum richtigen Immonation-Unternehmensprofil.
- [ ] Aktualisierung, Ladezustand, Fehlerzustand und fehlende Einwilligung werden korrekt behandelt.
- [ ] Falls ein Slider verwendet wird, funktionieren Autoplay-Pause, Tastatur und Touch.
- **Status:**
- **Nachweis:**

## D. 3. KI-Visualisierung - 1 Prüfpunkt

Relevante aktuelle Routen: `/de/ki` und `/de/ki-visualisierung-home-staging`

### PDF-KI-01 - Eigene Seite plus Startseiten-Teaser

- [ ] **Soll:** Eine eindeutige, inhaltlich vollständige KI-Visualisierungsseite ist vorhanden; konkurrierende Routen sind sinnvoll kanonisiert oder klar getrennt.
- [ ] Ein interaktiver Vorher/Nachher-Regler funktioniert mit Maus, Touch und Tastatur.
- [ ] Die Szenarien `vermietet`, `renovierungsbedürftig`, `leerstehend/veraltet` und `geerbt` werden nachvollziehbar behandelt.
- [ ] Material für Haus, Wohnung und Gewerbe ist vorhanden oder eine von Andreas freigegebene Abweichung dokumentiert.
- [ ] Die Inhalte sind mit `assets/KI Visualisierungen/` abgeglichen.
- [ ] Die Startseite enthält einen sichtbaren Teaser mit funktionierendem Link zur finalen Unterseite.
- [ ] Vorher- und Nachherdarstellung ist eindeutig beschriftet; KI-Inhalte werden transparent gekennzeichnet.
- [ ] Andreas bestätigt die Übereinstimmung mit dem gewünschten Prototyp-Prinzip.
- **Status:**
- **Nachweis:**

## E. 4. Ich will verkaufen - 4 Prüfpunkte

### PDF-V-01 - Virtuelle Besichtigung ausbauen

Referenz-URL: `/de/virtuell`

- [ ] **Soll:** Die Seite besitzt mehr als einen schwachen Kurz- oder Platzhalterinhalt und erklärt Nutzen, Ablauf und Einsatz der virtuellen Besichtigung.
- [ ] Die auf der Startseite gezeigte 360-Grad-Tour ist auf der Unterseite als direkt abrufbares Beispiel eingebunden.
- [ ] Es handelt sich tatsächlich um eine interaktive 360-Grad-Tour, nicht lediglich um ein lineares Objektvideo.
- [ ] Tour, Vollbild, Mobilbedienung, Consent und Fehlerzustand funktionieren.
- [ ] Andreas bestätigt die inhaltliche Stärke der Seite.
- **Status:**
- **Nachweis:**

### PDF-V-02 - Aktive Suchkunden ausbauen

Referenz-URL: `/de/suchkunden`

- [ ] **Soll:** Die Seite enthält substanzielle, aktuelle Suchprofile statt allgemeiner Platzhaltertexte.
- [ ] Die Profile decken mindestens Familie/EFH, Single/Apartment und Investor/Anlageimmobilie ab.
- [ ] Die PDF-Beispiele - EFH bis 870.000 EUR, Apartment bis 120.000 EUR und Anlageimmobilie bis 2 Mio. EUR - sind enthalten oder durch freigegebene aktuelle Profile ersetzt.
- [ ] Profile sind passenden Städten bzw. Stadtteilen zugeordnet.
- [ ] Aktualität, Datenschutz und Ablauf zur Entfernung abgelaufener Profile sind geprüft.
- [ ] Andreas bestätigt die inhaltliche Stärke und lokale Verteilung.
- **Status:**
- **Nachweis/Freigabeliste:**

### PDF-V-03 - Mehrfamilienhaus-Slideshow

Referenz-URL: `/de/objektart/mehrfamilienhaus`

- [ ] **Soll:** Direkt unter "Die entscheidenden Schritte" befindet sich eine Slideshow.
- [ ] Die Slideshow zeigt mindestens Altbau-MFH, Putzfassade-MFH und Neubau-MFH.
- [ ] Typen sind eindeutig beschriftet und verwenden freigegebene Bilder.
- [ ] Tastatur, Touch, Fokus, Beschriftungen und Mobilansicht funktionieren.
- **Status:**
- **Nachweis:**

### PDF-V-04 - Slideshows und Wissenslinks auf drei weiteren Objektartseiten

Referenz-URLs: `/de/objektart/wohnung`, `/de/objektart/grundstueck`, `/de/objektart/haus`

- [ ] **Soll:** Jede der drei Seiten besitzt eine objektpassende Slideshow nach demselben Prinzip.
- [ ] Zusammen mit `/de/objektart/mehrfamilienhaus` verlinken alle vier Objektartseiten kontextuell auf `/de/bodenrichtwert`.
- [ ] Alle vier Objektartseiten verlinken kontextuell auf `/de/preisatlas`.
- [ ] Die englischen Seiten führen auf die jeweiligen lokalisierten Ziele.
- [ ] Alle Slideshow-Bilder und Beschriftungen passen zur jeweiligen Objektart.
- **Status:**
- **Nachweis:**

## F. 5. Ich will kaufen - 2 Prüfpunkte

### PDF-K-01 - Partner-Login entfernen

Referenz-URL: `/de/finanzierung`

- [x] **Soll:** Am Seitenende und an allen anderen öffentlichen Stellen ist kein interner Partner-Login sichtbar oder verlinkt.
- [x] Textsuche, Navigation, Footer und mobile Menüs enthalten keinen entsprechenden Einstieg.
- [x] Ein eventuell weiterhin benötigter interner Zugang liegt außerhalb der öffentlichen Website.
- **Status:** PASS
- **Nachweis:** Contract-Test `PDF-K-01` durchsucht Finanzierungsseite, Navigation, Footer und beide Sprachdateien nach Partner-Login-, Login- und Sign-in-Einstiegen. Es gibt keinen öffentlichen Zugang.

### PDF-K-02 - Aktuelle Objekte über onOffice

Referenz-URL: `/de/angebote`

- [ ] **Reihenfolge:** Diesen Punkt erst als letzten Umsetzungsschritt prüfen.
- [ ] **Soll:** Der echte Objektbestand wird automatisch aus onOffice angezeigt.
- [ ] Teststichprobe zwischen onOffice und Website stimmt bei Titel, Status, Preis, Ort, Bildern und Detail-URL überein.
- [ ] Veröffentlichte, reservierte, verkaufte und entfernte Objekte folgen dem freigegebenen Statusmapping.
- [ ] Es bleiben keine indexierbaren Demo- oder Platzhalterobjekte zurück.
- [ ] Lade-, Leer-, Fehler- und Timeout-Zustände sind verständlich.
- [ ] Darstellung funktioniert auf Desktop und Mobil und ist gegenüber der bisherigen Website grafisch verbessert.
- [ ] Aktualisierung oder Cache-Ablauf ist dokumentiert und praktisch getestet.
- **Status:**
- **Nachweis/onOffice-Stichprobe:**

## G. 6. Preise & Wissen - 9 Prüfpunkte

### PDF-W-01 - Preisatlas

Referenz-URL: `/de/preisatlas`

- [ ] Der Datumsstempel "Stand September 2026" ist entfernt.
- [ ] Die Seite verwendet exakt `basierend auf Vermittlungsdaten der Immonation`.
- [ ] `einige Vermittlungsdaten` kommt nicht mehr vor.
- [ ] Keine doppelte Fußzeile vorhanden.
- **Status:**
- **Nachweis:**

### PDF-W-02 - Downloads und Markenzertifikat

Referenz-URL: `/de/downloads`

- [x] **Soll:** Das Markenzertifikat wird nicht als Download angeboten.
- [x] Kein Link, Button, Karteninhalt oder Suchtreffer der Website verweist auf die Datei.
- [x] Im Produktions-Build liegt keine öffentlich abrufbare Zertifikatsdatei unter `public/` oder einer statischen URL.
- [x] Bekannte oder vermutete Direkt-URLs liefern nicht die Zertifikatsdatei aus.
- [x] Die interne Quelldatei unter `assets/` darf erhalten bleiben, wird aber nicht deployed.
- **Status:** PASS
- **Nachweis:** Contract-Test `PDF-W-02`; Zertifikatsdatei aus `public/downloads/`, Download-UI, strukturierten Download-Daten sowie `llms.txt` und `llms-full.txt` entfernt. Die interne Quelldatei bleibt ausschließlich im ignorierten `assets/`-Bestand beziehungsweise als nicht öffentliche Rechtsquelle unter `docs/source-material/originals/legal/` erhalten.

### PDF-W-03 - FAQ

Referenz-URL: `/de/faq`

- [x] Genau eine Fußzeile vorhanden.
- [x] Kein footerartiger Doppelblock unmittelbar vor dem globalen Footer.
- **Status:** PASS
- **Nachweis:** Durch `PDF-Ü-01` abgedeckt: globaler Footer-Zähler im vollständigen Route-Katalog und getrennte helle Abschluss-CTA.

### PDF-W-04 - Lexikon

Referenz-URL: `/de/lexikon`

- [x] Genau eine Fußzeile vorhanden.
- [x] Kein footerartiger Doppelblock unmittelbar vor dem globalen Footer.
- **Status:** PASS
- **Nachweis:** Durch `PDF-Ü-01` abgedeckt: globaler Footer-Zähler im vollständigen Route-Katalog und getrennte helle Abschluss-CTA.

### PDF-W-05 - Ratgeber & News

Referenz-URL: `/de/news`

- [ ] **Soll:** Der vorhandene gute Aufbau wird beibehalten.
- [ ] Inhalt wurde gegenüber dem beanstandeten Stand substanziell erweitert.
- [ ] Artikel/Teaser sind nicht nur Platzhalter und beantworten konkrete Eigentümerfragen.
- [ ] Deutsch und Englisch besitzen eine freigegebene, sinnvolle Inhaltstiefe.
- [ ] Andreas bestätigt redaktionell: "nicht mehr zu dünn".
- **Status:**
- **Nachweis/Freigabe:**

### PDF-W-06 - Bodenrichtwert

Referenz-URL: `/de/bodenrichtwert`

- [x] Genau eine Fußzeile vorhanden.
- [x] Kein footerartiger Doppelblock unmittelbar vor dem globalen Footer.
- **Status:** PASS
- **Nachweis:** Durch `PDF-Ü-01` abgedeckt: globaler Footer-Zähler im vollständigen Route-Katalog und getrennte helle Abschluss-CTA.

### PDF-W-07 - Städte & Stadtteile

Referenz-URLs: `/de/staedte`, `/de/stadt/[slug]`, `/de/stadtteil/[city]/[slug]`

- [ ] **Soll:** Der vorhandene gute Aufbau wird beibehalten.
- [ ] Stadt- und Stadtteilseiten besitzen substanziellen lokalen Inhalt statt dünner oder weitgehend duplizierter Texte.
- [ ] Mindestens die veröffentlichten Stadt-Hubs und eine repräsentative Stichprobe der Stadtteile werden geprüft.
- [ ] Genau eine Fußzeile pro Seite vorhanden.
- [ ] Andreas bestätigt redaktionell: "nicht mehr zu dünn".
- **Status:**
- **Nachweis/Stichprobe:**

### PDF-W-08 - Immobilienpreise

Referenz-URL: `/de/markt`

- [ ] Inhalt wurde gegenüber dem beanstandeten Stand substanziell erweitert.
- [ ] "Stand September" und "Stand September 2026" sind entfernt.
- [ ] Die Seite verwendet exakt `basierend auf Vermittlungsdaten der Immonation`.
- [ ] Genau eine Fußzeile vorhanden.
- [ ] Andreas bestätigt redaktionell: "nicht mehr zu dünn".
- **Status:**
- **Nachweis/Freigabe:**

### PDF-W-09 - Immobilienpreise & Trends

Referenz-URL: `/de/marktdaten`

- [ ] "Stand September" und "Stand September 2026" sind entfernt.
- [ ] Genau eine Fußzeile vorhanden.
- [ ] Die Seite wirkt markeneigenständig, redaktionell gestaltet und nicht wie ein einfaches generisches KI-Layout.
- [ ] Informationshierarchie, Typografie, Kartenmuster und visuelle Wiederholungen sind auf Desktop und Mobil geprüft.
- [ ] Bestehende fachliche Inhalte und Funktionen wurden durch die Überarbeitung nicht beschädigt.
- [ ] Andreas erteilt die notwendige visuelle Freigabe.
- **Status:**
- **Nachweis/Freigabe:**

## H. 7. Immonation - 2 Prüfpunkte

### PDF-I-01 - Kontakt & Öffnungszeiten

Referenz-URL: `/de/kontakt`

- [ ] Der als gut bewertete Aufbau bleibt erhalten.
- [ ] Genau eine Fußzeile vorhanden.
- [ ] Das Kontaktformular sendet eine echte Testanfrage an das vereinbarte Ziel.
- [ ] Pflichtfelder, Validierung, Einwilligung, Erfolg, Fehler und Wiederholung funktionieren.
- [ ] Die empfangene Anfrage enthält alle erwarteten Felder und lässt sich der Testübertragung zuordnen.
- [ ] Nach der zuletzt erfolgenden onOffice-Anbindung wird dieser Test erneut durchgeführt.
- **Status:**
- **Nachweis/Testanfrage-ID:**

### PDF-I-02 - Weitere Immonation-Seiten

- [x] **Soll:** Alle weiteren Seiten des Immonation-Bereichs besitzen genau eine Fußzeile.
- [x] Der Prüfbestand entspricht der vollständigen Liste aus PDF-Ü-01.
- [x] Seiten, die im PDF als ansonsten gut bewertet wurden, zeigen keine Regression durch die Footer-Korrektur.
- **Status:** PASS
- **Nachweis:** Der vollständige DE-/EN-Route-Katalog wird auf genau einen globalen Footer, erfolgreiche Antwort, Canonical, Hreflang und Sitemap-Eintrag geprüft. Der gemeinsame Footer-/CTA-Baustein ist zusätzlich bei 390×844 und 1440×900 verifiziert.

## I. 8. Übergreifende Technik-/Launch-Punkte - 4 Prüfpunkte

### PDF-T-01 - Kennzahlen nicht mehr auf Null

- [x] **Soll:** Werte wie Bewertung, Verkäufe, Transaktionsvolumen, Teamgröße und Portalbewertungen werden mit echten freigegebenen Zahlen ausgegeben.
- [x] Im initialen serverseitigen HTML stehen die echten Werte; die Count-up-Animation beginnt nicht sichtbar oder semantisch bei einem falschen Nullwert.
- [x] Prüfung ohne JavaScript zeigt weiterhin die echten Zahlen.
- [x] `0,0/5`, `0+ Verkäufe`, `0 Mio EUR`, `0 Team` und vergleichbare Null-Platzhalter kommen nicht vor.
- [x] Werte stimmen mit der freigegebenen Unternehmenszahlen-Liste überein.
- **Status:** PASS
- **Nachweis/HTML-Auszug:** Der serverseitige Renderer wird per Contract-Test unter anderem mit `4,9/5`, `300+`, `12 Mio. €` und `8 Team` geprüft. Playwright liest das initiale HTML von `/de` und bestätigt die hinterlegten Werte `4,9 / 5`, `60+`, `30 Mio. €`, `8.000+` und `300+` ohne Null-Platzhalter.

### PDF-T-02 - Keine localhost-Basis-URL

- [x] **Soll:** `metadataBase`, Canonical URL, `og:url` und `og:image` verwenden `https://immonationgmbh.de`.
- [x] Produktions-HTML, Sitemap, Robots, JSON-LD und Social-Metadaten werden auf `localhost`, `127.0.0.1` und interne Preview-Domains durchsucht.
- [x] Mindestens Startseite, eine statische Unterseite, eine dynamische Objektartseite, eine Stadtseite, eine Referenzdetailseite und ein Blogartikel werden geprüft.
- [x] OG-Bilder sind über ihre ausgegebene URL öffentlich erreichbar.
- [x] Canonicals und Hreflang-Ziele liefern erfolgreiche Antworten und zeigen auf die richtige lokalisierte Seite.
- **Status:** PASS
- **Nachweis:** Contract- und Playwright-Tests `PDF-T-02` prüfen `SITE.url`, HTML, Canonical, Hreflang, `og:url`, `og:image`, Sitemap und Robots anhand von sechs repräsentativen DE-Routen. Die Produktionsbasis ist fest auf `https://immonationgmbh.de` gesetzt.

### PDF-T-03 - Formulare senden echte Anfragen

- [ ] **Reihenfolge:** Finale Prüfung nach der zuletzt erfolgenden onOffice-Anbindung.
- [ ] Bewertungs-Wizard überträgt eine vollständige Testanfrage.
- [ ] Kontaktformular überträgt eine vollständige Testanfrage.
- [ ] Die Meldung bzw. Logik "keine Anfrage übertragen" ist aus der Produktion entfernt.
- [ ] Erfolg wird nur nach bestätigter Annahme durch das Zielsystem angezeigt.
- [ ] Provider-/onOffice-Fehler führen zu einer ehrlichen Fehlermeldung und keinem stillen Lead-Verlust.
- [ ] Doppelte Übertragung bei Reload oder Doppelklick wird verhindert oder eindeutig behandelt.
- [ ] Empfänger, Datenschutz/Consent, Aufbewahrung und Zuständigkeit sind dokumentiert.
- **Status:**
- **Nachweis/Testanfrage-IDs:**

### PDF-T-04 - Individuelle Meta-Description pro Seite

- [x] **Soll:** Jede indexierbare Seite besitzt eine eigene, keyword-passende Meta-Description.
- [x] Deutsch und Englisch verwenden lokalisierte Beschreibungen.
- [x] Keine siteweite Standardbeschreibung wird unverändert auf allen Seiten wiederholt.
- [x] Stichprobe umfasst alle statischen Hauptseiten sowie dynamische Objektart-, Stadt-, Stadtteil-, Referenz- und Blogseiten.
- [x] Fehlende, leere, doppelte und offensichtlich unpassende Descriptions werden automatisiert gemeldet.
- [x] Beschreibungen stimmen mit dem sichtbaren Seiteninhalt überein und versprechen nichts, was die Seite nicht liefert.
- **Status:** PASS
- **Nachweis/Report:** Playwright-Test `PDF-T-04` durchläuft den vollständigen indexierbaren Route-Katalog in DE und EN und meldet fehlende, zu kurze, doppelte oder nicht lokalisierte Descriptions. Dabei wurden sechs Objektbeschreibungen und zwei Kundenstimmen-Metadaten für EN lokalisiert; unveränderte Originalzitate bleiben als solche erhalten.

## J. Abschlussregression nach onOffice

Diese Reihenfolge respektiert die Festlegung, onOffice zuletzt umzusetzen.

1. [ ] Alle Arbeiten außer onOffice abschließen und die zugehörigen PDF-Punkte vorprüfen.
2. [ ] onOffice-Objektbestand und finale Formularübertragung anbinden.
3. [ ] PDF-K-02, PDF-I-01 und PDF-T-03 end-to-end prüfen.
4. [ ] Danach alle 32 PDF-Punkte erneut mindestens als Smoke-Test durchlaufen.
5. [ ] Deutsche und englische Navigation auf defekte Links prüfen.
6. [ ] Desktop- und Mobilansicht der geänderten Bereiche visuell prüfen.
7. [ ] Produktions-HTML nach `localhost`, Null-Platzhaltern, `einige Vermittlungsdaten`, September-Stempeln und öffentlichem Markenzertifikat durchsuchen.
8. [ ] Abweichungen mit Screenshot, URL, Begründung und Andreas-Freigabe dokumentieren.

## K. Finale Freigabe

- [ ] **32/32 PDF-Prüfpunkte bearbeitet.**
- [ ] **Anzahl PASS:**
- [ ] **Anzahl freigegebene Abweichungen:**
- [ ] **Anzahl FAIL:** `0`
- [ ] **Anzahl BLOCKIERT:** `0`
- [ ] **onOffice zuletzt eingebunden und danach erneut getestet.**
- [ ] **Andreas hat die subjektiven Punkte S-01, S-04, KI-01, V-01, V-02, W-05, W-07, W-08 und W-09 freigegeben.**
- [ ] **Finale Freigabe durch Andreas:**
- **Datum:**
- **Name/Freigabevermerk:**
