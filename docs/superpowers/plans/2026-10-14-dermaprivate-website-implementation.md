# DermaPrivate Website Implementation Plan

The approved design is in `docs/superpowers/specs/2026-10-14-dermaprivate-mobile-website-design.md`. This plan executes the user's implementation amendments in the existing static site. The mobile app remains read only. No public deployment is included.

## Work sequence

1. Add Node built-in static-site acceptance checks and run them against the current site to record the expected failures.
2. Replace the homepage with a mobile-first, outcome-led explanation; add shared responsive navigation and footer to all information pages; add AI/data-use and Accessibility pages; keep privacy, terms, and setup copy accurate to verified app behavior.
3. Apply the supplied brand assets, canonical/social metadata, sitemap and robots URLs. Record Render custom-domain and redirect setup in the existing README without changing deployment configuration.
4. Update the existing design specification with the amendments and a completed acceptance checklist, including any evidence-dependent item that remains blocked.
5. Run the acceptance checks and local HTTP/browser checks at iPhone and desktop widths; inspect screenshots and links; do not deploy.

## Acceptance conditions

- Visitors first understand how the app organizes owned products into AM/PM; Routine Snapshot, Today, and Journey are described in plain language.
- AI and website data handling are distinct; direct Groq routing is described only for the verified BYOK path; no analytics, marketing pixels, or third-party video preloading are present.
- Homepage and each information page have unique `www.dermaprivate.app` canonical and `og:url` values; sitemap/robots use that host.
- Shared navigation/footer work by keyboard and touch; the app Accessibility page is candid and makes no untested feature-support claims.
- Affiliate copy reflects conditional app labels; no blanket commission claim or unsupported store/pricing claims.
- No optional video is included. Current-build screenshot publication is blocked until sanitized build 12 captures exist; older build 3 captures are not substituted.
- Local tests and rendered mobile/desktop checks pass; no public deploy or mobile-app edits occur.
