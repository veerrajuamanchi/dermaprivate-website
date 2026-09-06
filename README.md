# DermaPrivate website

Standalone static marketing site for DermaPrivate, a local-first skincare routine planning app. The site uses semantic HTML, vanilla CSS, and minimal vanilla JavaScript; it has no backend, analytics, or build step.

## Local preview

Open `index.html` directly, or run:

```sh
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Render deployment

1. Choose **New → Static Site** in Render.
2. Connect the `dermaprivate-website` repository.
3. Select branch `main`.
4. Leave **Build Command** blank.
5. Set **Publish Directory** to `.`.

## Before public launch

Replace the app-store placeholders, `support@dermaprivate.example`, canonical domain placeholder, draft privacy overview, and draft terms overview. Verify every statement about on-device storage, AI provider handling, backups, tracking, and app availability against the released app and gateway configuration.

Do not add medical, HIPAA, zero-retention, security-compliance, clinical-validation, or diagnostic claims without documented evidence and appropriate review.
