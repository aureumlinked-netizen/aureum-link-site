# AUREUM LINK Site

Premium static landing page for the AUREUM LINK concept:

- animated Three.js dotted background,
- rotating typewriter hero copy,
- large adaptive YouTube live stream area,
- philosophy section,
- animated closed-loop growth model,
- temporary password gate for restricted public preview,
- GitHub Pages deployment via Actions.

## Local preview

```bash
npm install
npm run build
npx serve out -l 3000
```

Preview password: `goldbridge2026`

## Environment

Copy `.env.example` if you want to override defaults:

- `NEXT_PUBLIC_YOUTUBE_EMBED_URL`
- `NEXT_PUBLIC_SITE_PASSWORD_HASH`
- `NEXT_PUBLIC_BASE_PATH`
- `NEXT_PUBLIC_EMAILOCTOPUS_EMBED_SCRIPT_SRC`
- `NEXT_PUBLIC_EMAILOCTOPUS_EMBED_FORM_ID`
- `NEXT_PUBLIC_EMAILOCTOPUS_FORM_ACTION`
- `NEXT_PUBLIC_EMAILOCTOPUS_EMAIL_FIELD_NAME`
- `NEXT_PUBLIC_EMAILOCTOPUS_HIDDEN_FIELDS_JSON`

## First-visit subscription modal

The site can show an EmailOctopus-powered subscription modal on the first visit
after the password gate is passed.

Because this project is exported as a static site for GitHub Pages, the
EmailOctopus integration now uses a **static-safe direct form POST**:

1. Open the EmailOctopus embed script or hosted form config.
2. Use the direct form action URL, email field name and honeypot field name.
3. If the form includes extra hidden fields, copy them into JSON.
4. Set the matching environment variables before building:

```bash
NEXT_PUBLIC_EMAILOCTOPUS_FORM_ACTION="https://eocampaign1.com/form/your-form-id"
NEXT_PUBLIC_EMAILOCTOPUS_EMAIL_FIELD_NAME="field_0"
NEXT_PUBLIC_EMAILOCTOPUS_HONEYPOT_NAME="hpxxxxxxxx"
NEXT_PUBLIC_EMAILOCTOPUS_HIDDEN_FIELDS_JSON='{}'
```

Notes:

- The modal appears only once per browser via `localStorage`.
- Email addresses are sent directly to EmailOctopus, so no private API key is
  exposed in the static frontend.
- Do **not** place a private EmailOctopus API key into `NEXT_PUBLIC_*`
  variables or commit it into the repository.
- Welcome email automation can be added later inside EmailOctopus after the
  signup form and list are connected.

## Deployment

Live at **https://aureum-link.com**, served by **Cloudflare Pages** and rebuilt
from `main` on every push:

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `out` |
| `NODE_VERSION` | `24` |
| `NEXT_PUBLIC_SITE_URL` | `https://aureum-link.com/` |

`NEXT_PUBLIC_SITE_URL` only feeds Open Graph metadata and already defaults to the
live address in `layout.tsx`. `basePath` needs no setting: `next.config.ts` injects
a repo subpath only when `GITHUB_ACTIONS === "true"`, so anywhere else the site
builds for the domain root.

> Turbopack's persistent cache can survive edits to page metadata — a build may
> report success while still emitting the previous Open Graph URLs. If a metadata
> change does not show up, delete `.next` and rebuild, and verify by grepping
> `out/index.html` rather than reading the build log.

`.github/workflows/ci.yml` builds every push and fails if the built site claims the
token is launched or promises income. `.github/workflows/deploy-pages.yml` is a
manual-only (`workflow_dispatch`) fallback that publishes a copy to GitHub Pages.
