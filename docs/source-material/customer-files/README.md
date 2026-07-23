# Machine-readable customer-file references

This directory is the normalized, searchable companion to `customer-files/`. The customer originals remain the source of truth; substantive originals are preserved unchanged.

## Artifacts

- `inventory.json`: canonical structured inventory with stable IDs, hashes, file metadata, prior curation status, and curated destinations.
- `inventory.csv`: spreadsheet-friendly projection of the inventory.
- `document-index.csv`: one row for every normalized DOCX/PDF source.
- `documents/`: UTF-8 Markdown extraction of all supplied documents, with source metadata and provenance frontmatter.
- `media/`: hash-linked exports of all embedded DOCX images plus rendered PNGs for every PDF page.
- `visual-content-transcriptions.json`: reviewed visible-text transcriptions for embedded review screenshots and semantic summaries for image/vector-only PDF pages.
- `asset-cross-reference.csv`: source-to-curated-to-public mapping plus current code usage.
- `public-derivative-map.csv`: reviewed mappings for transformed website assets that cannot be matched by byte hash.
- `page-structure-reference.md`: editorial comparison of supplied page proposals with current routes.
- `page-structure-reference.json`: machine-readable version of that comparison.

## Trust model

- `exact-sha256` means byte-identical.
- `verified-high` transformed derivatives were matched by perceptual fingerprint, identity/duration evidence, or direct visual inspection.
- A blank public destination means no verified website derivative was identified; it does not mean the curated source is unusable.
- Extracted copy is supplied material, not automatically approved fact or publish-ready copy.

## Extraction coverage

- 15/15 DOCX files: body paragraphs, tables, headings/lists, headers/footers, hyperlink destinations, document properties, drawing counts, and embedded media.
- 5/5 PDF files: extracted text by page, PDF metadata, and a rendered image for every page.
- 21/21 embedded DOCX images: exported by source hash and manually transcribed where visible text is present.
- 2/2 image/vector-only PDFs: visible text and visual identity are summarized next to the rendered page.

## Rebuild

Run from the repository root with the bundled Python runtime:

```powershell
python scripts/normalize-customer-files.py customer-files .
python scripts/verify-customer-file-references.py customer-files .
```
