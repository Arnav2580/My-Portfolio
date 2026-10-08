# Deployment and contact services

## Local workflow

Run all commands from the repository root. Development: `npm run dev`. Production preview: `npm run build`, then `npm start`. Both bind to http://127.0.0.1:3000 by default. Stop an existing server before rebuilding its production output.

## Vercel

Import the repository with the Next.js preset and use the repository root (`.`) as Root Directory. Import `Arnav2580/My-Portfolio`. Use Node 22.x and the build command `npm run verify` supplied in `vercel.json`; remove any old static-site overrides. Keep the default Next.js output handling; this application is not a static export because it includes a contact API.

If an existing Vercel project points to a former nested folder, change its Root Directory to `.`. Configure arnavgoyal.com and any www redirect using Vercel's provided DNS records, preserving existing email records. This repository cleanup does not deploy or alter DNS.

## Environment variables

Copy `.env.example` to `.env.local` for local configuration. Preserve local credentials outside version control. Configure equivalent values in Vercel:

| Variable                   | Purpose                               |
| -------------------------- | ------------------------------------- |
| `RESEND_API_KEY`           | Server-only email provider credential |
| `CONTACT_FROM`             | A sender address verified with Resend |
| `UPSTASH_REDIS_REST_URL`   | Shared rate-limit storage endpoint    |
| `UPSTASH_REDIS_REST_TOKEN` | Server-only Redis credential          |
| `CONTACT_ALLOWED_ORIGIN`   | Optional additional trusted origin    |

The recipient is fixed to arnavgoyal.work@gmail.com; visitor email is used for Reply-To. The route checks origin, validates input, uses a honeypot, hashes rate-limit keys and uses provider idempotency. No message database is created. Missing service configuration returns a temporary-unavailability response rather than claiming a message was delivered.

The IP-header trust assumes Vercel's proxy. Review it before switching providers. Actual delivery must be verified separately after sender verification and service configuration; automated browser checks do not send real messages.

## Checks and generated files

Run `npm test`, `npm run check:assets`, `npm run typecheck` and `npm run build`. Browser scripts require a running server and installed Playwright browsers. `npm run test:browser` uses Chromium; set `TEST_ALL_BROWSERS=1` only when intentionally running the optional Firefox/WebKit checks.

`node_modules/`, `.next/`, `test-results/`, `playwright-report/`, `.vercel/`, local environment files and TypeScript build caches are ignored. Documentation, browser tests and reports are excluded from Vercel uploads; unit tests and scripts remain available for build validation. Application Markdown under `src/content/` is included in server tracing.

## Continuous integration and delivery

`.github/workflows/ci.yml` checks pull requests and pushes to `main`: formatting, assets, unit tests, production build, then sequential Chromium browser checks. `npm run test:ci` starts and stops its own production server; port 3000 must be free.

Connect `Arnav2580/My-Portfolio` using [Vercel Git integration](https://vercel.com/docs/git), with `main` as the production branch. Branch pushes produce previews; production-branch pushes trigger production deployment. Native integration needs no Vercel token in GitHub. Account connection and domain configuration remain separate setup steps; configuration files alone do not activate hosting.

Future workflow: edit locally, run `npm run verify`, check the browser, push a branch, review its preview, then merge to `main`. Require **Build and browser checks** in GitHub branch protection before merging. GitHub checks do not inherently gate Vercel deployments: Vercel independently checks assets, unit tests and builds through `verify`; branch protection prevents merging before browser checks pass.

Use the project's actual [Vercel domain instructions](https://vercel.com/docs/domains/working-with-domains/add-a-domain) for arnavgoyal.com, preserving email DNS records. Verify the deployment and custom domain before calling setup complete. Revert a commit through the same workflow to roll back code.
