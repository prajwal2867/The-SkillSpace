# SkillSpace

SkillSpace is a browser-based prototype for discovering, joining, and creating online communities for creators, coaches, educators, and learners. The current build focuses on validating the product experience and visual language before the planned production migration.

## Current Progress

The Vite prototype currently includes:

- Community discovery with category, price, access, search, and sorting filters.
- Community detail pages with media galleries, curriculum highlights, reviews, creator information, and membership actions.
- Login, registration, password recovery, and code-login prototype dialogs.
- Local profile and settings screens, including profile editing, contribution heatmaps, theme switching, affiliates, notifications, chat, and payment settings surfaces.
- Local join/leave membership state and profile membership views.
- Community creation flow with plan selection, a prototype checkout form, and a creator community setup page.
- Local post creation, chat notifications, and seeded community activity.
- Responsive styling with light/dark themes, CSS design tokens, and vanilla JavaScript ES modules.

This is not production authentication, billing, authorization, or shared community storage. User data, sessions, posts, memberships, and created communities are stored in the browser with `localStorage`; checkout does not charge a real payment method.

## Tech Stack

- JavaScript ES modules and HTML5
- Vanilla CSS with custom properties, Flexbox, and CSS Grid
- [Vite](https://vitejs.dev/) for development and production builds
- Inter from Google Fonts

## Project Structure

```text
The SkillSpace/
├── src/
│   ├── domain/data.js       # Categories, communities, demo users, reviews, chats, and notifications
│   ├── services/store.js    # Browser localStorage persistence adapter
│   ├── main.js              # Application state, rendering, routing, and event handling
│   └── styles.css           # Design tokens, responsive layout, and component styles
├── docs/
│   ├── development_goals.md
│   ├── system_architecture_1.md
│   └── system_architecture_2.md
├── dummy_data.js            # Generated users and prototype activity data
├── generate_data.js         # Mock data generator
├── generate_users.js        # User fixture generator
├── index.html               # Vite entry document
├── package.json              # Project scripts and dependencies
└── README.md                 # Project documentation
```

## Getting Started

### Prerequisites

- Node.js `20.19+` or `22.12+`
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

### Production build

```bash
npm run build
npm run preview
```

The current production build completes successfully with Vite.

## Data and Prototype Behavior

The application imports seeded community and user data from `src/domain/data.js` and `dummy_data.js`. The generator scripts use random values, so generated fixtures should be treated as demo data rather than deterministic test fixtures. Browser state is kept under versioned `skillspace_*` localStorage keys; clearing site storage resets the local session and created content.

## Roadmap

The architecture documents describe the planned migration from this browser prototype to a modular monolith with:

- A real client feature/domain structure and URL routing.
- Validated contracts and repository interfaces.
- Server-side identity, authorization, memberships, entitlements, and payments.
- PostgreSQL as the transactional source of truth, with Redis and durable jobs where needed.
- Tests, accessibility checks, observability, moderation, media handling, and operational safeguards.

See [`docs/development_goals.md`](docs/development_goals.md) for the staged delivery plan and [`docs/system_architecture_2.md`](docs/system_architecture_2.md) for the target production architecture.

## Contributing

Keep prototype changes focused on validating product behavior. When adding production-oriented functionality, follow the boundaries and exit criteria in the development goals before expanding `src/main.js`.
