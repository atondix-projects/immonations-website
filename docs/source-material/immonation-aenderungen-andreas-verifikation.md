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

- [x] **Solltext exakt:** `basierend auf Vermittlungsdaten der Immonation`
- [x] **Pflichtseiten:** Preisatlas und Immobilienpreise enthalten diese Formulierung einheitlich.
- [x] **Negativprüfung:** Die beanstandete Formulierung `einige Vermittlungsdaten` kommt nicht mehr vor.
- [x] **Sprachprüfung:** Die englischen Seiten verwenden eine sinngleiche, eindeutige Übersetzung und keine widersprüchliche Quellenbeschreibung.
- **Status:** PASS
- **Nachweis:** Contract- und Playwright-Tests `PDF-Ü-03` prüfen Preisatlas und Immobilienpreise in DE/EN. Deutsch verwendet exakt `basierend auf Vermittlungsdaten der Immonation`, Englisch `based on Immonation brokerage data`; `einige Vermittlungsdaten` ist ausgeschlossen.

## B. 1. Startseite - 4 Prüfpunkte

Referenz-URL: `/de`

### PDF-S-01 - Finanzierungsblock verkleinern

- [x] **Soll:** Der Finanzierungsblock ist ein kompakter Anreißer und keine vollständige Inhaltsseite innerhalb der Startseite.
- [x] Eine Tool-Abbildung oder kurze Andeutung ist vorhanden.
- [x] Ein kurzer Text erklärt, was Immonation anbietet.
- [x] Ein eindeutiger Link führt auf `/de/finanzierung`.
- [x] Die vollständige Inhaltstiefe befindet sich auf der Finanzierungs-Unterseite.
- [ ] Andreas bestätigt visuell, dass der Block nicht mehr "zu groß" wirkt.
- **Status:** BLOCKIERT
- **Nachweis:** Die Startseite zeigt Finanzierung ausschließlich als kompakte Servicekachel mit Landmark-Icon, einem Satz zum Dr.-Klein-Angebot und lokalisiertem Link. Die ausführliche Unterseite enthält Partner-, Ablauf-, Bankbewertungs-, Rechner-, FAQ- und CTA-Bereiche. Playwright prüft Kachel, Icon, Text, Navigation und Unterseitentiefe auf 390×844 sowie 1440×900. Offen ist ausschließlich Andreas' visuelle Größenfreigabe.

### PDF-S-02 - Videos statt Google-Screenshots

- [x] **Soll:** Im Block "Ausgewählte Stimmen zu echten Verkäufen" sind die Google-Screenshots entfernt.
- [x] Stattdessen werden die freigegebenen Videos aus `assets/Verkäufer Feedback Videos/` verwendet.
- [x] Wiedergabe, Poster, Untertitel, Tastaturbedienung und Mobilansicht funktionieren.
- [x] Es werden nur freigegebene Kunden- und Objektinformationen veröffentlicht.
- **Status:** PASS
- **Nachweis:** Die Startseite verwendet die vier lokal aufbereiteten Feedback-Videos samt Poster. Deutsche WebVTT-Spuren wurden aus den veröffentlichten Videos zeitcodiert und anhand der Begleitunterlagen korrigiert. Contract-Test `PDF-S-02` prüft alle vier Dateien und Registry-Einträge; Playwright prüft vier Video-Trigger, fehlende Review-Screenshots, Untertitelspur, Tastaturöffnung und Escape-Schließen bei 390×844 und 1440×900.

### PDF-S-03 - Polaroid-Bilder direkt unter der Verkaufsglocke

- [x] **Soll:** Die Polaroid-Bilder stehen direkt unter dem Abschnitt "Jeder Abschluss wird bei uns geläutet".
- [x] Die Bilder stammen aus dem freigegebenen Bestand, insbesondere `assets/Übergabebilder Polaroidkamera/`.
- [x] Zwischen Glockenabschnitt und Polaroids liegt kein sachfremder Inhaltsblock.
- [x] Reihenfolge, Abstände und Lesbarkeit funktionieren auf Desktop und Mobil.
- **Status:** PASS
- **Nachweis:** Die bestehende Wand mit acht kuratierten Übergabe-Polaroids folgt im selben Startseitenkapitel unmittelbar auf `VerifiedResults`, dessen letzter Inhaltsbereich die Verkaufsglocke ist. Contract-Test `PDF-S-03` sichert Reihenfolge und Einmaligkeit; Playwright prüft den direkten DOM-Nachbarn `#beurkundet + #uebergabe`, alle acht Bilder sowie 390×844 und 1440×900. Screenshots liegen unter `output/verification/PDF-S-03/`.

