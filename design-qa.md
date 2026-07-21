# Design QA — Agent Atlas

## Comparison target and evidence

- **Visual source of truth:** `/Users/himanshu/.codex/generated_images/019f8324-10c9-7581-be01-4fb7bdcd9e6f/exec-5137f8bc-2c25-47b4-bfed-9b35b66f4c66.png`
- **Desktop implementation capture:** [`qa/final-desktop-expanded.png`](./qa/final-desktop-expanded.png)
- **Full-view comparison input:** [`qa/reference-vs-expanded.png`](./qa/reference-vs-expanded.png)
- **Focused hero comparison input:** [`qa/reference-vs-expanded-hero.png`](./qa/reference-vs-expanded-hero.png)
- **Expanded desktop section capture:** [`qa/final-desktop-studio-expanded.png`](./qa/final-desktop-studio-expanded.png)
- **Mobile landing capture:** [`qa/final-mobile-expanded-landing.png`](./qa/final-mobile-expanded-landing.png)
- **Mobile studio capture:** [`qa/final-mobile-studio-expanded-selected.png`](./qa/final-mobile-studio-expanded-selected.png)
- **Current chapter-entry capture:** [`qa/audit-content-gap-04-chapter-start.png`](./qa/audit-content-gap-04-chapter-start.png), 1280 × 720.
- **Current chapter-detail capture:** [`qa/audit-content-gap-02-full-chapter.png`](./qa/audit-content-gap-02-full-chapter.png), 1280 × 720.
- **Desktop viewport/state:** 1487 × 1058; landing state, Foundations and Google ADK selected, empty filters.
- **Mobile viewport/state:** 390 × 844; landing state, then LangGraph approval workflow selected in Agent Studio.

The source image and desktop browser capture were composed into one side-by-side comparison input at the same 1487 × 1058 dimensions. A second same-scale hero crop was compared for typography, header, art treatment, and primary-action detail.

## Findings

- No actionable P0, P1, or P2 visual issue was found.
- The selected source is a landing-page visual reference, while the implementation intentionally carries the requested learning platform below that first screen. The compact quick navigation and source-linked copy are accepted content-level extensions; they preserve the same editorial hierarchy rather than introducing a competing visual language.
- The expanded Agent Studio remains legible as a two-pane desktop workbench and collapses to a single column on mobile. The reading-route cards also collapse before their columns become too narrow.

### Required fidelity surfaces

- **Fonts and typography:** The high-contrast editorial serif remains reserved for display hierarchy, module/lab titles, and long-form instructional copy; small controls use the existing compact sans. Hero and mobile title wrapping retain the reference’s two-line reading order without clipping or fallback glyphs.
- **Spacing and layout rhythm:** The desktop rail, warm paper field, hero breathing room, thin structural rules, and bordered workbench rhythm remain intact. The additional sections live below the reference fold and use the same section-padding scale and grid cadence.
- **Colors and visual tokens:** The ivory paper texture, deep forest actions, muted green active state, and vermilion numbering/underlines consistently match the established palette. No gradients or unrelated accent system were introduced.
- **Image quality and asset fidelity:** The hero’s archival-books illustration and lesson illustration remain real image assets with the same intentional crop and texture treatment. The extension did not replace visible source art with CSS drawings, inline SVGs, or placeholders.
- **Copy and content:** New deep-dive lessons, lab deliverables, source anchors, and reading routes use concise instructional copy, preserve the course’s practical tone, and visibly connect learners to primary sources.

## Interaction and responsive checks

- The **Studio** quick-navigation control appeared once, opened the Agent Studio section, and exposed all six labs.
- Switching to **LangGraph approval workflow** changed the selected tab, workbench title, recovery copy, and definition-of-done content.
- Marking that lab complete changed the control to its undo state and updated progress to `1 of 6 studio labs marked complete`.
- The expanded curriculum data audit confirmed **8** modules, **24** deep-dive lessons, three lessons per module, **6** labs with three build steps each, and **5** reading routes with four source links each.
- At 390 × 844, the mobile layout showed `documentElement.scrollWidth === window.innerWidth === 390`; the selected studio lab remained single-column and horizontally contained.
- Browser console error log was empty after the desktop and mobile interaction pass.
- The current chapter self-check changed from **Reveal answer** to **Hide answer** and exposed the answer content; Multi-agent selection also updated its full chapter and worked trace.

## Chapter-learning extension verification

The visual source of truth only specifies the landing-page language; the new chapter material begins below that reference fold. The current browser captures show the extension reusing the same paper field, editorial serif hierarchy, structural rules, muted forest/vermilion palette, and course-rail anatomy rather than introducing a second design system. The content audit confirms eight complete chapter objects, four explanatory sections per chapter, a worked trace, answer-bearing self-check, four-term glossary, and source anchors per chapter.

No P0/P1/P2 layout or interaction issue was found in the current chapter flow. The original module screen's missing instructional depth was a content gap, not a visual mismatch; it is recorded and resolved in [`content-audit.md`](./content-audit.md).

## Comparison history

- **Iteration 1 — 22 July 2026:** Compared the source reference with the expanded browser-rendered landing page at 1487 × 1058, then reviewed the focused hero crop, the new desktop workbench, and mobile landing/studio states. No P0/P1/P2 difference was found, so no visual correction was required.
- **Iteration 2 — 22 July 2026:** Reviewed the browser-rendered chapter-entry and chapter-detail states after the instructional content extension. The selected visual source does not define below-the-fold chapters; the extension was therefore evaluated for continuity with the approved system, responsive containment, and functional learning controls. No P0/P1/P2 issue remained.

## Open questions

- The source reference does not specify the below-the-fold Studio or reading-route sections. Their treatment is therefore judged against the selected reference’s existing typography, borders, spacing, palette, and content density rather than a one-to-one mockup section.

## Implementation checklist

- [x] Rebuild the static bundle after the curriculum extension.
- [x] Verify desktop reference, focused hero, desktop Studio, mobile landing, and mobile Studio evidence.
- [x] Verify core new interactions, responsive containment, content-card counts, and console errors.

## Follow-up polish

- [P3] If a later visual brief supplies a dedicated below-the-fold mock, recompare the Studio and reading routes against that target; the current source only establishes the landing-page visual system.

final result: passed
