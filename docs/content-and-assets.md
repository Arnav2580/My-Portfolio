# Content and assets

## Asset folders

All website media lives under `public/assets/`:

| Folder              | Contents                                                      |
| ------------------- | ------------------------------------------------------------- |
| `brand/`            | Monogram/site icon                                            |
| `profile/`          | Current portrait, transparent portrait, signature             |
| `experience-logos/` | Company and organization logos                                |
| `projects/`         | Project screenshots and research figures, grouped by project  |
| `vision/`           | Earth textures, mining probe, transporter and station artwork |

Create `honors/` for event media when supplied. Use descriptive lowercase kebab-case names such as `hyrox-finish-line.jpg`. Keep originals and video masters outside the repository; add only web-ready assets that the site uses. External YouTube recordings are referenced by video ID rather than downloaded.

Reference `public/assets/projects/coinplay/dream-team.png` as `/assets/projects/coinplay/dream-team.png`. Run `npm run check:assets` after adding, moving or replacing files. The check deliberately flags unreferenced assets so obsolete uploads do not accumulate.

## Projects

Edit `src/content/data/projects.ts`. Each project has a stable `slug` for its URL, summary, description, contributions, approach, scope, technologies and optional external links. Array order is the selected display order; the UI also offers newest-year sorting.

```ts
image: "/assets/projects/example/overview.png",
imageAlt: "Describe what the actual screenshot shows",
youtubeId: "11-character-video-id",
liveUrl: "https://your-project.example",
gallery: [
  {
    src: "/assets/projects/example/overview.png",
    alt: "Describe the screen for someone who cannot see it",
    caption: "Dashboard overview",
  },
],
```

Retain honest scope and team/original-author credits. Screenshots demonstrate interfaces; they do not establish that payments, models or external services are operational.

## Experience and honors

Experience is shared between the home preview and full Experience page. Edit `src/content/data/experience.ts`; `image` references a logo. Descriptions use blank-line separators. The Experience page stays fully expanded; the home page has independent description controls.

Honors live in `src/content/data/honors.ts` and appear newest first. Preserve the precision of known dates (year, year-month or full date). Media records support:

```ts
{ type: "image", src: "/assets/honors/event/photo.jpg", alt: "..." }
{ type: "video", src: "/assets/honors/event/walkthrough.mp4", poster: "/assets/honors/event/poster.jpg" }
{ type: "youtube", videoId: "11-character-video-id" }
```

Record achievements when completed. A company logo is not a substitute for an event photograph.

## Journal

Add Markdown to `src/content/posts/`. The filename becomes the URL slug. Required metadata:

```yaml
---
title: "Article title"
date: "2026-10-07"
excerpt: "A short introduction."
draft: false
---
```

Only explicitly published entries (`draft: false`) appear. Use inline links to research sources. Keep source dates, currencies, geographic scope and forecasts clear.

## Story

The three files in `src/content/story/` preserve the supplied autobiography exactly. Chapter titles and reading metadata live in `src/content/data/story-chapters.ts`. To intentionally re-import an approved manuscript:

```sh
npm run import:story -- "C:/path/to/manuscript.txt"
```

The importer expects the original three chapter headings and checks byte-for-byte reconstruction. It overwrites chapter files; review the result and deliberately update the story-integrity test only when changing the approved manuscript. Formatting excludes this folder.

The featured college speech is configured in `featuredSpeech` in the same honors data file. `FeaturedSpeech` is shared by the home preview and the opening Honors section. The full page uses `HonorsFeed`, with year filters and text posters. Each poster opens `HonorDialog`, with a modest image on the left and the full article on the right. Compact galleries provide media navigation without full-size image links. Home cards share a fixed height. Each award owns its media rather than sharing a mixed image pool. The featured award appears once at the top, separately from the remaining chronological archive.

Story companion recordings sit outside the verbatim manuscript in the first chapter. The doorbell also has an ordinary project entry and recording in its existing honor.