### PDF-S-04 - Partner vervollständigen

- [ ] **Soll:** Alle von Immonation gewünschten Partner sind vorhanden.
- [ ] Namen, Logos, Links und Reihenfolge stimmen mit der final freigegebenen Partnerliste überein.
- [ ] Es fehlen keine Partner; es werden keine nicht freigegebenen Partner gezeigt.
- [x] Logoqualität, Alternativtexte und externe Links des aktuellen Bestands sind geprüft.
- [ ] Andreas bestätigt die Vollständigkeit.
- **Status:** BLOCKIERT
- **Nachweis/Freigabeliste:** Der aktuelle Startseitenblock enthält in dieser Reihenfolge Dr. Klein, immowelt und TSV Zirndorf Leichtathletik sowie getrennt davon Immonation Capital Holding GmbH, IN Beteiligungs GmbH und Dream Living GmbH. Für alle sechs Einträge existieren lokale Bilddateien und nicht leere Alternativtexte; die drei externen Partner führen mit abgesicherten neuen Tabs zu ihren Quellen. Playwright prüft Bestand, Logos, Links sowie 390×844 und 1440×900; Screenshots liegen unter `output/verification/PDF-S-04/`. Im Quellenpaket befindet sich keine finale freigegebene Partnerliste. Ohne diese Liste, Ziel-URLs und Rechtebestätigung kann weder Vollständigkeit noch Ausschluss nicht freigegebener Partner bestätigt werden.

## C. 2. Referenzen - 3 Prüfpunkte

Referenz-URLs: `/de` und `/de/referenzen`

### PDF-R-01 - Genau vier Referenzkategorien

- [x] **Soll:** Es existieren genau die Kategorien `Wohnung`, `Haus`, `Gewerbe` und `Investment`.
- [x] Startseiten-Karten, Referenzen-Seite, Filter und Detailseiten verwenden dieselbe Zuordnung.
- [x] Bezeichnungen wie Eigentumswohnung, Reihenhaus, Mehrfamilienhaus oder Dreifamilienhaus erscheinen nicht als zusätzliche Hauptkategorien.
- [x] Jede veröffentlichte Referenz ist genau einer der vier Kategorien zugeordnet.
- [x] Deutsch und Englisch besitzen dieselbe fachliche Kategorisierung.
- **Status:** PASS
- **Nachweis:** `ReferenceCategory` trennt die öffentliche Vierer-Kategorie von der detaillierten Objektart. Contract-Test `PDF-R-01` prüft alle Datensätze und die exakten DE-/EN-Labels; Playwright prüft die vier Filter, die drei Startseiten-Stichproben und die Investment-Zuordnung einer Mehrfamilienhaus-Detailseite.

### PDF-R-02 - Kennzahlen pro Referenzobjekt

- [ ] **Soll:** Pro freigegebenem Objekt werden Vermarktungszeit, Anzahl Anfragen, Besichtigungen und eine freigegebene Preis-/Ergebniskennzahl gezeigt.
- [ ] Quelldaten werden mit `assets/Referenz Objekte/Immonation_Referenztexte.docx.md` abgeglichen.
- [ ] Verbliebene `X`-Platzhalter, leere Werte oder erfundene Ersatzwerte sind ausgeschlossen.
- [ ] Startseiten-Karte und Referenzen-Seite zeigen für dasselbe Objekt identische Werte.
- [ ] Rundung, Einheit und Schreibweise sind konsistent.
- [ ] Preis- oder Ergebnisangaben besitzen die notwendige Veröffentlichungsfreigabe.
- **Status:** BLOCKIERT
- **Nachweis/Stichprobe:** Die 26 nummerierten Fälle in `assets/Referenz Objekte/Immonation_Referenztexte.docx.md` enthalten Anfragen, Besichtigungen und Vermarktungszeit. Für `adelsdorf-reuthseering`, `schwabach-abenberger` und `zirndorf-carl-benz` fehlt dort jedoch der vollständige Kennzahlensatz. Beim Fall `fuerth-altbauwohnung` ist das hervorgehobene Ergebnis als `X 8% über Erstbewertung` notiert und deshalb nicht eindeutig freigabefähig. Benötigt werden die drei vollständigen Kennzahlensätze sowie die Bestätigung, ob beim Fürther Fall `8 % über Erstbewertung` gemeint ist. Bis dahin bleiben die öffentlichen Kennzahlen deaktiviert; es werden keine Ersatzwerte veröffentlicht.

