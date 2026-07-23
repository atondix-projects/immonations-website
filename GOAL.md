# Goal: Curate the EK source archive

## Outcome

Transform `C:\Users\andreas\Downloads\ZZZ EK Themen -20260717T182100Z-1-002.zip` into a documented, reusable source library for the Immonation website.

## Baseline

- The ZIP contains 108 files (20 documents, 71 images, 13 videos, and 4 system/other files), totaling 2,122,759,974 bytes uncompressed.
- The source documents and media have inconsistent names and no repository-level provenance manifest.
- Existing canonical planning documents do not yet incorporate this archive.
- `src/components/site/home/hero.tsx` has a pre-existing user modification and is out of scope.

## Deliverables

1. Extract and review the textual content from all DOCX and PDF sources.
2. Rewrite useful facts and content concepts into maintainable Markdown documentation under `docs/source-material/` and update existing canonical docs where appropriate.
3. Sort reusable images, videos, logos, certificates, and downloads into a descriptive source-library structure under `assets/media-library/`. Only explicitly web-ready derivatives should later be promoted to `public/`.
4. Preserve provenance in machine-readable CSV manifests mapping each original archive item to its curated destination, status, and notes.
5. Exclude operating-system junk (`.DS_Store`, `Thumbs.db`) and document each exclusion.

## Constraints

- Preserve source meaning; distinguish verified facts, supplied claims, proposed copy, and open verification/legal questions.
- Do not silently publish personal testimonials, trademark certificates, or potentially sensitive material as website copy; mark approval requirements.
- Do not edit the pre-existing `hero.tsx` change.
- Do not weaken completeness checks or omit oversized files merely to make the verifier pass. If a file is deliberately not copied, record the reason in the manifest.
- Use stable, lowercase, ASCII-safe, descriptive filenames for curated web assets.

## Primary verifier

Every non-directory ZIP entry appears exactly once in the source manifest with one of these outcomes: curated destination, retained source-only, duplicate, or excluded with a reason. Every recorded curated destination exists and matches the source file size or an explicitly documented transformation.

## Supporting checks

- All 20 DOCX/PDF files have an extraction/review status.
- Canonical Markdown links resolve locally.
- Media folders contain no `.DS_Store` or `Thumbs.db` files.
- Duplicate/hash checks identify accidental repeated copies.
- `git diff --check` passes for authored text files.
- Existing repository checks are run if source code is touched; otherwise no code change is required.

## Iteration loop

Inventory -> extract source documents -> classify facts/content/assets -> write and reconcile docs -> copy/rename media -> generate manifests -> run completeness and integrity checks -> resolve gaps -> record completion evidence.

## Approval gates

No publishing, external uploads, deletion of the original ZIP, git staging, commits, or pushes. Copyright, privacy, testimonial, and trademark approvals remain human launch gates.

## Blocker standard

Record the exact unreadable/corrupt source and the smallest next action. A blocker exists only if repeated safe extraction attempts fail and no further in-scope progress is possible.

## Completion proof

- Paths to curated docs and media index.
- Manifest totals reconcile to 108 archive files.
- Integrity report confirms all curated destinations exist and excluded files have reasons.
- `git status --short` and `git diff --check` output recorded in `RESULT.md`.
