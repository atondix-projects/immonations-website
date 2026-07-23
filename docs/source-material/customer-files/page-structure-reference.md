# Supplied page structures vs. current website

Stand: 2026-07-22. This is an editorial routing map, not approval to publish source claims. The machine-readable source of this table is [`page-structure-reference.json`](./page-structure-reference.json).

| Supplied concept | Current destination | Status | Reusable source structure | Main gap or gate |
| --- | --- | --- | --- | --- |
| Haus verkaufen | `/de/immobilie-verkaufen/haus` | Implemented, adapted | SEO brief -> answer -> sale factors -> documents -> FAQ -> internal links | Keep unsupported price and duration claims out |
| Wohnung verkaufen | `/de/immobilie-verkaufen/apartment` | Implemented, adapted | SEO brief -> WEG logic -> buyer groups -> documents -> FAQ -> links | Review tenancy and service-scope statements |
| Mehrfamilienhaus verkaufen | `/de/immobilie-verkaufen/apartment-building` | Implemented, adapted | SEO brief -> income logic -> discreet sale -> documents -> FAQ -> links | Verify investor-network and tax wording |
| Zentrale FAQ | `/de/faq` | Implemented, adapted | Seven question groups with concise answer-shaped copy | Legal/tax and volatile company claims need provenance |
| Öffnungszeiten & Anfahrt | `/de/kontakt` | Partial | Office intro -> hours table -> car/transit/bike -> FAQ | Verify hours and live transit details before integration |
| Echte Bewertungen erkennen | No route | Partial via homepage reviews | Rating proof -> credibility checklist -> seller relevance -> FAQ | Dated live evidence and UWG review required |
| Bodenrichtwert | No route | Planned | Answer -> official values table -> method -> sale-price distinction -> FAQ | Every supplied number is a placeholder; official dated sources required |
| 12 Verkäufer-Situationen | No routes | Planned | Situation answer -> options -> documents/risks -> evidence -> FAQ -> CTA | Start with four strong topics; avoid thin or exploitative pages |
| Referenzobjekte | `/de/referenzen` | Partial | Property -> situation -> challenge -> approach -> result -> quote -> media | Metrics, consent, property rights, and privacy |
| Übergabeprotokolle | `/de/downloads` | Partial | Parties/property -> meters -> keys -> condition -> signatures | Sources need branded accessible redesign and legal review |
| Kundenstimmen | Homepage modules | Partial | Situation -> challenge -> approach -> result -> quote/interview -> media | Written consent and claim verification per story |

## Highest-value next uses

1. Use the normalized source documents as traceable editorial inputs, not as copy to paste verbatim.
2. Finish the contact-page enrichment after business data and transport details are verified.
3. Create the ground-value guide only after official, dated BORIS/Gutachterausschuss sourcing.
4. Develop the first four seller-situation pages: inheritance, renovation backlog, tenanted property, and separation.
5. Promote reference and testimonial stories only when their individual consent and metric gates are recorded.

## Source paths

Every row above links back to stable `cf-*` IDs and normalized document paths in [`document-index.csv`](./document-index.csv). Full field-level provenance, current curated destinations, public derivatives, and code usage are in [`asset-cross-reference.csv`](./asset-cross-reference.csv).
