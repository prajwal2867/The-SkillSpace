# SkillSpace

SkillSpace is a browser-based prototype for discovering, joining, and creating online learning communities. It is a Vite single-page application built with vanilla JavaScript ES modules and CSS.

## Current scope

The prototype currently includes:
- Community discovery, search, filtering, sorting, details, and membership actions.
- Registration and login prototype flows.
- Community creation and creator-plan presentation.
- Local profiles, settings, seeded activity, and demo inbox UI.
- Browser-side persistence through localStorage.

**Prototype limitations:** authentication, authorization, payments, messaging delivery, and shared persistence are not production services. User data and application state are stored in the current browser. Checkout is a presentation flow and does not charge a payment method.

## Tech stack

- JavaScript ES modules and HTML5
- Vanilla CSS
- Vite
- Node.js and npm for tooling and tests

## Repository layout

```text
.
├── .github/workflows/       # CI workflow
├── docs/
│   ├── archive/             # Superseded architecture drafts
│   ├── product-decisions/   # Product notes and decisions
│   ├── development_goals.md
│   └── system_architecture_2.md
├── src/
│   ├── app/                 # Composition root, state, routing, app events
│   ├── domain/              # Domain data, fixtures, and validation
│   ├── features/            # Auth, communities, discovery, payments, etc.
│   ├── services/            # Browser persistence adapter
│   ├── shared/              # Shared UI, utilities, and constants
│   ├── styles/              # Canonical stylesheet entry point and styles
│   └── main.js              # Vite JavaScript entry point
├── test/                    # Node.js unit tests
├── index.html               # Vite HTML entry point
├── package.json
└── package-lock.json
```

## Getting started

Requirements: Node.js 20.19+ or 22.12+, and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL (normally http://localhost:5173).

## Build and test

```bash
npm test
npm run build
npm run preview
```

The production build is generated in dist/. It is intentionally not committed; Vercel and local builds generate it when needed.

## Demo data

Seed data used by the prototype lives in src/domain/fixtures/dummy-data.js and is imported as an ES module. Treat these records as synthetic demo fixtures, not real user data.

## Architecture notes

- docs/system_architecture_2.md is the current target architecture specification.
- docs/development_goals.md describes the staged migration plan.
- Older architecture material is retained under docs/archive/ for historical context.