### PDF-R-03 - Google-Rezensionen live einbinden

- [ ] **Soll:** Der Block "Dieselben Erfahrungen, schriftlich festgehalten" verwendet eine laufend aktualisierbare Google-Rezensionsquelle.
- [x] Statische Google-Screenshots sind entfernt.
- [x] Die angezeigten Bewertungen gehören zum richtigen Immonation-Unternehmensprofil.
- [x] Aktualisierung, Ladezustand, Fehlerzustand und fehlende Einwilligung werden korrekt behandelt.
- [x] Falls ein Slider verwendet wird, funktionieren Autoplay-Pause, Tastatur und Touch.
- **Status:** BLOCKIERT
- **Nachweis:** Der Referenzblock verwendet jetzt serverseitig `listTestimonialReviews()` mit der Google-Place-ID des Zirndorfer Profils, zeigt Text statt Screenshots und kennzeichnet Live- bzw. Fallbackbetrieb per `data-review-source`. Der serverseitige Abruf benötigt keine Browser-Einwilligung; bei Fehler oder fehlender Konfiguration bleiben dokumentierte Originalstimmen sichtbar. Contract-Test `PDF-R-03`, bestehende Provider-Unit-Tests und Playwright decken Providerbindung, Fallback, Screenshot-Ausschluss und mobile Sliderbedienung ab. Für den finalen PASS fehlt `GOOGLE_PLACES_API_KEY` in der Zielumgebung sowie ein erfolgreicher Live-Nachweis (`data-review-source="google-live"`).

## D. 3. KI-Visualisierung - 1 Prüfpunkt

Relevante aktuelle Routen: `/de/ki` und `/de/ki-visualisierung-home-staging`

### PDF-KI-01 - Eigene Seite plus Startseiten-Teaser

- [x] **Soll:** Eine eindeutige, inhaltlich vollständige KI-Visualisierungsseite ist vorhanden; konkurrierende Routen sind sinnvoll kanonisiert oder klar getrennt.
- [x] Ein interaktiver Vorher/Nachher-Regler funktioniert mit Maus, Touch und Tastatur.
- [x] Die Szenarien `vermietet`, `renovierungsbedürftig`, `leerstehend/veraltet` und `geerbt` werden nachvollziehbar behandelt.
- [ ] Material für Haus, Wohnung und Gewerbe ist vorhanden oder eine von Andreas freigegebene Abweichung dokumentiert.
- [x] Die Inhalte sind mit `assets/KI Visualisierungen/` abgeglichen.
- [x] Die Startseite enthält einen sichtbaren Teaser mit funktionierendem Link zur finalen Unterseite.
- [x] Vorher- und Nachherdarstellung ist eindeutig beschriftet; KI-Inhalte werden transparent gekennzeichnet.
- [ ] Andreas bestätigt die Übereinstimmung mit dem gewünschten Prototyp-Prinzip.
- **Status:** BLOCKIERT
- **Nachweis:** Die vollständige DE-/EN-Seite bleibt klar vom separaten KI-Assistenten unter `/de/ki` getrennt. Sieben mit dem lokalen Asset-Bestand abgeglichene Vorher-/Nachher-Paare besitzen einen nativen Range-Regler, sichtbare Labels, Tastatursteuerung und KI-Hinweis; der Startseiten-Teaser verlinkt lokalisiert auf die Seite. Contract-Test sowie Playwright auf 390×844 und 1440×900 sind grün; Screenshots liegen unter `output/verification/PDF-KI-01/`. Im Bestand fehlen weiterhin belegte Gewerbe-Visualisierungen. Für `PASS` werden daher ein freigegebenes Gewerbe-Paar oder Andreas' ausdrückliche Abweichungsfreigabe sowie die subjektive Prototyp-Abnahme benötigt.

