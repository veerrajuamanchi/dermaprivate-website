# DermaPrivate website

Standalone static marketing site for DermaPrivate, built with semantic HTML, vanilla CSS, and a small local JavaScript file. The site adds no analytics, advertising pixels, or third-party video. It has no backend or build step.

## Local preview

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

Run the static-site acceptance checks with:

```sh
node --test tests/site-integrity.test.mjs
```

## Canonical host and Render settings

The preferred public host is `https://www.dermaprivate.app/`. Canonical and social URLs, `robots.txt`, and `sitemap.xml` use the `www` host.

The site is currently configured as a Render Static Site from the Dashboard, with a blank build command and `.` as the publish directory. Configure `www.dermaprivate.app` as the custom domain in Render and attach the apex domain so Render can redirect the apex host to `www`. Add a permanent `/index.html` to `/` redirect in Render’s Static Site Redirects and Rewrites settings. Confirm the redirects with HTTP response headers after the next approved deployment. Render documents these settings at [Static Site Redirects and Rewrites](https://render.com/docs/redirects-rewrites) and [Custom Domains](https://render.com/docs/custom-domains).

This repository does not add a `render.yaml`; the live service is Dashboard-managed, and introducing a Blueprint could create or change deployment configuration. No public deployment or Render Dashboard change has been made as part of the local implementation.

## Content evidence and release items

- The AI BYOK path, product lookup, catalog update check, and Pro feature gates were checked against the mobile app source on October 14, 2026. Current product links use direct brand URLs; the website FAQ reflects the owner's confirmation that the current release does not earn commission or purchase attribution from them. The mobile app was not edited.
- The homepage hero uses `assets/screenshots/today-routine-build12.png`, cropped from the current working-tree QA capture: iPhone 17 Simulator, iOS 26.5, app version/build configuration 1.0.1 (12), captured October 13, 2026. The source capture is recorded in the app QA report; the website crop (368×275 from the top of a 368×800 capture) removes the trial/compatibility preview. The routine text is generic QA data with no profile, name, or key. This does not establish TestFlight or public store availability. No supporting app screenshots are used.
- Groq's provider-retention summary links to its official [Your Data in GroqCloud](https://console.groq.com/docs/your-data) page; account data-control settings can vary by user.
- The Accessibility page reports that the app evaluation is incomplete and makes no feature-support claims.
- Public App Store or Google Play availability and listing URLs have not been confirmed. The site therefore has no store-download link.
- Website request-log retention at the Render host has not been confirmed; the Privacy Overview says so explicitly.
- The optional walkthrough video is deferred. Do not add video preloading, analytics, or marketing pixels.

## Content and privacy limits

Do not add medical, HIPAA, zero-retention, security-compliance, clinical-validation, or diagnostic claims without evidence and appropriate review. The website’s information about app behavior is separate from its own static-site handling. The website never asks for an AI key.
