# Wanky Web

Wanky Web is the official public-facing website for Wanky, a software-focused brand building modern, scalable digital products. The site helps establish the company's brand credibility and online presence while communicating its work, principles, products, and direction.

The repository contains an implemented marketing and information website, a blog listing and article routes, and editorial documentation drafts. Draft articles and planned product capabilities are not statements that content has been approved, a product is generally available, or a launch date has been set.

## Contents

- [Project objectives](#project-objectives)
- [Technology stack](#technology-stack)
- [Repository structure](#repository-structure)
- [Current pages](#current-pages)
- [Local development](#local-development)
- [Environment configuration](#environment-configuration)
- [Documentation](#documentation)
- [Quality checks](#quality-checks)
- [Contributing and change safety](#contributing-and-change-safety)
- [Project status](#project-status)

## Project objectives

- Establish Wanky's brand identity and online presence.
- Communicate the company's products, principles, and project engagement options.
- Provide a place for product announcements and engineering updates.
- Support future case studies and the site's growth as the company evolves.

The routes and UI described below are implemented in this repository. Case studies, future announcements, and product capabilities marked as planned remain future intentions until implemented and verified.

## Technology stack

| Area | Technology |
| --- | --- |
| Framework and routing | Next.js 16.4.2 App Router |
| UI runtime | React 19.2.3 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 with project CSS in `src/app/globals.css` |
| Motion | Framer Motion |
| Icons | Lucide React and React Icons |
| Charts | Recharts |
| Package manager | npm, with `package-lock.json` |

## Repository structure

```text
src/
  app/                 App Router pages, metadata, and global styles
    blog/              Blog listing and dynamic article route
  components/          Shared UI components
  lib/                 Shared application data, including blog entries
public/                Static files served from the site root
  images/              Homepage hero image
docs/
  README.md            Documentation index and publication caveats
  public/              Draft source material for public-facing content
```

Important root configuration includes `package.json` and `package-lock.json` for dependencies and commands, `next.config.ts` for Next.js configuration, `tsconfig.json` for TypeScript, `tailwind.config.ts` and `postcss.config.mjs` for styling, and `eslint.config.mjs` for linting. There is currently no `scripts/` directory.

`docs/public/` is not the Next.js root `public/` directory: those Markdown files are not automatically served as static website files. `AGENTS.md`, when present, contains Next.js-managed development instructions and is not site content.

## Current pages

| Route | Purpose and status |
| --- | --- |
| `/` | Company overview, product direction, and an illustrative dashboard preview. |
| `/platform` | ERS product overview and conceptual workflow; availability and capabilities remain subject to release validation. |
| `/classroom` | Wanky Classroom product concept, identified as upcoming and early-stage. |
| `/pricing` | Project engagement options; pricing is project-specific, not a published rate card. |
| `/principles` | The company's stated engineering principles and commitments. |
| `/systems` | Wanky Cloud infrastructure direction; described as planned and under development. |
| `/contact` | Inquiry topics with links that open an email application. |
| `/blog` | Listing of the current article entries. Both entries are drafts for review. |
| `/blog/[slug]` | Article detail pages generated for the known slugs. The migration article and weekly update are draft content, not approved or published announcements. |

Next.js also generates `/opengraph-image` from `src/app/opengraph-image.tsx`. The footer newsletter UI currently opens an email application; it does not store subscriber addresses on this site.

## Local development

### Prerequisites

- Node.js 20.9 or newer, as required by the installed Next.js version.
- npm.

### Install and run

```bash
npm ci
npm run dev
```

Open `http://localhost:3000` in a browser. To run the production server locally, first build the site, then run `npm run start`:

```bash
npm run build
npm run start
```

## Environment configuration

No environment-variable references were found in the application source or current Next.js configuration. No local environment file or variable template is provided. Production hosting requirements, if any, must be confirmed with the release owner and hosting configuration; do not put credentials in this repository or this README.

## Documentation

`docs/README.md` indexes five editorial drafts in `docs/public/`: company overview and principles, engineering approach, ERS product overview, ERS AWS migration status and validation plan, and weekly publication guidelines. They are source material for possible public-facing content, not evidence that the text has been approved or published. The migration status, publication date, weekly update number, and launch timing should be confirmed before external publication.

There is no separate internal engineering-documentation directory in the current repository. Keep credentials, private infrastructure configuration, internal customer information, and unapproved plans out of the public-content drafts.

## Quality checks

Run the checks from the repository root:

```bash
npm run lint
npx tsc --noEmit
npm run build
git diff --check
```

There is no test script in `package.json`. The production build has previously completed with two non-blocking warnings: `metadataBase` is unset for social-image URL resolution, and Recharts reports an unresolved chart size during rendering. Confirm the canonical site URL before setting `metadataBase`; check the chart in a browser before changing its sizing.

## Contributing and change safety

Before editing, inspect the current branch and worktree with `git status --short --branch`. Review `git diff` and run the relevant checks before proposing a commit. Preserve existing user changes and generated files unless their handling has been explicitly agreed.

No repository-specific contribution policy or license is documented here. Deployment is a separate release decision and requires explicit approval; the local `start` command is not a deployment command.

## Project status

The homepage and listed information pages are implemented. The blog listing and two article routes are implemented, but their current content remains marked as drafts for review. The documentation under `docs/public/` also remains draft source material. Product pages distinguish planned or early-stage work from currently verified availability. No launch date is stated or promised by this README.
