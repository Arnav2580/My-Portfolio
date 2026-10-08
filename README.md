# Arnav Goyal - Portfolio

Personal portfolio for **arnavgoyal.com**, built with Next.js App Router, React and TypeScript. It includes projects, experience, honors, a journal, a chapter-based autobiography, and an animated space journey.

## Start here

Use Node.js 22 or newer. Run commands from this folder; there is no nested application or parent wrapper.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For a production preview:

```sh
npm run build
npm start
```

## Repository map

```text
arnav-goyal-portfolio/
  public/assets/          All website images, logos, textures and icons
  src/
    app/                  Page routes, metadata and the contact API
    components/           UI grouped by feature: projects, story, vision, etc.
    content/
      data/               Projects, experience, honors, vision, chapter metadata
      posts/              Published/draft journal articles in Markdown
      story/              Three verbatim autobiography chapters
    lib/                  Content loading and contact validation
    styles/               Theme, feature styles and responsive overrides
  docs/                   Architecture, editing, deployment and asset provenance
  scripts/                Story import and asset validation utilities
  tests/
    unit/                 Story integrity and contact validation
    browser/              Routes, accessibility, interactions and media checks
  .env.example            Contact-service configuration template
  next.config.ts          Next.js configuration and security headers
  package.json            Dependencies and commands
```

`node_modules/`, `.next/` and `test-results/` are generated and ignored by Git. Private documents, original uploads, other project repositories and historical screenshots belong outside this repository.

## Where to make changes

| Change                        | Start here                                       |
| ----------------------------- | ------------------------------------------------ |
| Home page and section order   | `src/app/page.tsx`                               |
| About copy                    | `src/app/about/page.tsx`                         |
| Projects, links and galleries | `src/content/data/projects.ts`                   |
| Experience and company logos  | `src/content/data/experience.ts`                 |
| Honors and event media        | `src/content/data/honors.ts`                     |
| Vision and interests          | `src/content/data/vision.ts`                     |
| Journal articles              | `src/content/posts/`                             |
| Story chapters                | `src/content/story/`                             |
| New images                    | `public/assets/`, in the relevant feature folder |
| Colors and typography         | `src/styles/base.css`                            |
| Mobile/tablet layouts         | `src/styles/responsive.css` and feature styles   |
| Navigation and footer         | `src/components/layout/`                         |

See [Content and assets](docs/content-and-assets.md) for examples and [Architecture](docs/architecture.md) for the rendering and data flow.

## Checks

```sh
npm test
npm run check:assets
npm run typecheck
npm run build
```

With a local server running, install Chromium once using `npx playwright install chromium`, then run the relevant browser check:

```sh
npm run test:browser
npm run test:media
npm run test:experience
npm run test:honors
npm run test:motion
```

Browser reports and screenshots go to ignored `test-results/`. Use `npm run format` to format code and documentation; story manuscripts are intentionally excluded to preserve their exact wording and bytes.

## Deployment and services

Deploy this repository's **root** to Vercel using the Next.js preset. See [Deployment](docs/deployment.md) for environment variables and email setup. The contact form uses Resend and Upstash Redis; it returns an unavailable response when they are not configured, while keeping the direct email link available.

Project galleries show real supplied media rather than simulated applications. Original-author credits remain where applicable. See [Asset credits](docs/asset-credits.md) and [Project source notes](docs/project-research.md).
