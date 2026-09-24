# Design Directions (v2, pushed)

Design read: solo Staff Product Designer portfolio for design-leadership and hiring-manager audiences at major tech and AI companies, editorial and offbeat in tone, human but confident. This pass is a design exploration only, static comps on a canvas artifact, not code, not a working prototype. Reference: `https://claude.ai/artifact/BTULr4yHgEL7BjuwXEb4C7`.

The first pass (v1) was safe, competent, and generic in the specific ways first passes usually are: predictable serif choice, repeated section-label eyebrows, a beige-and-terracotta "warm portfolio" palette that has become its own cliche, and interaction ideas described in prose rather than built into the layout. Nothing below preserves v1 as-is. Each direction keeps its strongest underlying idea and rebuilds the rest.

---

## A. The Redline

### What was generic in v1
- Fraunces as the display serif. It is the single most reached-for "editorial" font in AI-generated design and reads as a template choice, not a considered one.
- A numbered list of work items with a label-and-paragraph structure that is indistinguishable from a hundred other minimal portfolios.
- The "expensive to unsolved" word swap was described as an animation in prose rather than expressed as something on the page.
- An appendix-style skills table with a hairline under every row, the laziest possible treatment of a list.

### What's preserved
The core idea, that restraint and typography alone can carry seniority, and the specific mechanic of visibly editing the word "expensive" into something else.

### What changed
- Typeface swapped to Bricolage Grotesque for display and Archivo for body and labels. No serif at all: the confidence comes from scale and spacing, not literary association.
- The "expensive" to "unsolved" swap is now a literal proofreader's correction: a strikethrough in ink plus an italic insertion, not a described animation. This is the page's one signature interaction (hover redraws the strike and inserts the correction).
- A persistent right-edge spec strip (role, contact) runs the full height of the page, separated by a hairline, while the main content is pushed into a wide left margin. This is a more specific, less centered composition than a standard hero.
- Work items are no longer numbered rows. Each project's reframe sentence is set in large display type as the main visual, with a huge ghost numeral behind it for wayfinding instead of a small numbered label. Meta (company, year) sits small underneath.
- Section labels ("Selected Work", "About") were removed entirely. The layout position already tells you what a section is; the label was empty decoration.
- Skills, tools, and recognitions are set as three flowing sentences ("Skills. Product strategy, 0 to 1 design...") instead of a bordered table. No hairlines per row.

### Distinctive idea
The whole page reads as a document someone has lightly proofread: one word in the hero is visibly corrected in the designer's own hand, and that correction is the entire pitch. Nothing else on the page needs to shout.

### Fit
Best for reviewers who want to be convinced fast and are allergic to anything that feels like it's trying. Lowest execution risk, but only as strong as the typography and spacing discipline actually shipped.

---

## B. The Manuscript

### What was generic in v1
- Dark charcoal plus mono type is its own increasingly common cliche, the "hacker/PM decision-log portfolio" look.
- The Tension, Options, Chose, Because labels stacked as four separate blocks read like a slide template, not a portfolio.
- Green-for-shipped, amber-for-killed is a status-badge palette borrowed from product dashboards, not a personal visual language.

### What's preserved
The core idea, the strongest one across all three v1 directions: your case studies are already decision logs, and showing killed options next to chosen ones is a real demonstration of judgment, not a design trick.

### What changed
- Moved off dark-mode-and-mono entirely. The page is now a warm paper background with ink text, styled as a printed, hand-marked-up document rather than a terminal. This is a deliberate departure from the "dev portfolio" look that dark-plus-mono has become.
- The four stacked labels (Tension, Options, Chose, Because) are gone. In their place, one flowing paragraph does the same work: generic options appear struck through inline, and the chosen line is set large and bold, immediately after. "A portfolio should be memorable. ~~A visual flourish.~~ ~~A safe template.~~ Show the decisions themselves."
- The same mechanic repeats in Work (killed approaches struck inline against what shipped) and About (generic practices struck through, replaced by your actual operating principles). One idea, reused three times, is the signature interaction, not three different UI patterns.
- Mono type is now reserved for a handful of small labels only (meta lines, a rotated margin note on hover), not the whole page's voice.
- Colors: paper background, ink text, a single redline accent for corrections. No status-color system.

### Distinctive idea
The entire portfolio is typeset as a marked-up manuscript. Every claim about judgment is shown as an actual, visible edit, not narrated. This is the most original of the three directions because it is the only one built entirely out of your own content's real structure.

### Fit
Strongest match for AI and product companies whose interview loops probe judgment and trade-off reasoning directly. Requires the most typographic discipline to avoid feeling gimmicky. Highest ceiling, highest craft bar.

---

## C. Working Alongside

### What was generic in v1
- The warm cream background with a terracotta or clay accent and espresso-dark text is a specific, well-documented AI-default palette for "premium, human, artisan" briefs. It was already sliding toward that cliche.
- A dashed-border placeholder box read as an unfinished wireframe rather than an intentional, considered gap.
- IBM Plex Mono doubling as the label typeface here made this direction typographically indistinguishable from Direction B.

### What's preserved
The core idea, that the human stakes in your case studies (an agent's actual quote, a customer's actual workaround) are stronger material than most portfolios ever surface, and that warmth is a legitimate differentiator for relationship-first, international audiences.

### What changed
- Palette moved from cream-and-terracotta to cool slate and warm off-white, with terracotta reduced to a single sparing accent (a link, a quote border, one hover mark). This is a moodier, more confident, more editorial-at-night feel, and it avoids the exact palette family that has become an AI tell.
- The photo placeholder is now a solid duotone-style block with a plain caption underneath ("Photo pending, candid, natural light") instead of a dashed wireframe box, so the gap reads as considered, not incomplete.
- Labels moved from mono to small-caps Archivo, freeing mono entirely for Direction B and giving each direction its own typographic identity.
- Added one small, specific interaction: hovering a case-study anecdote reveals a rotated, handwritten-style aside ("true story") in the accent color, used exactly twice on the page. It is not everywhere, so it stays a moment rather than a tic.
- The testimonial moved out of a filled beige card into a plain hairline-bordered quote, consistent with the rest of the page's restraint.

### Distinctive idea
Confident, cool-toned editorial warmth. The photography and the human anecdotes carry the emotion; the layout around them stays disciplined and unsentimental, which is the harder and more memorable combination.

### Fit
Best for relationship-driven, international markets (KSA, UAE) where warmth reads as a real asset. Needs strong actual photography to fully land; the current comp is honest about that gap rather than faking it.

---

## Recommendation

**The Manuscript (B)** has the strongest potential. It is the only direction built entirely from material you already have rather than material invented to fit a genre, it produces the single most memorable and specific signature interaction of the three, and it directly demonstrates the exact skill (judgment under trade-offs) that Staff-level interview loops are built to probe. The risk is real: it needs the highest typographic and spacing discipline to avoid reading as a gimmick, and it is the most work to get right. The Redline (A) is the safer fallback if time or execution risk becomes a concern, since it is the most forgiving direction to typeset well under pressure.

Elements can migrate across directions later (for example, A's persistent side rail could work inside B's paper aesthetic) once a primary direction is chosen, but the recommendation is to commit to one point of view rather than average the three together.

## Next step

Confirm a direction (or a combination) before any technical or codebase decisions are made.