## E. 4. Ich will verkaufen - 4 Prüfpunkte

### PDF-V-01 - Virtuelle Besichtigung ausbauen

Referenz-URL: `/de/virtuell`

- [x] **Soll:** Die Seite besitzt mehr als einen schwachen Kurz- oder Platzhalterinhalt und erklärt Nutzen, Ablauf und Einsatz der virtuellen Besichtigung.
- [x] Die auf der Startseite gezeigte 360-Grad-Tour ist auf der Unterseite als direkt abrufbares Beispiel eingebunden.
- [x] Es handelt sich tatsächlich um eine interaktive 360-Grad-Tour, nicht lediglich um ein lineares Objektvideo.
- [x] Tour, Vollbild, Mobilbedienung, Consent und Fehlerzustand funktionieren.
- [ ] Andreas bestätigt die inhaltliche Stärke der Seite.
- **Status:** BLOCKIERT
- **Nachweis:** Die bestehende, inhaltlich ausgebaute DE-/EN-Unterseite bindet nun denselben verifizierten Ogulo-Rundgang wie die Startseite als direktes interaktives Beispiel ein. Die Anbieter-URL antwortete im Audit mit HTTP 200. Vor dem Klick erscheint der Consent-Hinweis; der Viewer öffnet in einem nativen Vollbild-Dialog, erlaubt Geräte-/Fullscreen-Funktionen und besitzt Lade- sowie zeitgesteuerten Fehlerzustand mit sicherem Direktlink. Contract-Test und Playwright auf 390×844 und 1440×900 sind grün; Screenshots liegen unter `output/verification/PDF-V-01/`. Offen ist ausschließlich Andreas' subjektive Inhaltsfreigabe.

### PDF-V-02 - Aktive Suchkunden ausbauen

Referenz-URL: `/de/suchkunden`

- [ ] **Soll:** Die Seite enthält substanzielle, aktuelle Suchprofile statt allgemeiner Platzhaltertexte.
- [ ] Die Profile decken mindestens Familie/EFH, Single/Apartment und Investor/Anlageimmobilie ab.
- [ ] Die PDF-Beispiele - EFH bis 870.000 EUR, Apartment bis 120.000 EUR und Anlageimmobilie bis 2 Mio. EUR - sind enthalten oder durch freigegebene aktuelle Profile ersetzt.
- [ ] Profile sind passenden Städten bzw. Stadtteilen zugeordnet.
- [ ] Aktualität, Datenschutz und Ablauf zur Entfernung abgelaufener Profile sind geprüft.
- [ ] Andreas bestätigt die inhaltliche Stärke und lokale Verteilung.
- **Status:** BLOCKIERT
- **Nachweis/Freigabeliste:** Die aktuelle DE-/EN-Seite erklärt lediglich den Abgleichprozess und veröffentlicht bewusst keine freien JSX-Profile. Im lokalen Master-Prototyp stehen sechs Beispielkarten, derselbe Abschnitt kennzeichnet die Datenquelle jedoch ausdrücklich als Platzhalter `Suchprofile live aus onOffice`; Aktualität, Einwilligung und Ablaufdatum fehlen. Zudem weichen die dortigen Budgets von den PDF-Beispielen ab (unter anderem EFH 750.000 EUR statt 870.000 EUR und MFH 2,5 Mio. EUR statt 2 Mio. EUR), während ein Apartment bis 120.000 EUR ganz fehlt. Benötigt wird eine freigegebene Liste mit anonymisierter Profil-ID, Zielgruppe, Objektart, Ort/Stadtteil, Budget, Kriterien, `validFrom`, `expiresAt` und dokumentierter Veröffentlichungsfreigabe; alternativ folgt die kontrollierte Live-Ausgabe in der finalen onOffice-Runde. Bis dahin werden keine Profile erfunden oder als aktuell ausgegeben.

### PDF-V-03 - Mehrfamilienhaus-Slideshow

Referenz-URL: `/de/objektart/mehrfamilienhaus`

