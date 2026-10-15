# DermaPrivate Mobile Website Design

**Date:** 2026-10-14
**Status:** Design approved for review; implementation has not started.

## Purpose

Make the DermaPrivate website a clear, mobile-first explanation of the app. Visitors should understand the product and its privacy model before being asked to download it. Keep DermaPrivate visually distinct while aligning its visual language and site structure with Amanchi Labs.

## Current findings

- The public homepage at `https://www.dermaprivate.app/` still serves an older page. Its canonical URL and `og:url` point to `https://dermaprivate-website.onrender.com/index.html`.
- The website checkout has both metadata tags set to `https://dermaprivate.app/` (without `www`) in uncommitted edits. The public site still points both tags to the Render URL. Set both tags to the requested canonical `https://www.dermaprivate.app/` and publish the change.
- The checkout has a viewport meta tag and responsive rules at 850px and 650px, including a collapsed mobile menu and stacked feature/footer layouts. These have not been verified in iPhone Safari.
- The public footer has an accessibility feedback email but no app-specific accessibility information page.
- The app's current product notes describe local routine management and checks, guided Routine Snapshot, product discovery, and Today/Journey. Online product lookup and consented Groq AI are separate network features. The app is cosmetic guidance, not diagnosis.
- Stored QA images are not approved marketing assets: one sampled image shows a render error and another includes “Where to buy (coming soon).” Capture fresh screenshots from the current release build.
- The checkout's product-link note says some app links may be affiliate links, while its FAQ says curated links never earn commission. Resolve the wording against current app behavior before publication.

## Page structure and content order

1. **Shared header:** compact DermaPrivate identity, short product navigation, and an app action only when a real public store destination is confirmed. On phones, links move into an accessible menu.
2. **Hero:** explain the app in one sentence, show a real current-build screen, and summarize local-first privacy. The main action is “See how it works”; downloading is available but does not lead the story.
3. **Two starting paths:** organize products the visitor already uses or answer optional Routine Snapshot questions. Explain that the user reviews and edits a starting routine.
4. **Core tasks:** explain routine organization, available ingredient/compatibility information, product discovery, and Today/Journey tracking. Label incomplete ingredient information as incomplete. Identify paid or network-dependent functionality accurately once confirmed.
5. **Privacy and data flow:** separate information stored on-device from information sent only after a user action. Explain that product lookup sends the entered query, catalog update checks use a broad rollout-group value, and consented AI sends approved request information directly to Groq. Do not claim the whole app works offline.
6. **Medical boundary:** state that the app supports cosmetic routine organization and does not diagnose, prescribe, or replace clinician or prescriber instructions.
7. **Download action:** provide the verified App Store destination after the product and privacy explanation. If public distribution is not available, state the current availability honestly.
8. **Video (optional):** a short walkthrough of one core task, loaded only after the visitor presses play. Include captions, a transcript, and a representative poster image; do not autoplay or create a video made from every app screen.

## Navigation and shared site shell

Use the same responsive header/footer on the homepage and product information pages. Keep primary navigation concise: **How it works**, **Features**, **Privacy**, and **Support**. The mobile menu includes these links and the app action when available.

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
- Replace the illustrative homepage phone mock with three or four sanitized screenshots that show the current product. Each screenshot needs a concise caption and useful alternative text.
- Keep the editorial wordmark and green visual identity, but do not let decorative graphics displace the product explanation or privacy details on a small screen.

## iPhone experience requirements

- Reflow the page cleanly from 320px to 430px viewport widths and remain usable in iPhone Safari portrait and landscape.
- Avoid horizontal overflow. A screenshot gallery may scroll horizontally only when its controls and interaction are clear and accessible.
- Keep body text readable at mobile sizes, let browser text zoom work, and provide comfortably tappable links and controls (target at least 44px where practical).
- Ensure the mobile navigation works with touch, keyboard, and screen readers and exposes its expanded/collapsed state.
- Respect reduced-motion preferences. Load large screenshots responsively and load video only after an explicit play action.
- Before release, inspect the public page in iPhone Safari at representative small and standard iPhone widths, checking the hero, menu, screenshots, privacy content, footer links, and absence of clipped text or horizontal scrolling.

## Publication checks and open facts

- Confirm public App Store availability and use the exact public listing URL before showing a download CTA.
- Confirm which features are free or Pro and which require a network connection before describing access or pricing.
- Reconcile affiliate disclosures by link type against the app's current labels and destinations.
- Capture sanitized screenshots and, only if it improves understanding, record a short current-build walkthrough.
- Perform the app accessibility review before making specific support claims or setting the App Store accessibility URL.
- Set both canonical and `og:url` to `https://www.dermaprivate.app/` in the source, then publish the change.

## Not in this design

This document does not implement the website changes, alter the mobile app, certify app accessibility, publish a video, confirm store availability, or deploy the site.
