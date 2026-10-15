# DermaPrivate Mobile Website Design

**Date:** 2026-10-14
**Status:** Approved; local implementation complete (2026-10-14). Production host configuration remains pending.

## Purpose

Make the DermaPrivate website a clear, mobile-first explanation of the app. Visitors should understand the product and its privacy model before being asked to download it. Keep DermaPrivate visually distinct while aligning its visual language and site structure with Amanchi Labs.

## Current findings

- The public homepage at `https://www.dermaprivate.app/` still serves an older page. Its canonical URL and `og:url` point to the Render hostname. The implementation now uses `https://www.dermaprivate.app/` for the homepage and every information page.
- The initial checkout had responsive rules but had not been verified at narrow phone sizes. Local browser checks now cover 320–1440px widths, navigation and FAQ interactions, reduced motion, and no-JavaScript navigation. The available browser is Chromium; iPhone Safari itself was not available for this run.
- The public footer has an accessibility feedback email but no app-specific accessibility information page.
- The app source confirms that a user-authorized BYOK request is sent from the device to Groq's API. Current iOS settings force BYOK mode; the website confines the direct-path statement to that mode.
- App source confirms that product lookup can fall back to Open Beauty Facts, catalog update checks send a rollout bucket to `api.dermaprivate.app`, and affiliate status is conditional per link and labeled in the app.
- The app screenshots documented in `docs/DERMAPRIVATE_SECURITY_RELEASE_CERTIFICATION.md` include build 3 QA images. A separate October 13 QA Simulator screenshot from the current working-tree source (app version/build configuration 1.0.1 (12)) is used for the homepage hero. It was captured on an iPhone 17 Simulator / iOS 26.5 and cropped to remove the trial/compatibility preview. The routine text is generic QA data; no name, profile, or key appears. No supporting screenshots are used.
- The app accessibility review is incomplete. The website Accessibility page reports that plainly and makes no feature-support claim.
- The checkout's old affiliate statements conflicted. The implementation follows the app's conditional affiliate label and does not claim all links are commission-free.
- A public store listing URL has not been confirmed. No download or store-availability claim is added.

## Page structure and content order

1. **Shared header:** compact DermaPrivate identity and short product navigation. No app-store action is shown until a real public store destination is confirmed. On phones, links move into an accessible menu.
2. **Hero:** explain the app in one sentence, show a real current-build screen, and summarize local-first privacy. The main action is “See how it works.”
3. **Two starting paths:** organize products the visitor already uses or answer optional Routine Snapshot questions. Explain that the user reviews and edits a starting routine.
4. **Core tasks:** explain routine organization, available ingredient/compatibility information, product discovery, and Today/Journey tracking. Label incomplete ingredient information as incomplete. Identify paid or network-dependent functionality accurately once confirmed.
5. **Privacy and data flow:** keep the homepage summary concise. Separate website request handling from mobile-app data handling. Explain app-local information, the BYOK request path to Groq, product lookup, and the catalog update bucket on a dedicated AI and data use page. Do not claim the whole app works offline.
6. **Medical boundary:** state that the app supports cosmetic routine organization and does not diagnose, prescribe, or replace clinician or prescriber instructions.
7. **Download action:** add a store action only after a public store destination is confirmed. Store availability remains unconfirmed, so the first implementation does not invent a listing or availability claim.
8. **Video:** deferred from the first implementation. Do not add a video element, third-party player, or video preloading.

## Navigation and shared site shell

Use the same responsive, sticky header/footer on the homepage and product information pages. Keep the compact brand and navigation visible while scrolling, and offset in-page anchors below the header. Group header navigation under three disclosure menus: **Product** (How it works, Features, FAQ), **Privacy & access** (Privacy overview, AI & data use, AI setup, Accessibility, Terms), and **Support** (Email support, Accessibility feedback). On phones, keep these groups inside the accessible menu button. Disclosure groups must open with touch and keyboard and expose their expanded state.

The footer uses semantic HTML and has four link groups:

- **Product:** How it works, Features, FAQ.
- **Privacy & accessibility:** Privacy, AI and data use, Accessibility.
- **Support:** Contact and support resources.
- **Amanchi Labs:** “A product by Amanchi Labs” with a link to the company site.

Keep Terms and the copyright line visible in the footer. Use the same shell on Privacy, Terms, AI setup, and the new Accessibility page so visitors can navigate back without relying on browser controls.

## Accessibility information page