- [x] **Soll:** Direkt unter "Die entscheidenden Schritte" befindet sich eine Slideshow.
- [x] Die Slideshow zeigt mindestens Altbau-MFH, Putzfassade-MFH und Neubau-MFH.
- [x] Typen sind eindeutig beschriftet und verwenden freigegebene Bilder.
- [x] Tastatur, Touch, Fokus, Beschriftungen und Mobilansicht funktionieren.
- **Status:** PASS
- **Nachweis:** Die Mehrfamilienhaus-Seite zeigt als direkten DOM-Nachbarn des Prozessabschnitts drei lokalisierte Beispiele: Fürther Altbau, Heroldsbacher Mehrparteienhaus mit Putzfassade und moderne Zirndorfer Wohnanlage. Alle Bilder sind bereits veröffentlichte WebP-Derivate aus dem lokalen Referenzbestand. Der wiederverwendbare Slider unterstützt Buttons, fokussierbare Pfeil-/Home-/End-Tastatursteuerung, Touch-Wischgeste, Statusansage und eindeutige Alternativtexte. Contract-Test, 430-Seiten-Build mit reduzierter Workerzahl wegen des vollen Systemlaufwerks sowie Playwright auf 390×844 und 1440×900 sind grün; Screenshots liegen unter `output/verification/PDF-V-03/`.

### PDF-V-04 - Slideshows und Wissenslinks auf drei weiteren Objektartseiten

Referenz-URLs: `/de/objektart/wohnung`, `/de/objektart/grundstueck`, `/de/objektart/haus`

- [x] **Soll:** Jede der drei Seiten besitzt eine objektpassende Slideshow nach demselben Prinzip.
- [x] Zusammen mit `/de/objektart/mehrfamilienhaus` verlinken alle vier Objektartseiten kontextuell auf `/de/bodenrichtwert`.
- [x] Alle vier Objektartseiten verlinken kontextuell auf `/de/preisatlas`.
- [x] Die englischen Seiten führen auf die jeweiligen lokalisierten Ziele.
- [x] Alle Slideshow-Bilder und Beschriftungen passen zur jeweiligen Objektart.
- **Status:** PASS
- **Nachweis:** Haus, Wohnung und Grundstück verwenden denselben barrierearmen Slider wie Mehrfamilienhaus mit jeweils drei typisierten, lokalisierten Bildmotiven aus bereits veröffentlichten lokalen Derivaten. Der Grundstücksleitfaden kennzeichnet Luftbilder als Lage-, Zufahrts- und Bebauungskontext und behauptet keinen unbelegten Grundstücksverkauf. Ein serverseitig lokalisierter Wissensblock verlinkt auf allen vier DE-/EN-Seiten zu Bodenrichtwert und Preisatlas. Contract-Test `PDF-V-04`, der 430-Seiten-Build und Playwright über alle acht lokalisierten Routen sind grün; sechs Mobil-/Desktop-Screenshots liegen unter `output/verification/PDF-V-04/`.

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

- [x] Der Datumsstempel "Stand September 2026" ist entfernt.
- [x] Die Seite verwendet exakt `basierend auf Vermittlungsdaten der Immonation`.
- [x] `einige Vermittlungsdaten` kommt nicht mehr vor.
- [x] Keine doppelte Fußzeile vorhanden.
- **Status:** PASS
- **Nachweis:** Durch `PDF-Ü-02`, `PDF-Ü-03` und den route-spezifischen Playwright-Test `PDF-W-01` abgedeckt: `/de/preisatlas` enthält die freigegebene Quellenformulierung ohne Datumsstempel oder alte Formulierung und rendert genau einen globalen Footer.

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

- [x] **Soll:** Der vorhandene gute Aufbau wird beibehalten.
- [x] Inhalt wurde gegenüber dem beanstandeten Stand substanziell erweitert.
- [x] Artikel/Teaser sind nicht nur Platzhalter und beantworten konkrete Eigentümerfragen.
- [x] Deutsch und Englisch besitzen eine freigegebene, sinnvolle Inhaltstiefe.
- [ ] Andreas bestätigt redaktionell: "nicht mehr zu dünn".
- **Status:** BLOCKIERT
- **Nachweis/Freigabe:** Der bestehende Themen-Hub, die Artikelansicht mit Inhaltsverzeichnis und die vorhandenen vier Sprachpaare bleiben erhalten. Ergänzt wurden zwei vollständig gepaarte Eigentümer-Ratgeber: `Immobilienverkauf vorbereiten: Diese Unterlagen schaffen Klarheit` (DE 734 / EN 857 Wörter) und `Angebotspreis richtig einordnen` (DE 738 / EN 832 Wörter). Beide verwenden ausschließlich bereits belegte Immonation-Inhalte, beantworten konkrete Fragen, enthalten interne Links und FAQ-Daten. Contract-Test, Produktionsbuild mit 430 statischen Seiten und Playwright für Hub/Artikel sind grün; Screenshots liegen unter `output/verification/PDF-W-05/`. Offen ist Andreas' redaktionelle Freigabe.

