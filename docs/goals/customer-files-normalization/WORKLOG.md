# Worklog

## 2026-07-22

- Read the repository instructions and the explicitly invoked `ultragoal` skill.
- Inventoried `customer-files/`: 108 files, 2,122,759,974 bytes.
- Confirmed it matches the previously curated EK source set by file totals and aggregate size.
- Reviewed the existing goal/result artifacts, source-material documentation, asset manifest, and curation scripts.
- Identified the missing outputs: full normalized document corpus, direct current-folder inventory, curated/public/code cross-reference, and source-backed page-structure map.

Next: activate the goal, implement normalization and reconciliation, then verify the outputs.

### Normalization and cross-reference

- Activated the durable goal.
- Added `scripts/normalize-customer-files.py` to hash all customer files, extract DOCX/PDF sources to structured Markdown, capture image/video/document metadata, reconcile the prior archive manifest, and generate source-to-curated-to-public mappings.
- Generated a 108-record JSON/CSV inventory retaining the original Unicode paths and assigning stable hash-based `cf-*` IDs.
- Generated 20 UTF-8 Markdown documents with provenance frontmatter, headings, lists, tables, and PDF page boundaries.
- Reviewed transformed website derivatives and recorded 24 verified public mappings, including 15 reference images, testimonial media, partner marks, and two Immonation logo variants.
- Generated 109 cross-reference rows; one source logo correctly maps to two public variants.

### Page structure reconciliation

- Compared supplied seller pages, FAQ, contact/directions, review-credibility, ground-value, seller-situation, reference, download, and testimonial structures with current routes, content registries, and website assets.
- Wrote both human-readable and JSON page-structure references with source IDs, route status, implementation evidence, next actions, and publication gates.

### Cleanup and verification

- The first verifier run failed only on the four known OS metadata files.
- Removed exactly two `.DS_Store` and two `Thumbs.db` files from `customer-files/`; no substantive source was renamed, modified, or deleted.
- The final verifier reconciled 108 inventory records to 104 preserved substantive sources plus four recorded removals.
- Visually checked the rendered first pages of both handover protocols and the EUIPO certificate against extracted text. DOCX visual rendering was unavailable because LibreOffice is not installed; structural extraction was verified through `python-docx` paragraph/table counts and source hashes.
- Both scripts compile, JSON/CSV artifacts parse, local Markdown links resolve, and `git diff --check` passes (line-ending warnings only).

### Follow-up extraction-fidelity audit

- Confirmed the corpus contains one Markdown file for every 15 DOCX and five PDF sources.
- Audited DOCX package parts for headers, footers, hyperlinks, text boxes, drawings, comments, and embedded media.
- Found and closed two omissions from the initial body-text pass: one external hyperlink target and 21 embedded Google-review screenshots.
- Exported all 21 embedded images, visually transcribed their reviewer/rating/date/text fields into a hash-keyed JSON record, and embedded those transcriptions in the corresponding Markdown.
- Rendered all nine PDF pages into linked PNGs and added semantic visible-text summaries for the two vector/image-only logo PDFs.
- Extended the normalizer to capture DOCX core properties, hyperlink targets, drawing/media counts, PDF properties, and rendered pages.
- Strengthened the verifier to compare DOCX paragraphs and table cells against Markdown, require every embedded image transcription, and require page renders plus visual summaries for non-text PDFs.
