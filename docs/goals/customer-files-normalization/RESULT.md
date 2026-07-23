# Customer-files normalization result

Completed: 2026-07-22.

## Delivered

- Complete machine-readable source inventory: `docs/source-material/customer-files/inventory.json` and `.csv`.
- Normalized Markdown corpus for all 20 DOCX/PDF inputs under `docs/source-material/customer-files/documents/`.
- Complete visual-content layer: 21 exported/transcribed DOCX images and nine rendered PDF pages, including semantic summaries for both vector/image-only logo PDFs.
- Source-to-curated-to-public mapping with code usage in `asset-cross-reference.csv`.
- Reviewed transformed-asset evidence in `public-derivative-map.csv`.
- Human- and machine-readable page-structure comparisons in `page-structure-reference.md` and `.json`.
- Reproducible normalization and verification scripts under `scripts/`.

## Cleanup

Removed only these operating-system metadata files:

- `customer-files/Unternehmensgruppe Immonation/Dream Living/.DS_Store`
- `customer-files/Unternehmensgruppe Immonation/Dream Living/Thumbs.db`
- `customer-files/Unternehmensgruppe Immonation/Immonation Captial Holding/.DS_Store`
- `customer-files/Unternehmensgruppe Immonation/IN Beteiligung GmbH/Thumbs.db`

All 104 substantive originals remain byte-identical to the recorded inventory.

## Verification evidence

```text
PASS: 108 inventory records reconcile to 104 preserved sources + 4 removed OS metadata files
PASS: all 104 substantive customer files match recorded sizes and SHA-256 hashes
PASS: all 20 DOCX/PDF sources have non-empty normalized Markdown
PASS: 21 embedded DOCX images have hash-linked visual transcriptions
PASS: all 9 PDF pages are rendered; image/vector-only PDFs have visual summaries
PASS: 109 source/curated/public cross-reference rows resolve
PASS: 11 page-structure entries resolve to source and implementation evidence
PASS: no OS metadata remains and local Markdown links resolve
PASS: JSON and CSV artifacts parse
PASS: normalization and verification scripts compile
PASS: git diff --check (line-ending warnings only)
```

PDF visual spot-checks confirmed that the two handover protocols and EUIPO certificate align with the extracted page content. LibreOffice was unavailable for DOCX rendering; DOCX structure was instead checked through paragraph/table extraction counts and immutable source hashes.

No files were staged, committed, pushed, published, or uploaded externally. Existing unrelated worktree changes were preserved.
