# Minimal landing hero

Objective: simplify the landing hero into an open layout that fits the desktop first viewport without a card shell or excessive nested containers.

Authorized scope: the hero in src/components/LandingTab.astro and this task document. Preserve all later sections, navigation, product actions, and existing animation hooks.

- [x] T1 — Replace the boxed hero with concise text, clear actions, an unboxed product image, and compact supporting information; verify the build and markup.

Route: delegated direct; preparation and visual restructuring require one bounded writer.
Forecast: approximately 200 authored changed lines. Delivery strategy: ask-on-risk.
Acceptance: no outer hero card or floating specification/payment cards; readable two-column desktop composition; natural mobile flow; no fixed-height clipping; existing catalog, season and product detail actions remain available.
Checks: npm run build; git diff --check; structural review of GSAP hooks and preserved later content.
Test-first exception: presentation-only change with no existing deterministic visual test runner.
Rollback: restore the hero markup in src/components/LandingTab.astro.
Commit: pending; prior Git-write escalation was canceled, so no branch or commit is attempted.
Review: parent owns assessment; prior native review transport was unavailable.
Progress: open two-column hero implemented with concise Spanish copy, two actions, a plain product image/caption and inline payment/assurance text. Removed the outer card, floating offer/specification cards and payment container. Existing first-div, max-w-xl paragraph, image and action hooks remain compatible.
Verification: npm run build passed; git diff --check passed; structural assertions confirmed all later sections match HEAD and the hero has no card shell or overflow clipping. Browser rendering remains unverified.
Actual authored source changes: 157 added/deleted lines.
Memory: full document mirrored under odd/minimal-hero/tasks; parent synchronizes the final state.
Next step: parent spot check and visual browser inspection when available; commit remains pending prior Git-write authorization.