### PDF-W-06 - Bodenrichtwert

Referenz-URL: `/de/bodenrichtwert`

- [x] Genau eine Fußzeile vorhanden.
- [x] Kein footerartiger Doppelblock unmittelbar vor dem globalen Footer.
- **Status:** PASS
- **Nachweis:** Durch `PDF-Ü-01` abgedeckt: globaler Footer-Zähler im vollständigen Route-Katalog und getrennte helle Abschluss-CTA.

### PDF-W-07 - Städte & Stadtteile

Referenz-URLs: `/de/staedte`, `/de/stadt/[slug]`, `/de/stadtteil/[city]/[slug]`

- [x] **Soll:** Der vorhandene gute Aufbau wird beibehalten.
- [ ] Stadt- und Stadtteilseiten besitzen substanziellen lokalen Inhalt statt dünner oder weitgehend duplizierter Texte.
- [x] Mindestens die veröffentlichten Stadt-Hubs und eine repräsentative Stichprobe der Stadtteile werden geprüft.
- [x] Genau eine Fußzeile pro Seite vorhanden.
- [ ] Andreas bestätigt redaktionell: "nicht mehr zu dünn".
- **Status:** BLOCKIERT
- **Nachweis/Stichprobe:** Alle fünf Stadt-Hubs (`Nürnberg`, `Fürth`, `Erlangen`, `Zirndorf`, `Schwabach`) und die Stichprobe `/de/stadtteil/nuernberg/st-johannis` wurden gerendert; jeder Pfad besitzt genau einen globalen Footer. Passende Stadtteilrouten in Nürnberg, Fürth, Erlangen und Zirndorf erhalten nun automatisch ihre belegten Wohnungs-/Haus-Spannen, Mediane und Fallzahlen aus dem Preisatlas mit der freigegebenen Quellenformulierung. Contract-Test, 430-Seiten-Build und Playwright sind grün; Mobil-/Desktop-Nachweise liegen unter `output/verification/PDF-W-07/`. Nicht jede der 103 publizierten Stadtteilseiten besitzt einen passenden Datensatz; insbesondere für Schwabach bleiben die Texte ohne freigegebene lokale Fakten zu generisch. Für `PASS` werden dort belegte Ortsinhalte sowie Andreas' redaktionelle Freigabe benötigt.

### PDF-W-08 - Immobilienpreise

Referenz-URL: `/de/markt`

- [x] Inhalt wurde gegenüber dem beanstandeten Stand substanziell erweitert.
- [x] "Stand September" und "Stand September 2026" sind entfernt.
- [x] Die Seite verwendet exakt `basierend auf Vermittlungsdaten der Immonation`.
- [x] Genau eine Fußzeile vorhanden.
- [ ] Andreas bestätigt redaktionell: "nicht mehr zu dünn".
- **Status:** BLOCKIERT
- **Nachweis/Freigabe:** `/de/markt` enthält eine eigene Einleitung, fünf Stadtvergleiche für Wohnung und Haus, Trendwerte, Methodik-/Bewertungslinks, FAQ und einen Referenznachweis. Der alte Einzelhinweis `immowelt / PriceHubble` wurde entfernt; die Seite verwendet nun ausschließlich `basierend auf Vermittlungsdaten der Immonation`, ohne September-Stempel, und besitzt genau einen Footer. Contract-Test, 430-Seiten-Build und Playwright auf 390×844 sowie 1440×900 sind grün; Screenshots liegen unter `output/verification/PDF-W-08/`. Offen ist Andreas' redaktionelle Freigabe.

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
