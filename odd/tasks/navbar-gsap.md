# Flat navigation with GSAP

Objective: replace the desktop navigation capsule with plain text and animated dropdowns on the existing dark header.

Scope: Navbar.astro, its active navigation integration in index.astro, and this document. Preserve logo and checkout behavior.

Constraints: accessible hover, keyboard and touch navigation; reduced motion; existing catalog categories and section destinations.

- [ ] T1 — Implement flat links and GSAP dropdowns, preserve tab/category navigation, and verify build and diff checks.

Route: delegated direct; preparation and two non-trivial files require one writer.
Forecast: approximately 350 authored changed lines. Delivery strategy: ask-on-risk. No remote operations.
Acceptance: no navigation capsule or active pill; dropdown destinations work; mobile exposes all links; Escape and outside click close; reduced motion skips animated travel.
Checks: npm run build; git diff --check; browser checks if a browser is available.
Test-first exception: no existing deterministic navigation test runner or test script; use build and browser interaction checks.
Rollback: revert Navbar.astro and the active-state update in index.astro together.
Progress: flat links, GSAP dropdowns, responsive navigation, reduced motion, and active-state integration implemented. Independent inspection found and corrected ArrowDown focus during fade-in. Build and diff checks passed; browser interaction remains unverified.
Verification: npm run build passed in writer/independent verification and parent spot check; git diff --check passed. Categories and section anchors match existing handlers and content.
Review: unavailable; native STATUS returned immutable_review_transport_unsupported with mutation_outcome not_started. Review mode remains unchanged. No approval claimed.
Commit: pending because branch-write escalation was canceled; changes remain local on main. T1 remains open for browser verification and commit.
Authored source changes: approximately 213 added/deleted lines, below delivery forecast.
Memory: full task document mirrored under odd/navbar-gsap/tasks; final synchronization handled by parent.
Next step: inspect navigation in a browser; commit when Git writes are authorized.