Add an app-specific accessibility page and link it from the website footer. Use its URL for Apple's optional App Store accessibility URL. The page should describe verified accessibility behavior, relevant settings, known limitations, and a feedback contact. Record the app version and review date. Do not claim VoiceOver, Larger Text, or other support until representative common tasks have been evaluated on supported devices. The current app notes list VoiceOver and Dynamic Type runtime checks as pending.

Apple's guidance: [Overview of Accessibility Nutrition Labels](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels).

## Visual direction and assets

- Use the warm neutral and deep green palette, restrained serif brand wordmark, and calm editorial spacing from the supplied references. Keep body copy and controls in a highly legible sans-serif style with adequate contrast.
- Use `DermaPrivate_Header_Banner.png` as the wordmark reference. Use the supplied square app/logo, Apple touch, and favicon images for their corresponding app and browser identity roles.
- Treat `DermaPrivate_Editorial_Website_UI.png` and `DermaPrivate_Footer_Banner.png` as art direction, not page-sized images. Recreate visible text, navigation, legal links, and social links as responsive HTML.
- Use one sanitized current-build screenshot in the hero and up to three supporting screenshots. Record app version/build, capture date, capture device, and sanitization for each. The hero uses one verified QA capture; no extra app screenshots are needed in this pass.
- Keep the editorial wordmark and green visual identity, but do not let decorative graphics displace the product explanation or privacy details on a small screen.

## iPhone experience requirements

- Reflow the page cleanly from 320px to 430px viewport widths and remain usable in iPhone Safari portrait and landscape.
- Avoid horizontal overflow. A screenshot gallery may scroll horizontally only when its controls and interaction are clear and accessible.
- Keep body text readable at mobile sizes, let browser text zoom work, and provide comfortably tappable links and controls (target at least 44px where practical).
- Ensure the mobile menu and its Product, Privacy & access, and Support disclosures work with touch, keyboard, and screen readers and expose their expanded/collapsed states.
- Respect reduced-motion preferences. Load large screenshots responsively and load video only after an explicit play action.
- Before release, inspect the public page in iPhone Safari at representative small and standard iPhone widths, checking the hero, menu, screenshots, privacy content, footer links, and absence of clipped text or horizontal scrolling.

## Publication checks and open facts

- Keep store download actions and pricing claims out until their facts and destination are confirmed.
- Use conditional affiliate wording supported by the app's per-link labels; do not claim every link is non-affiliate.
- Use only the recorded build 12 hero capture; do not add older build 3 screenshots as current.
- Publish the honest Accessibility page now. Do not make named accessibility support claims until representative tasks have been tested.
- Keep analytics, marketing pixels, and third-party video preloading out of the website.
- Use unique canonical and `og:url` values for every public information page, update internal links, `robots.txt`, and `sitemap.xml` to the `www` host.
- Use `https://www.dermaprivate.app/privacy/` as the permanent Privacy Policy address and render the supplied policy with its October 15, 2026 effective date and October 14, 2026 last-updated date.
- Configure Render's `www` custom domain and `/index.html` redirect in Dashboard settings after the next deployment is approved; this cannot be set by editing the Dashboard-managed static site source.

## Not in this design

This document does not alter the mobile app, certify app accessibility, publish a video, confirm store availability, or deploy the site.

## Compact acceptance checklist

- [x] Homepage leads with organizing owned products into AM/PM and defines Routine Snapshot, Today, and Journey plainly.
- [x] Homepage privacy stays concise; detailed app data paths and separate website handling are published; BYOK route is verified.
- [x] No analytics, marketing pixels, third-party video preloading, or video element is present.
- [x] Homepage and every information page have unique `www` canonical and social URL; internal links, sitemap, and robots use `www`.
- [x] Privacy Policy uses the permanent `https://www.dermaprivate.app/privacy/` URL and the supplied policy text and dates.
- [x] Shared accessible sticky header and footer group the requested links under Product, Privacy & access, and Support and work at mobile and desktop widths; in-page anchors clear the header.
- [x] Accessibility page is published with pending status and no untested feature-support claims.
- [x] Affiliate wording matches conditional app labels; no blanket commission or invented store/pricing claims.
- [x] Homepage has one sanitized current-source hero screenshot and no more than three supporting screenshots. Capture record: version/build configuration 1.0.1 (12), iPhone 17 Simulator / iOS 26.5, October 13, 2026; trial panel cropped out.
- [x] Node acceptance checks (10/10) and local browser checks pass; no mobile-app edits or public deployment occurred. Browser checks used Chromium mobile emulation, not iPhone Safari.
- [ ] Render preferred-host and `/index.html` redirects configured and verified. **Pending external step:** Render Dashboard/domain settings and post-deploy HTTP verification; no public deployment was authorized.
