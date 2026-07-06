# SEO, AEO & GEO Plan

## Ziel

Die Website soll für lokale Immobilienanfragen in der Metropolregion Nürnberg sichtbar werden und gleichzeitig Antwortmaschinen belastbare, zitierfähige Informationen liefern. Jede neue Seite braucht deshalb klare Suchintention, strukturierte Daten, interne Verlinkung, FAQ und eine konkrete Conversion-Aktion.

## Grundregeln

- Eine kanonische Filesystem-Route pro Seitentyp, lokalisierte URLs über `src/i18n/routing.ts`.
- Jede öffentliche Seite exportiert `generateMetadata` mit `buildMetadata`.
- Jede öffentliche Seite rendert JSON-LD über `<JsonLd />`.
- Neue statische Seiten werden in `src/lib/seo/routes.ts` registriert.
- Neue Inhalte aktualisieren `public/llms.txt` und `public/llms-full.txt`.
- Deutsche Inhalte sind primär, englische Inhalte bleiben vollständig und nicht halb übersetzt.

## Sitemap-Zielstruktur

### Core

| DE | EN | Schema | Priorität |
| --- | --- | --- | --- |
| `/de` | `/en` | Organization, WebSite, LocalBusiness | 1.0 |
| `/de/kontakt` | `/en/contact` | LocalBusiness, BreadcrumbList | 0.8 |
| `/de/ueber-uns` | `/en/about` | Organization, BreadcrumbList | 0.7 |

### Verkäufer

| DE | EN | Zielkeyword DE | Schema |
| --- | --- | --- | --- |
| `/de/immobilie-verkaufen` | `/en/sell-property` | Immobilie verkaufen Nürnberg | Service, FAQPage |
| `/de/immobilienbewertung` | `/en/property-valuation` | Immobilienbewertung Nürnberg | Service, FAQPage |
| `/de/haus-verkaufen` | `/en/sell-house` | Haus verkaufen Nürnberg | Service, FAQPage |
| `/de/wohnung-verkaufen` | `/en/sell-apartment` | Wohnung verkaufen Nürnberg | Service, FAQPage |
| `/de/mehrfamilienhaus-verkaufen` | `/en/sell-apartment-building` | Mehrfamilienhaus verkaufen Nürnberg | Service, FAQPage |
| `/de/immobilie-vermieten` | `/en/rent-out-property` | Immobilie vermieten Nürnberg | Service, FAQPage |
| `/de/projektentwicklung` | `/en/project-development` | Projektentwicklung Nürnberg | Service, FAQPage |
| `/de/immobilienankauf` | `/en/property-acquisition` | Immobilienankauf Nürnberg | Service, FAQPage |
| `/de/revitalisierung` | `/en/revitalization` | Immobilien revitalisieren Nürnberg | Service, FAQPage |

### Käufer

| DE | EN | Ziel | Schema |
| --- | --- | --- | --- |
| `/de/immobilie-kaufen` | `/en/buy-property` | Käuferstrecke | Service, FAQPage |
| `/de/immobilienangebote` | `/en/properties` | Objektübersicht | ItemList, RealEstateListing soweit verfügbar |
| `/de/finanzierung` | `/en/financing` | Käuferqualifizierung | Service, FAQPage |

### Lokal

Die lokalen Seiten werden als skalierbare Content-Struktur geplant. Die finale Version soll Stadt- und Stadtteilseiten für alle bedienten Orte enthalten. Jede Seite braucht echten lokalen Nutzen; dünne Duplikate sind SEO-Risiko.

Priorität 1:

- `/de/immobilie-verkaufen-nuernberg`
- `/de/immobilie-verkaufen-fuerth`
- `/de/immobilie-verkaufen-erlangen`
- `/de/immobilie-verkaufen-zirndorf`
- `/de/immobilie-verkaufen-schwabach`

Priorität 2:

- Stadtteilseiten für Nürnberg, Fürth, Erlangen, Zirndorf, Schwabach und weitere bediente Orte.
- Die Stadtteil-Inventare werden vor Build aus offiziellen Stadt-/Gemeindequellen und OnOffice-/Referenzdaten validiert.

Pattern:

- `/de/immobilie-verkaufen-[ort]`
- `/de/immobilie-verkaufen-[ort]-[stadtteil]`
- `/en/sell-property-[city]`
- `/en/sell-property-[city]-[district]`

Mindestinhalt pro lokale Seite:

- Direktantwort im ersten Absatz.
- Lokale Markteinschätzung.
- Geeignete Objektarten.
- Verkaufsprozess mit lokaler Relevanz.
- Referenzen oder Trust-Elemente aus der Region.
- FAQ mit 4 bis 6 lokalen Fragen.
- CTA zur Bewertung oder Beratung.
- Keine Veröffentlichung ohne indexierbaren Unique Content, lokale Daten oder passende Referenz-/Trust-Signale.

### Content Hubs

