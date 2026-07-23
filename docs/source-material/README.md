# EK source archive

Stand: 2026-07-17.

This directory documents the curation of `ZZZ EK Themen -20260717T182100Z-1-002.zip`. The archive remains the immutable source; the repository contains rewritten planning material, retained source documents, and a reusable media library.

## What was created

- [Content findings](./content-findings.md): consolidated facts, proposed content, contradictions, and approval gates.
- [Document review](./document-review.md): review status and disposition for every DOCX/PDF source.
- [Reference catalog](./reference-catalog.md): 26 supplied reference cases plus testimonial-specific stories.
- [Publishing backlog](./publishing-backlog.md): implementation-ready content opportunities ordered by value and evidence readiness.
- [Asset manifest](./asset-manifest.csv): one row for each of the 108 ZIP files, including source path, size, SHA-256, outcome, curated destination, and notes.
- [Machine-readable customer-file references](./customer-files/): full normalized Markdown for all 20 documents, a current-folder inventory, source-to-curated-to-public asset mappings, and a page-structure comparison against implemented routes.
- [Retained originals](./originals/): DOCX and legal PDF sources that should not be publicly served.
- [Media library](../../assets/media-library/): high-resolution source media organized for reuse.

## Evidence labels

- **Documented fact:** directly evidenced by a supplied primary document, such as the EUIPO certificate.
- **Supplied claim:** stated in source copy, but must be checked against current/live evidence before publication.
- **Draft copy:** useful wording or page structure, not an approved factual statement.
- **Open decision:** conflicts with prior requirements or needs legal, privacy, licensing, or business approval.

## Asset-use rule

The files under `assets/media-library/` are source assets, not automatic publishing approval. Before copying a derivative into `public/`, verify consent/licensing, remove visible personal data, create a web-sized derivative, and record alt text and attribution where needed. HEIC sources require conversion. Large videos require transcoding and external/video-CDN delivery; the 1.6 GB Viktor Emter interview must not be shipped directly with the Next.js application.

## Re-running the import

Use the bundled workspace Python runtime:

```powershell
python scripts/curate-ek-source-assets.py <archive.zip> <repo-root>
python scripts/extract-ek-source-text.py <archive.zip> <review-output>
python scripts/verify-ek-source-assets.py docs/source-material/asset-manifest.csv <repo-root>
```

The curation script writes stable ASCII-safe names and regenerates the manifest. Review any changed hashes or destinations before replacing editorial work.
