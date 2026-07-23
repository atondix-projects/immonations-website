# Goal: Normalize customer files into reusable references

## Outcome

Turn `E:\atondix\projekte\immonation\customer-files` into a complete, machine-readable reference corpus that preserves source provenance, exposes supplied page structures and copy, and maps every reusable source asset to its curated library destination and any existing website derivative or code usage.

## Baseline

- `customer-files/` contains 108 files totaling 2,122,759,974 bytes: 20 DOCX/PDF documents, 71 images, 13 videos, and 4 operating-system metadata files.
- The same source set was previously curated into `docs/source-material/` and `assets/media-library/` with a 108-row archive manifest.
- Existing documentation summarizes the supplied content, but does not provide a complete normalized Markdown record for every document.
- Existing provenance does not directly map current `customer-files/` paths to curated assets, optimized `public/` derivatives, and source-code usage.
- The repository already contains extensive uncommitted user work. It must be preserved.

## Deliverables

1. A normalized UTF-8 Markdown corpus for all 20 DOCX/PDF documents, retaining headings, paragraphs, lists, tables, links, and PDF page boundaries where available.
2. A machine-readable inventory for all customer files with stable IDs, relative source paths, sizes, hashes, media metadata, and cleanup status.
3. A cross-reference mapping each source file to the existing curated destination, matching `public/` derivative when identifiable, and current repository usage.
4. A page-structure reference that separates supplied page proposals from currently implemented routes and records the source documents behind each proposal.
5. Reproducible normalization and verification scripts.
6. Removal of only the four known OS metadata files (`.DS_Store`, `Thumbs.db`) from `customer-files/`; all substantive originals remain unchanged.

## Constraints

- Preserve the meaning and provenance of supplied material; label source copy as supplied or draft rather than approved fact.
- Do not overwrite, rename, recompress, or delete substantive customer originals.
- Do not overwrite unrelated dirty work or edit generated UI primitives.
- Do not publish, upload, stage, commit, or push.
- Do not infer that visual similarity proves asset identity; use hashes or explicitly label heuristic matches.
- Keep filenames and stable IDs ASCII-safe in normalized outputs while retaining the original path in metadata.

## Primary verifier

A verification script must reconcile every substantive file currently in `customer-files/` against the machine-readable inventory and prior provenance, confirm all 20 DOCX/PDF sources have non-empty normalized Markdown outputs, confirm every declared curated/public destination exists, and confirm no `.DS_Store` or `Thumbs.db` remains.

## Supporting checks

- Hashes for substantive customer files agree with the existing archive manifest after path normalization.
- Each normalized document records its source path, source hash, extraction status, and content sections.
- Cross-reference rows distinguish exact hash matches, derived/renamed matches, and unresolved items.
- Page proposals are traceable to normalized source documents and compared with current routes/content registries.
- Scripts compile and run successfully.
- Authored Markdown/CSV/JSON parses cleanly and `git diff --check` passes.

## Iteration loop

Inventory and hash -> extract documents structurally -> normalize text -> reconcile prior manifest -> inspect curated/public assets and code usage -> build page-structure map -> remove known OS junk -> run verifier -> resolve gaps -> record evidence.

## Approval gates

No external publishing, uploads, git staging, commits, pushes, or deletion beyond the four named OS metadata files. Legal, privacy, testimonial, copyright, trademark, and claim verification remain launch gates.

## Blocker standard

Record the exact unreadable or irreconcilable source and the smallest next action. A blocker exists only after repeated safe extraction or reconciliation attempts fail and no other meaningful in-scope work remains.

## Completion proof

- Verifier output showing complete substantive-file reconciliation and 20 normalized documents.
- Paths to the corpus, inventory, cross-reference, and page-structure reference.
- Confirmation that only the four OS metadata files were deleted from `customer-files/`.
- Script compilation, structured-file parsing, link checks, and `git diff --check` evidence in `RESULT.md`.