| DE | EN | Zweck | Schema |
| --- | --- | --- | --- |
| `/de/ratgeber` | `/en/guides` | Ratgeber-Hub | CollectionPage |
| `/de/ratgeber/[slug]` | `/en/guides/[slug]` | Einzelartikel | Article, BreadcrumbList |
| `/de/news` | `/en/news` | News-Hub | CollectionPage |
| `/de/news/[slug]` | `/en/news/[slug]` | Newsartikel | Article |
| `/de/faq` | `/en/faq` | zentrale Fragen | FAQPage |
| `/de/newsletter` | `/en/newsletter` | Newsletter-Opt-in | WebPage |
| `/de/downloads` | `/en/downloads` | Checklisten und Lead Magnets | CollectionPage |

Content-Strategie: ein gemeinsamer Hub mit getrennten Seitentypen für Ratgeber, News, FAQ, Downloads und Newsletter.

## AEO/GEO Regeln

- Jeder Service beginnt mit einer Antwort auf die implizite Nutzerfrage.
- FAQ-Antworten bleiben kurz: 1 bis 3 Sätze.
- Keine wichtigen Fakten nur in Bildern, Akkordeons ohne SSR oder interaktiven Widgets verstecken.
- `llms.txt` bleibt kurz und linkorientiert.
- `llms-full.txt` enthält die ausführliche Unternehmens-, Leistungs-, Prozess- und Regionalbeschreibung.
- Für wichtige Seiten klare Begriffe statt Marketingfloskeln: Kosten, Dauer, Ablauf, Unterlagen, Provision, Bewertung, Finanzierung.
- Öffentliche Claims von `immonationgmbh.de` dürfen genutzt werden, müssen aber vor Launch live geprüft und je Seite konsistent formuliert werden.

## Strukturierte Daten

Pflicht je Seitentyp:

- Startseite: `Organization`, `WebSite`, `LocalBusiness`.
- Kontakt: `LocalBusiness`.
- Service: `Service`, `FAQPage`, `BreadcrumbList`.
- Ratgeber/News: `Article`, `BreadcrumbList`.
- Referenz/Case Study: `Article` oder `CreativeWork`, zusätzlich Objekt-Fakten als sichtbarer Inhalt.
- Objektübersicht: `ItemList`; konkrete Immobilien-Schemas erst nach Prüfung der Datenqualität aus OnOffice.
- Finanzierungsseite: `Service`, `FAQPage`, ggf. Partnerhinweis.

## Interne Verlinkung

- Startseite verlinkt auf Verkäuferseite, Käuferseite, Referenzen, Ratgeber und Kontakt.
- Verkäuferseite verlinkt auf Bewertung, Haus verkaufen, Wohnung verkaufen, lokale Verkaufsseiten und Referenzen.
- Lokale Seiten verlinken zurück auf zentrale Verkäuferseite und relevante Ratgeber.
- Ratgeberartikel verlinken auf passende Service- und lokale Seiten.
- Referenzen verlinken auf passende Ort- und Objektart-Seiten.
- Objektseiten verlinken auf Finanzierung, Kontakt und passende Ratgeber.

## Trust-Elemente

Verifizierte Trust-Signale sollten prominent und wiederverwendbar sein:

- Google-Bewertungen.
- Trustpilot-Bewertungen.
- Suchkunden-Netzwerk.
- Jährlich vermittelte Immobilien.
- 10-Schritte-Verkaufssystem.
- 30 Mio. Euro jährliches Transaktionsvolumen, sofern live bestätigt.
- Feste Ansprechpartner.
- Regionale Adresse in Zirndorf.
- Video-Testimonials und Verkaufsstories, wenn freigegeben.

Aktuell öffentlich gefundene Claim-Pool-Elemente:

- Kostenlose und unverbindliche Immobilienbewertung.
- Hochwertige Immobilienvideos, realistische 360-Grad-Rundgänge und Social-Media-Marketing.
- Mehr als 5.000 registrierte/vorgemerkte Kaufinteressenten.
- 10-Schritte-Verkaufssystem.
- Über 40 Immobilien pro Jahr laut Startseite.
- Über 60 erfolgreiche Immobilienverkäufe pro Jahr und 30 Mio. Euro jährliches Transaktionsvolumen laut FAQ.
- Google-Bewertungen werden live angezeigt.

Zahlen sind vor Veröffentlichung live zu prüfen, weil Bewertungen und Bestandsdaten volatil sind. Die Claims `40+` und `60+` Verkäufe pro Jahr müssen vor finaler Copy vereinheitlicht werden.

## Quellen & Wettbewerbsnotizen

- Aktuelle Immonation Website: `https://www.immonationgmbh.de/`
- Immobilienangebote: `https://www.immonationgmbh.de/immobilien-angebote`
- Zirndorf Tourismus Eintrag: `https://www.zirndorf-tourismus.de/immonation-gmbh`
- Immopartner als lokale SEO-Referenz: `https://www.immopartner.de/`
- DAHLER als Premium- und Sucherlebnis-Referenz: `https://www.dahlercompany.com/de`
- Evernest als digitale Ratgeber-/Maklerplattform-Referenz: `https://www.evernest.com/de/`

Diese Referenzen sind Inspirationsquellen, keine Copy-Vorlagen. Inhalte, Claims und Zahlen müssen für Immonation selbst belegt werden.
