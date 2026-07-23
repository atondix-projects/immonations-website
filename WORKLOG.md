# Worklog

## 2026-07-17

- Inspected repository instructions and existing documentation.
- Confirmed pre-existing user change in `src/components/site/home/hero.tsx`; it will not be modified.
- Inventoried the source ZIP: 108 files, 2,122,759,974 bytes uncompressed.
- Classified top-level source types: 20 documents, 71 images, 13 videos, 4 system/other files.
- Defined completeness, provenance, integrity, and approval checks in `GOAL.md`.

Next: activate the goal, extract textual sources, and build the curated asset taxonomy.

### Extraction and synthesis

- Activated the durable goal with the objective in `GOAL.md`.
- Extracted readable text from all 20 DOCX/PDF sources; no structural extraction failures.
- Reviewed seller-page drafts, FAQ, review guidance, ground-value content, local/contact content, situational topics, awards, downloads, testimonials, reference texts, brand PDFs, and the EUIPO certificate.
- Locally transcribed the 6:01.7 Viktor Emter interview and wrote an editorial summary with timestamps and verification gates.
- Rewrote useful material into `docs/source-material/` and reconciled it into canonical requirements, site structure, SEO/AEO/GEO, and roadmap documents.

### Asset curation

- Curated 88 public-candidate/source assets into `assets/media-library/` using stable lowercase ASCII-safe names.
- Retained 15 DOCX files and the EUIPO certificate under `docs/source-material/originals/`.
- Excluded two `.DS_Store` and two `Thumbs.db` files.
- Kept the 1.6 GB Viktor source video out of Next.js `public/`; it requires transcription/editing, transcoding, and external video delivery before use.
- Visually reviewed representative logo, F.A.Z., and testimonial assets.
- Relabeled the Frau Hartmann image as an illustrative/synthetic-looking portrait so it is not mistaken for a real customer photo.
- Distinguished the dated F.A.Z. award letter from a generic award-kit mockup; recorded the letter's license requirement for seal/logo use.

### Verification

- `scripts/verify-ek-source-assets.py`: 108 rows reconciled; 104 retained/curated files matched size and SHA-256; four exclusions had reasons; no system-junk files remained.
- All local Markdown links under `docs/source-material/` resolved.
- All three archive scripts compiled successfully.
- `git diff --check` passed; Git emitted only the repository's LF-to-CRLF warnings.
- Confirmed the pre-existing `src/components/site/home/hero.tsx` modification remains present and out of scope.
