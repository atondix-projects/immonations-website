# Two-week execution board

Assumption: ten focused working days. Workstreams can overlap after the shared design foundation is stable.

| Day | Primary outcome | Work | Gate |
| --- | --- | --- | --- |
| 1 | Audit and visual direction locked | F01; asset shortlist; keep/replace/defer route audit; wireframe homepage and shared page anatomy | No unresolved visual-system decision |
| 2 | Design foundation usable | F02–F05; shell; responsive grid; typography; reusable editorial patterns | One test page works at three breakpoints |
| 3 | Homepage benchmark | H01–H03; initial motion; hero imagery; proof and services | Desktop homepage approved in direction |
| 4 | Homepage + valuation | H04; C04–C05; mobile homepage; local-state wizard | Core CTA journey completes without network |
| 5 | Seller journey | C01–C03; first seller detail; process page | Seller narrative and component reuse approved |
| 6 | Seller details + FAQ | Remaining C02; C06; German content pass | Core German seller journey complete |
| 7 | References and stories | R01–R05; hub; reusable detail; four customer stories | Every available reference has a valid route/data record |
| 8 | Buyer and supporting routes | S01–S04; highest-value S05 routes; sample listing state | Sample/live distinction passes review |
| 9 | Language and secondary coverage | Q01–Q02; remaining S05–S07; SEO shell alignment | No broken navigation or mixed-language core UI |
| 10 | Hardening and approval | Q03–Q07; browser/device QA; build; final visual review | All P0 acceptance checks pass |

## Review gates

### Gate A — end of day 2

- Tokens, typography, page width, section rhythm, cards, and header are visually coherent.
- Mobile is tested before page multiplication.
- Existing `ui/*` primitives are reused; project composition lives in `site/*`.

### Gate B — end of day 4

- Homepage establishes the quality bar.
- Primary and secondary CTAs are unmistakable.
- Valuation flow behaves realistically but explicitly sends nothing.

### Gate C — end of day 7

- Seller pages, process, references, metrics, and stories form one credible narrative.
- Privacy and prototype-only annotations are intact.

### Gate D — end of day 10

- P0 checklist is green.
- Final visual approver has accepted the prototype.
- Every production dependency remains visible in the post-prototype list.

## Scope-control rule

When time is threatened, reduce P1 secondary-page polish before weakening the homepage, valuation flow, seller pages, references, responsive behavior, or accessibility. Do not start P2 work during the two-week prototype.
