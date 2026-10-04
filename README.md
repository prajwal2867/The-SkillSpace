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

- Node.js `22.12+`
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Local API and PostgreSQL

The first server-backed slice uses PostgreSQL for accounts, cookie sessions, community memberships, and posts, and Redis for shared production rate limiting. The included Compose setup runs local services with non-production credentials:

```bash
docker compose up -d --wait db redis
Copy-Item .env.example .env
```

The default `.env.example` connection string matches this local database. For a manually installed PostgreSQL instance, replace it with your local connection string.

Run the database setup once:

```bash
npm run db:migrate
npm run db:seed
```

Start the API and web client in separate terminals:

```bash
npm run dev:api
npm run dev
```

Vite proxies `/api` calls to the API on port 3000. The browser only receives a random `HttpOnly` session cookie; password hashes, authentication, membership checks, and post persistence stay server-side. Auth, catalog, membership, and feed routes have per-client-IP limits. Local development falls back to per-process memory only when `REDIS_URL` is absent; production startup refuses to run without Redis. For production, terminate TLS, set `APP_ORIGIN` to the exact public origin, keep database/Redis URLs secret, and tune `PG_POOL_MAX` against the database connection budget.

Rate limits use the direct TCP peer address by default. If the API is behind a reverse proxy, set `TRUSTED_PROXY_HOPS` to the exact number of proxies that append to `X-Forwarded-For`; the application uses the address at that trusted boundary and rejects malformed chains. Only enable this after the API is network-restricted to those proxies and the outermost trusted proxy strips any client-supplied `X-Forwarded-For` before forwarding. Never enable forwarded-header trust for an API directly reachable from the public internet.

The API supports registration/login/logout, session restore, public community catalog reads, free/public membership join/leave, and member-only feed reads/writes. Paid membership checkout, email verification, password recovery, distributed rate limiting, and production deployment configuration are not implemented in this slice.

### PostgreSQL integration test

The end-to-end test uses a separate ephemeral PostgreSQL container and Redis instance and refuses to run unless the configured database name ends in `_test`:

```bash
docker compose --profile integration up -d --wait test-db test-redis
Copy-Item .env.test.example .env.test
npm run db:migrate:test
npm run db:seed:test
npm run test:integration
docker compose --profile integration down
```

The integration test creates and cleans up a uniquely named user and community. It verifies registration, cookie sessions, membership enforcement, feed persistence, membership reads, and logout against PostgreSQL; a second test verifies separate limiter instances share a counter through Redis. Never point `DATABASE_URL` or `REDIS_URL` in `.env.test` at production or shared services.

### Catalog load test

Start the API and seeded local database, then temporarily raise only the local catalog limit above the test arrival rate:

```powershell
$env:RATE_LIMIT_CATALOG_MAX = "5000"
npm run dev:api
```

In another terminal, run the local-only Compose k6 profile:

```powershell
docker compose --profile loadtest run --rm k6
```

The script ramps catalog traffic to 25 requests/second and checks for under 1% failed requests and p95 latency below 500 ms. Set `TARGET_RPS` to change the rate. The script refuses remote targets unless explicitly overridden. This is a repeatable baseline for one local machine, **not** proof of 60,000-user capacity; test against production-like hosting/database resources and define expected peak concurrency before treating a result as a capacity claim.

### Production build

```bash
npm run build
npm run preview
```

The current production build completes successfully with Vite.

## Data and Prototype Behavior

The application imports seeded community and user data from `src/domain/data.js` and `dummy_data.js`. The generator scripts use random values, so generated fixtures should be treated as demo data rather than deterministic test fixtures. Browser state is kept under versioned `skillspace_*` localStorage keys; clearing site storage resets the local session and created content.

## Roadmap

Future development plans and detailed product direction are documented in the docs folder, particularly in the architecture and development goals notes.

The architecture documents describe the planned migration from this browser prototype to a modular monolith with:

- A real client feature/domain structure and URL routing.
- Validated contracts and repository interfaces.
- Server-side identity, authorization, memberships, entitlements, and payments.
- PostgreSQL as the transactional source of truth, with Redis and durable jobs where needed.
- Tests, accessibility checks, observability, moderation, media handling, and operational safeguards.

See [`docs/development_goals.md`](docs/development_goals.md) for the staged delivery plan and [`docs/system_architecture_2.md`](docs/system_architecture_2.md) for the target production architecture.

## Contributing

Keep prototype changes focused on validating product behavior. When adding production-oriented functionality, follow the boundaries and exit criteria in the development goals before expanding `src/main.js`.
