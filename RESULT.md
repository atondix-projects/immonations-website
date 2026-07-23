# EK archive curation result

Completed: 2026-07-17.

## Delivered

- A curated high-resolution media source library at `assets/media-library/`.
- A complete 108-row provenance manifest at `docs/source-material/asset-manifest.csv`.
- Retained non-public source documents at `docs/source-material/originals/`.
- Consolidated findings, document review, reference catalog, publishing backlog, and Viktor Emter interview summary under `docs/source-material/`.
- Canonical updates to requirements, site structure, SEO/AEO/GEO planning, and implementation roadmap.
- Reproducible extract, curate, and verify scripts under `scripts/`.

## Reconciliation

| Outcome | Files |
| --- | ---: |
| Curated media/download/brand assets | 88 |
| Retained source-only documents | 16 |
| Excluded operating-system metadata | 4 |
| Total ZIP files | 108 |

The 104 retained/curated files match the manifest's source size and SHA-256. The original ZIP remains unchanged in `C:\Users\andreas\Downloads\`.

## Key content extracted

- Distinct seller content for houses, apartments, and apartment buildings.
- A reusable FAQ/AEO bank and contact/opening-hours source.
- Twelve situational seller-search themes, with four evidence-backed first priorities.
- Twenty-six reference drafts, 21 property-media folders, and six testimonial leads.
- Four developed testimonial stories, including a locally transcribed six-minute Viktor Emter interview.
- Primary EUIPO trademark evidence and dated F.A.Z. award correspondence.
- Two handover-protocol download sources.

## Verification evidence

```text
PASS: 108 manifest rows reconciled
PASS: 104 retained/curated files matched size and SHA-256
PASS: 4 excluded files have reasons and no destination
PASS: no .DS_Store or Thumbs.db files in curated destinations
PASS: local Markdown links resolve
PASS: archive scripts compile
PASS: git diff --check
```

## Remaining launch gates

- Confirm volatile claims, reference metrics, office data, financing partner, and service-scope conflicts.
- Obtain legal/privacy/licensing approval for testimonials, customer/property imagery, athletes, children, awards, downloads, and sensitive seller-situation copy.
- Choose the canonical logo variant.
- Convert HEIC, optimize large photos, and transcode videos into web derivatives before copying anything into `public/`.
- Decide on Git LFS or external object storage before staging the media library; the Viktor source video alone is about 1.6 GB and is unsuitable for ordinary Git hosting.

No files were staged, committed, pushed, published, or uploaded externally. The pre-existing `src/components/site/home/hero.tsx` change was not modified.
