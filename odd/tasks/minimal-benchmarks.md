# Minimal benchmarks

Objective: simplify the benchmark section while retaining the animated branching timeline.

Authorized scope: the skills section in src/components/LandingTab.astro, initSkillsScrollTimeline in src/pages/index.astro, and this document.

- [x] T1 — Keep open specification content, restore the animated branching timeline, and remove the metric/efficiency column; verify the build and structure.

Route: delegated direct; preparation and two related source files require one bounded writer.
Forecast: approximately 300 authored changed lines. Delivery strategy: ask-on-risk.
Acceptance: restrained vertical timeline with numbered nodes and alternating desktop branches; left rail on mobile; no protocol cards, badge clutter, boxed tags, metric column or efficiency bars; retain descriptions and reduced-motion support.
Checks: npm run build; git diff --check; structural readback.
Test-first exception: presentation change without a deterministic visual test runner.
Rollback: restore only the skills section markup and initSkillsScrollTimeline together.
Commit: pending; prior Git-write escalation was canceled, so no branch or commit is attempted.
Review: parent owns review; immutable transport was previously unavailable.
Progress: restored the animated branching timeline with small numbered nodes, alternating desktop branches and a mobile left rail. Removed the metric/efficiency column and horizontal bars. Simplified typography and unboxed content remain.
Verification: npm run build passed; git diff --check passed; structural assertions confirmed alternating desktop placement, mobile left rail, removed metrics/bars and scoped reduced-motion cleanup. Browser rendering remains unverified.
Motion: vertical line fills with scaleY while scrolling; each branch reveals once over 0.45 seconds with 10px travel and a subtle node color change. Reduced motion leaves content and the full rail visible without motion; matchMedia reverts on preference changes, repeated initialization and page navigation. Cleanup affects only this section.
Memory: full task document mirrored under odd/minimal-benchmarks/tasks; parent synchronizes final state.
Next step: parent spot check and browser inspection when available; commit remains pending prior Git-write authorization.
