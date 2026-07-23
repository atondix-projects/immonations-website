# Goal: Integrate the handbook-based marketing system

## Outcome

Replace the homepage's static Premium Marketing presentation with an accessible, bilingual ten-part service selector inspired by the interaction pattern at `von-otto.de/#marketing`, while using only Immonation's handbook as the service-content authority.

## Baseline

- The homepage currently shows one video and six static capability cards.
- The Immonation sales handbook defines a ten-step sales process and the supporting services that make it credible.
- The reference site demonstrates a useful tab-to-detail interaction, but its copy, imagery, and branding are not reusable.

## Constraints

- Keep the existing `#virtuelle-besichtigung` anchor and bilingual routing behavior.
- Use original Immonation copy derived from the supplied handbook; do not copy VON OTTO content or assets.
- Use semantic tabs with keyboard support and useful mobile behavior.
- Keep all styling in Tailwind utilities and preserve existing unrelated worktree changes.
- Do not stage, commit, push, deploy, or publish.

## Verification

Primary verifier: the local homepage renders all ten handbook-derived services, supports click and keyboard tab selection, and remains usable at desktop and mobile widths.

Supporting checks:

- German and English translation data have identical service IDs and complete fields.
- `pnpm typecheck`, targeted linting, and `git diff --check` pass.
- A separate verification subagent reviews the implementation if confidence is below 95%.
- Desktop and mobile screenshots document the final result.

## Iteration loop

Implement one coherent selector -> run static checks -> exercise mouse and keyboard interactions in a real browser -> inspect desktop and mobile screenshots -> correct defects -> repeat until clean.

## Anti-cheating and approval gates

Do not hide broken services, weaken checks, replace handbook facts with invented metrics, or remove accessibility behavior to make verification pass. Publishing and all Git history changes require separate approval.

## Completion proof

- Paths to the final components and translation sections.
- Passing command outputs.
- Independent review result when required.
- Rendered desktop and mobile screenshots.
