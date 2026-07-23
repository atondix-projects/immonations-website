# Implementation Roadmap

Ziel: schnellstmöglich zur vollständigen neuen Immonation Website kommen, ohne in den ersten Schritten Designarbeit zu blockieren. Die bestehende Website bleibt bis Launch live.

## Phase 0: Grundlagen ohne Designarbeit

- Requirements aus `PRODUCT.md`, `docs/requirements-decisions.md`, `docs/site-structure.md` und `docs/seo-aeo-geo-plan.md` als verbindlich behandeln.
- Kanonische Logo-/CI-Variante aus `assets/media-library/brand/immonation/` bestimmen und weboptimierte Derivate erzeugen.
- Öffentliche Claims, Rechtstexte, Google-Bewertungen und aktuelle Sitemap der Bestandsseite nochmals crawlen.
- OnOffice API-Zugang prüfen: Auth, Objektdaten, Medien, Status, Referenzen, Filterfelder.
- Resend vorbereiten: Domains, Absender, Templates, Empfänger.
- Consent-Anforderungen für Google, Meta Pixel, GA4, Maps/Reviews, Calendly und ggf. Immonation-Assistent definieren.
- Lokale Stadt-/Stadtteil-Inventare aus offiziellen Quellen und Servicegebiet erstellen.
- EK-Archiv-Freigabematrix abschließen: Claims, Referenzen, Testimonials, Awards, Community-Material und Downloads.

## Phase 1: Daten- und Content-Fundament

- Content-Modelle definieren: Services, Locations, Districts, Listings, References, Guides, News, FAQ, Downloads, Jobs, Partners.
- OnOffice Import/Adapter entwerfen.
- Bewertungs-Wizard fachlich spezifizieren: Schritte, Felder, Validierung, Lead-Ziel, Resend-Mail, spätere CRM-Kompatibilität.
- Immonation-Assistent fachlich spezifizieren: Knowledge Sources, erlaubte Antworten, Lead-Erfassung, Escalation zu Kontakt/Calendly.
- SEO-Routing finalisieren: lokalisierte Pfade, statische Routen, dynamische lokale Routen.
- Legal-/Consent-Grundlage definieren, bevor Tracking oder externe Widgets live gehen.
- Claim-, Asset- und Referenzmodelle mit Quellenhash, Prüfdatum und Freigabestatus definieren; Ausgangsinventar in `docs/source-material/` verwenden.
- Die gelieferten Haus-/Wohnungs-/Mehrfamilienhaus-Texte und FAQ als Quellenmaterial in bilinguale, validierte Inhalte überführen.

## Phase 2: Externe Design Agents

Keine interne UI-Implementierung vor dieser Phase.

Design Agents liefern:

- Homepage-Konzept mit 90 Prozent Verkäufer-Fokus.
- Bewertung-Wizard UX.
- Listing-/Referenzkarten inklusive diagonalem `Verkauft`-Status.
- Verkäuferprozess-Darstellung.
- Käufer-/Finanzierungsstrecke.
- Karriere- und Partnerstrecken.
- Immonation-Assistent-Einstieg auf Keypages und eigener Seite.
- Mobile-first Varianten.
- Design Tokens aus Logo/CI.

## Phase 3: Technische Basis bauen

- Routing und Sitemap-Struktur implementieren.
- `buildMetadata`, JSON-LD und `llms.txt`/`llms-full.txt` Erweiterungen pro neuer Seite.
- OnOffice Listings integrieren.
- Resend Form Handling integrieren.
- Bewertungs-Wizard als priorisierte Conversion bauen.
- Calendly Embed integrieren.
- Consent Layer und Tracking vorbereiten.

## Phase 4: Seller-First Launch-Scope

Priorität für erste sichtbare Umsetzung:

1. Startseite mit Bewertungsfunnel.
2. Immobilienbewertung.
3. Immobilie verkaufen.
4. Haus verkaufen.
5. Wohnung verkaufen.
6. Mehrfamilienhaus verkaufen.
7. Immobilienangebote aus OnOffice.
8. Finanzierung.
9. Referenzobjekte mit `Verkauft`-Status.
10. Kontakt mit Calendly, Telefon, WhatsApp, E-Mail und Rückruf.

## Phase 5: Local SEO Scale

- Stadtseiten für Nürnberg, Fürth, Erlangen, Zirndorf und Schwabach.
- Stadtteilseiten für alle bedienten Orte.
- Lokale FAQ, Markttexte, Referenzen und interne Links je Seite.
- Englische Versionen für alle lokalen Seiten.
- Prüfung gegen Thin-Content-Risiko vor Indexierung.

## Phase 6: Content, Trust, Careers

- Ratgeber/News/FAQ/Downloads/Newsletter Hub.
- Google-Bewertungen live mit Consent.
- Freigegebene Video-Testimonials transkribieren, schneiden, weboptimiert ausspielen und als Textalternative bereitstellen; Rohvideos nicht aus `public/` ausliefern.
- F.A.Z./Immowelt-Award-Bereich nach Rechte- und Methodikprüfung.
- Branded, barrierearme Übergabeprotokolle aus den gelieferten PDF-Quellen erstellen.
- Karriere für Festangestellte.
- Freie Vertriebspartner.
- Tippgeber.
- Unternehmensgruppe: Projektentwicklung, Ankauf, Revitalisierung, Investment-Kontext.

## Phase 7: Finalisierung

- Vollständige Sitemap und hreflang prüfen.
- Alle Claims live validieren und Konflikte bereinigen.
- Rechtstexte final übernehmen/aktualisieren.
- Consent, GA4, Meta Pixel, Calendly, Google Widgets testen.
- Typecheck, Lint, Build, Sitemap, Robots, OG-Images prüfen.
- Bestehende Website erst nach vollständigem QA und Deployment-Freigabe ablösen.
