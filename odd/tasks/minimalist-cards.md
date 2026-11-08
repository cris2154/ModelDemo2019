# Minimalist cards

Objective: unify seasonal offers, featured products, catalog cards, product detail view, checkout, informational sections, and footer under the open dark minimalist visual language without nested containers, glare, or 3D tilt.

Authorized scope: src/styles/global.css, src/layouts/Layout.astro, src/components/ProductCard.astro, src/components/SeasonalOfferCard.astro, src/components/PaymentBadges.astro, src/components/LandingTab.astro, src/components/CatalogTab.astro, src/components/ProductModal.astro, src/components/CheckoutTab.astro, src/pages/index.astro, docs/plans/open-seasonal-and-product-screen.md, and this task document. Preserve the open hero, benchmark branching timeline, flat navbar, product data, and Zustand store behavior.

- [x] T1 — Define shared surface tokens, create ProductCard and SeasonalOfferCard, simplify PaymentBadges, migrate featured/catalog/seasonal/informational/modal/checkout/footer surfaces, and unify GSAP motion; verify the build and diff.
- [x] T2 — Document and implement open unboxed seasonal offers and a full-screen product detail view without changing the browser URL; verify the build, diff, and preserved DOM contracts.
- [x] T3 — Implement GSAP scroll-linked timeline entrance and exit animations for cards/sections and timeline sequencing for the full-screen product detail view; verify build and diff.

Route: delegated direct; multi-file UI refactoring and script alignment require one bounded writer.
Forecast: approximately 740 authored changed lines. Delivery strategy: ask-on-risk.
Acceptance: shared ProductCard used across featured and catalog; SeasonalOfferCard rendered as an open unboxed editorial block on #050507 with checkout CTA; full-screen product detail view in ProductModal.astro with back navigation and no URL change; flat inline PaymentBadges; open catalog header and text filter states via aria-pressed; sticky checkout summary with open form sections; no 3D tilt, specular glare, or universal 2rem border-radius; GSAP scroll-linked timeline entrance/hold/exit animations and sequenced full-screen product transitions respecting prefers-reduced-motion; all functional IDs, data attributes, and Zustand store contracts preserved.
Checks: npm run build; git diff --check; structural verification of preserved selectors and contracts.
Test-first exception: presentation and markup refactoring without a deterministic visual test runner.
Rollback: restore modified files in src/ and remove src/components/ProductCard.astro, src/components/SeasonalOfferCard.astro, and docs/plans/open-seasonal-and-product-screen.md.
Commit: pending; no git commit, branch, or push is performed without explicit authorization.
Review: parent owns assessment.
Progress: completed T1, T2, and T3. Removed .surface-card from SeasonalOfferCard.astro so seasonal offers sit directly on #050507 with subtle horizontal dividers; transformed ProductModal.astro and openProductModal/closeProductModal in index.astro into a full-viewport open product screen with top back navigation, scroll/focus management, and zero URL mutation; upgraded section/card animations to scrubbed GSAP timelines with intro/hold/outro phases and sequenced full-screen product transitions.
Verification: npm run build passed; git diff --check passed; structural assertions confirmed all 54 required IDs, 17 data-*/class families, open hero, benchmark timeline, and read-only files remain intact.
Motion: removed initCard3DTilt; initCardScrollAnimations and initNosotrosStaircaseAnimation use gsap.timeline({ scrollTrigger: { start: 'top 92%', end: 'bottom 8%', scrub: 0.45 } }) with intro (0->0.22), hold (0.22->0.78, immediateRender: false), and outro (0.78->1.0, immediateRender: false) phases plus child block offsets under gsap.matchMedia('(prefers-reduced-motion: no-preference)'); openProductModal and closeProductModal use sequenced gsap.timeline() entrance and exit tweens.
Memory: full task document recorded under odd/tasks/minimalist-cards.md; parent synchronizes final state.
Next step: parent spot check and browser visual inspection when available.
