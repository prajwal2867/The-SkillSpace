# SkillSpace Development Goals

## Purpose

This document is the implementation plan for moving SkillSpace from the current browser prototype to the production-oriented modular monolith described in `system_architecture_2.md`.

The goals are deliberately ordered. Each stage establishes a foundation required by later stages. Do not begin a later stage by bypassing an unresolved exit criterion from an earlier stage. The system should remain a working prototype throughout the migration, but production behavior must gradually move behind validated boundaries and server-authoritative state.

This plan is comprehensive, but it is not a mandate to build every future feature before releasing a useful first product. The order separates architectural prerequisites from optional expansion. A small production release can stop after the first production-hardening slice, provided the corresponding security, payment, testing, and operational requirements are explicitly reduced and documented.

## Guiding Rules

1. Keep the first production architecture as a modular monolith.
2. Keep the current visual prototype available as a reference and regression baseline.
3. Move business rules out of rendering code.
4. Keep storage behind repositories and application services.
5. Treat identity, permissions, memberships, payments, and entitlements as server-authoritative.
6. Use structured domain values instead of display strings.
7. Make URL state, server state, session state, local UI state, and derived state explicit.
8. Use PostgreSQL as the transactional source of truth.
9. Use Redis only for temporary caching, coordination, rate limiting, and ephemeral state.
10. Put asynchronous work behind durable jobs and an outbox pattern.
11. Validate at every boundary: UI, repository, API, domain, and database.
12. Add tests with each stage instead of postponing verification until the end.
13. Do not extract microservices until measured load, ownership, or deployment constraints justify extraction.
14. Do not treat a hidden client button as authorization.
15. Do not store raw card details or grant paid access from a browser redirect.

## Overall Delivery Sequence

The implementation should follow this order:

1. Establish scope, terminology, and a repeatable development environment.
2. Freeze the current product contract and create deterministic fixtures.
3. Capture the current prototype as a visual and behavioral baseline.
4. Define the target repository, package, and module boundaries.
5. Split the client monolith into application, component, feature, domain, and infrastructure layers.
6. Introduce real URL routing and explicit state ownership.
7. Add schemas, domain validation, and structured values.
8. Hide local persistence behind repository interfaces.
9. Add a complete client-side test foundation.
10. Build the versioned backend modular monolith.
11. Add PostgreSQL schemas, migrations, constraints, and repositories.
12. Move identity and sessions to the server.
13. Migrate discovery and community data to the API.
14. Migrate profiles, settings, posts, and memberships.
15. Implement learning, progress, events, messaging, and notifications in priority order.
16. Add billing, checkout, webhooks, entitlements, and reconciliation.
17. Add media storage, upload safety, processing, and delivery.
18. Add moderation, audit events, and trust workflows.
19. Add durable jobs, outbox processing, and failure recovery.
20. Complete accessibility, performance, resilience, security, and operations hardening.
21. Release gradually with feature flags, monitoring, and rollback procedures.
22. Evaluate future extraction only after production measurements exist.

# Stage 0: Establish the Working Contract

## Objective

Create one agreed product and engineering contract before changing the prototype structure. This prevents feature work from expanding the monolith and prevents different developers from implementing incompatible interpretations of the product.

## Development Goals

- Confirm which product surfaces remain in the first production scope:
  - Discovery.
  - Community detail pages.
  - Authentication.
  - Profiles.
  - Settings.
  - Community creation.
  - Memberships.
  - Posts and comments.
  - Courses and progress.
  - Events.
  - Messaging.
  - Notifications.
  - Billing.
  - Moderation.
  - Creator operations.
- Decide which surfaces are first-release requirements and which are later capabilities.
- Record the terminology used in the UI and API.
- Define the primary user roles:
  - Visitor.
  - Member.
  - Creator.
  - Moderator.
  - Platform administrator.
- Define which roles are global and which are scoped to a community.
- Confirm route names and route ownership.
- Define the minimum supported browsers and responsive viewport range.
- Define the first production success criteria for discovery, registration, joining, creation, and checkout.
- Confirm that paid memberships, creator revenue, and entitlements are sensitive domains.
- Decide the initial release boundaries for free communities and paid communities.
- Record decisions that are intentionally deferred, including microservices, dedicated search, native mobile, and custom realtime infrastructure.

## Deliverables

- Approved product surface inventory.
- Route and terminology document.
- Role and permission matrix.
- First-release scope document.
- Deferred-decisions list.
- Initial risk register.
- Initial ownership map for product, frontend, backend, data, security, and operations.

## Verification

- Every planned feature has an owner and a release priority.
- Every route has a clear authentication requirement.
- Every protected action has a resource-scoped authorization expectation.
- Payment and entitlement behavior is explicitly separated from visual checkout behavior.
- Deferred features have a reason for being deferred.

## Exit Criteria

- The product surface inventory is approved.
- Route names and terminology are stable enough for implementation.
- The team agrees which features are required for the first production slice.
- New feature work is prohibited from being added directly to the monolithic entry file without an approved exception.

# Stage 1: Freeze the Prototype and Create a Baseline

## Objective

Preserve the useful behavior and visual language of the existing prototype while creating deterministic evidence for future migrations and regression testing.

## Development Goals

- Freeze the existing prototype as a reference implementation.
- Record the current page states and important flows:
  - Discovery page.
  - Search.
  - Category filtering.
  - Price and access filtering.
  - Community detail.
  - Login.
  - Registration.
  - Password recovery.
  - Profile.
  - Settings.
  - Community creation.
  - Plan selection.
  - Checkout panel.
  - Logout.
- Create deterministic fixture data instead of relying on random generation.
- Separate seed data used for local development from production data.
- Record known prototype limitations without attempting to hide them.
- Capture desktop, tablet, and mobile screenshots for the important routes.
- Add smoke tests for the current entry points before refactoring.
- Document the current local build and preview commands.
- Confirm that the application can be built from a clean install.
- Record existing accessibility and responsive defects as migration work rather than silently changing them during unrelated refactors.

## Deliverables

- Deterministic development fixtures.
- Baseline screenshots.
- Baseline smoke tests.
- Prototype behavior inventory.
- Known-defects list.
- Reproducible local setup instructions.
- Baseline build artifact.

## Verification

- Re-running fixture generation produces the same data.
- The production build succeeds from a clean dependency install.
- Baseline smoke tests can open the application and complete the main prototype journeys.
- Screenshots are reproducible at the selected viewport sizes.

## Exit Criteria

- Baseline screenshots and smoke tests exist.
- Random data is not required for visual or automated tests.
- The current prototype remains usable as a product reference.
- The team can distinguish intentional migration changes from regressions.

# Stage 2: Define the Target Repository and Module Structure

## Objective

Create the structural boundaries required to split the client without prematurely connecting it to a real backend.

## Development Goals

- Establish a clear application shell.
- Separate application state from feature state.
- Create a router abstraction.
- Create shared components for:
  - Header.
  - Modal.
  - Community card.
  - Buttons.
  - Inputs.
  - Toasts.
  - Loading states.
  - Empty states.
  - Error states.
- Create feature boundaries for:
  - Discovery.
  - Authentication.
  - Communities.
  - Profile.
  - Settings.
  - Posts.
  - Membership.
  - Learning.
  - Messaging.
  - Notifications.
  - Billing.
- Create domain modules for:
  - User.
  - Community.
  - Membership.
  - Post.
  - Course.
  - Money.
  - Validation.
- Create infrastructure modules for:
  - HTTP client.
  - Local repository adapter.
  - API repository adapter placeholder.
  - Analytics.
  - Feature flags.
- Define import direction rules.
- Prevent domain modules from importing browser APIs.
- Prevent UI components from importing storage directly.
- Prevent API handlers from being placed inside UI modules.
- Add lint rules or review rules that protect the intended boundaries.

## Recommended Initial Layout

```text
src/
  app/
    main.js
    app-state.js
    router.js
    render-app.js
    error-boundary.js
  components/
    Header.js
    Modal.js
    CommunityCard.js
    EmptyState.js
    LoadingState.js
    Toast.js
  features/
    discovery/
    authentication/
    communities/
    profile/
    settings/
    membership/
    posts/
    learning/
    messaging/
    notifications/
    billing/
  domain/
    community.js
    user.js
    membership.js
    post.js
    course.js
    money.js
    validation.js
  infrastructure/
    http-client.js
    local-storage-repository.js
    api-repositories.js
    analytics.js
    feature-flags.js
  styles/
    tokens.css
    reset.css
    base.css
    layout.css
    components.css
    features.css
```

## Deliverables

- New application shell.
- Module dependency rules.
- Shared component inventory.
- Feature ownership document.
- Initial directory structure.
- Migration map from old files to new modules.

## Verification

- The application still renders the baseline discovery view.
- Shared components can be rendered independently.
- A feature can be tested without importing the whole application.
- Storage calls are not present in UI components.
- Domain validation runs without a browser environment.

## Exit Criteria

- `main.js` is primarily an application composition entry point.
- Each migrated feature has an explicit owner.
- No new feature is added to the original monolith unless it is part of an active extraction.

# Stage 3: Split the Client Monolith by Feature

## Objective

Move current behavior into feature modules while preserving the product behavior and visual language.

## Development Goals

### Application Shell

- Move global state into `app-state.js`.
- Move rendering orchestration into `render-app.js`.
- Move route decisions into `router.js`.
- Keep derived state outside the authoritative state object where possible.
- Add a controlled error boundary for render and feature failures.
- Define modal ownership and focus restoration behavior.

### Discovery

- Move community querying and filtering into the discovery feature.
- Define a discovery query object.
- Separate query parsing from rendering.
- Support title, description, creator, and category search interfaces.
- Represent filters as structured values.
- Add loading, empty, error, and retry states.
- Preserve selected filters when navigating backward.

### Authentication

- Move login, registration, recovery, and session UI into the authentication feature.
- Move validation into `auth-validation.js`.
- Define success and failure states.
- Preserve form input after recoverable errors.
- Implement semantic dialog behavior.
- Remove inline event handlers and browser-global calls.

### Communities and Memberships

- Move community detail rendering into the community feature.
- Move join and leave behavior into the membership feature.
- Keep membership eligibility separate from button visibility.
- Define membership state values explicitly.

### Profile and Settings

- Separate profile data from authentication identity.
- Move settings sections into feature-owned modules.
- Define explicit save, loading, error, and success states.
- Do not treat a toast as completion of an unimplemented operation.

### Posts, Learning, Messaging, and Notifications

- Create feature placeholders with clear contracts even if some capabilities remain read-only.
- Define data shapes for posts, comments, courses, lessons, messages, and notifications.
- Ensure placeholders do not imply completed server behavior.

## Deliverables

- Feature-oriented client code.
- Explicit state ownership map.
- Shared component library for current UI needs.
- Route-independent feature views and controllers.
- Consistent loading, empty, error, success, and disabled states.

## Verification

- Baseline smoke tests still pass.
- Each feature has focused unit tests for its pure behavior.
- Browser tests confirm discovery, authentication, plan selection, and profile flows.
- Keyboard navigation works through dialogs and menus.
- Focus returns to the triggering control after modal close.

## Exit Criteria

- `main.js` only composes the application.
- No feature reads localStorage directly.
- Feature behavior is testable without rendering every other feature.
- The current product behavior is preserved unless a deliberate product decision changed it.

# Stage 4: Implement Real URL Routing and State Ownership

## Objective

Replace in-memory view switching with URL routes and make state categories explicit.

## Development Goals

- Implement routes for:
  - `/`
  - `/communities/:slug`
  - `/profile`
  - `/settings/:section`
  - `/login`
  - `/register`
- Add route handling for unknown paths.
- Support browser back and forward.
- Restore the current view after refresh.
- Preserve protected destination when redirecting to authentication.
- Serialize discovery search, category, access, price, sort, and cursor into URL query parameters.
- Define route-level loading and error states.
- Add canonical community URLs and metadata requirements.
- Separate state into:
  - URL state.
  - Server state.
  - Session state.
  - Local UI state.
  - Derived state.
- Define cache invalidation behavior for mutations.

## Deliverables

- Router module.
- Route table.
- URL state parser and serializer.
- Protected-route redirect behavior.
- Not-found route.
- Route tests.

## Verification

- Refreshing a route restores the same view.
- Browser back and forward work.
- Discovery URLs can be copied and reopened with the same filters.
- Protected routes do not expose protected data before authentication.
- Query parameters are validated and normalized.

## Exit Criteria

- A route is the source of truth for navigation.
- The UI does not use `state.view` as the only route representation.
- Search and filter state is shareable and bookmarkable.

# Stage 5: Add Domain Schemas and Structured Values

## Objective

Make the data model precise before connecting to a backend or database.

## Development Goals

- Introduce runtime schemas for API and repository boundaries.
- Define structured `Community` values.
- Define structured `User` values.
- Define structured `Membership` values.
- Define structured `Post`, `Comment`, `Course`, and `Lesson` values.
- Define structured money values:
  - `amountMinor`.
  - `currency`.
  - `interval`.
- Stop using display strings as authoritative prices.
- Store member counts as numeric values with formatting at the UI boundary.
- Define lifecycle enums:
  - Community status.
  - Membership status.
  - Payment status.
  - Content publication status.
- Define validation rules for:
  - Email addresses.
  - Usernames.
  - Community slugs.
  - Titles and descriptions.
  - Post and comment body lengths.
  - Prices and currencies.
  - Pagination cursors.
- Define safe nullable and optional field behavior.
- Reject malformed stored data with recoverable error states.

## Deliverables

- Domain schemas.
- Validation helpers.
- Money formatting and parsing utilities.
- Lifecycle state definitions.
- Structured fixture data.
- Schema error mapping for UI and API responses.

## Verification

- Invalid values fail at the boundary.
- Prices are derived from structured amounts.
- Display formatting does not change stored values.
- State transitions reject invalid combinations.
- Schema tests cover valid, invalid, optional, and nullable values.

## Exit Criteria

- No critical domain value depends on a display string.
- The client and future API can share stable data contracts.
- Invalid local data produces an explicit recoverable state.

# Stage 6: Hide Local Persistence Behind Repositories

## Objective

Keep local development working while removing direct storage knowledge from the UI.

## Development Goals

- Define repository interfaces for:
  - Communities.
  - Users and profiles.
  - Sessions.
  - Memberships.
  - Posts.
  - Courses and progress.
  - Notifications.
  - Conversations and messages.
- Implement local adapters behind those interfaces.
- Keep all localStorage access inside infrastructure code.
- Add repository validation before persistence.
- Version local storage keys and migration behavior.
- Handle corrupt, expired, or missing local data.
- Keep session identity synchronized with profile identity.
- Define repository error types.
- Ensure repository methods return domain-safe values rather than raw storage records.
- Add an API repository adapter with the same interface, initially behind a feature flag.

## Deliverables

- Repository interfaces.
- Local storage adapters.
- Local storage migration strategy.
- Repository error model.
- API adapter skeleton.
- Feature flag for selecting the local or API adapter.

## Verification

- UI features work with the repository interface only.
- Local data survives refresh where intended.
- Corrupt data produces an error state rather than crashing the application.
- The API adapter can be substituted without changing feature views.
- No feature imports localStorage directly.

## Exit Criteria

- The application is persistence-agnostic at the feature layer.
- Price, member, membership, and identity records use validated structures.
- Repository tests cover success, missing data, invalid data, and persistence failures.

# Stage 7: Build the Client Test Foundation

## Objective

Make client refactoring safe before the backend introduces more moving parts.

## Development Goals

- Configure unit test execution.
- Configure component and feature tests.
- Configure browser end-to-end tests.
- Configure accessibility checks.
- Add deterministic test fixtures and factories.
- Add tests for:
  - Discovery filtering.
  - Search normalization.
  - Sorting.
  - Pagination parsing.
  - Authentication validation.
  - Session expiry behavior.
  - Membership eligibility.
  - Plan and money formatting.
  - Card and checkout form validation.
  - Profile updates.
  - Post creation.
- Add browser tests for:
  - Visitor discovery.
  - Search and filtering.
  - Login and registration.
  - Protected route redirect.
  - Community creation flow.
  - Plan selection and checkout form states.
  - Profile editing.
  - Logout.
- Add accessibility tests for dialogs, menus, forms, and core routes.
- Add screenshot or visual regression coverage for critical product surfaces.

## Deliverables

- Unit test configuration.
- Browser test configuration.
- Accessibility test configuration.
- Deterministic factories.
- Initial CI test commands.
- Test coverage baseline.

## Verification

- Tests run in a clean environment.
- Tests do not rely on random values or production data.
- Critical client flows have at least one browser test.
- Accessibility failures are visible in CI.

## Exit Criteria

- Client refactors have a fast, repeatable feedback loop.
- Critical journeys are protected by automated tests.
- Baseline failures are documented rather than ignored.

# Stage 8: Create the Backend Modular Monolith

## Objective

Introduce a versioned, server-side application boundary while keeping deployment simple.

## Development Goals

- Create a backend application in the same repository or workspace.
- Use a modular TypeScript backend with strict validation.
- Add `/api/v1` routing.
- Create application modules for:
  - Identity.
  - Authorization.
  - Discovery.
  - Communities.
  - Memberships.
  - Social.
  - Learning.
  - Billing.
  - Messaging and notifications.
- Keep route handlers thin.
- Put business rules in application services and domain policies.
- Put persistence in repositories.
- Keep provider integrations behind adapters.
- Define request IDs and structured error responses.
- Add API health and readiness endpoints.
- Add API configuration validation.
- Add OpenAPI or generated schema contracts.

## Deliverables

- Backend application.
- Module boundaries.
- API versioning.
- Application service conventions.
- Repository conventions.
- API error format.
- OpenAPI or generated contracts.
- Health and readiness endpoints.

## Verification

- API handlers do not contain domain decisions that belong in services.
- API responses match documented schemas.
- Invalid requests receive stable error codes.
- Request IDs are present in logs and error responses.
- The backend can run independently of the browser UI.

## Exit Criteria

- The client can consume typed API contracts.
- The browser no longer needs to own critical authentication or authorization decisions.
- A second browser can eventually observe shared server data through the same API boundary.

# Stage 9: Add PostgreSQL and Database Integrity

## Objective

Create the transactional source of truth required for identity, communities, membership, content, money, and audit records.

## Development Goals

- Provision PostgreSQL for local, test, staging, and production environments.
- Choose and configure a migration-first ORM or query layer.
- Create migrations for:
  - Users.
  - Credentials.
  - Sessions.
  - Email verification.
  - Recovery requests.
  - User preferences.
  - Communities.
  - Categories and topics.
  - Community roles and permissions.
  - Memberships.
  - Membership plans.
  - Entitlements.
  - Posts and comments.
  - Reactions and bookmarks.
  - Courses and lessons.
  - Progress.
  - Conversations and messages.
  - Notifications.
  - Billing records.
  - Reports and moderation.
  - Audit events.
- Add foreign keys and unique constraints.
- Add case-insensitive unique indexes for email and slug values.
- Add active-membership uniqueness rules.
- Add provider webhook event uniqueness.
- Add indexes based on real access paths.
- Store timestamps in UTC.
- Store monetary values in integer minor units plus currency.
- Create deterministic seed data.
- Create test database reset and migration commands.

## Deliverables

- Database schema.
- Migration history.
- Database seed scripts.
- Local database setup instructions.
- Repository implementations.
- Database transaction helpers.
- Query and indexing documentation.

## Verification

- Migrations work from an empty database.
- Migrations can be applied safely in staging.
- Foreign keys reject invalid ownership relationships.
- Unique constraints prevent duplicate identities and active memberships.
- Query plans support the initial discovery and membership access paths.
- Database integration tests run against a real test database.

## Exit Criteria

- PostgreSQL is the source of truth for production data.
- No critical production state depends on localStorage.
- Database constraints protect the most important relationships.

# Stage 10: Move Identity and Sessions to the Server

## Objective

Replace client-owned authentication with secure server-side identity and session management.

## Development Goals

- Implement registration.
- Normalize and verify email addresses.
- Hash passwords with Argon2id or an equivalent memory-hard algorithm.
- Implement login and logout.
- Implement password recovery.
- Implement email verification.
- Implement session creation, rotation, expiration, and revocation.
- Use secure, HttpOnly, SameSite cookies or short-lived rotated tokens.
- Add device or session management.
- Add server-side login and registration rate limits.
- Use generic authentication failure messages.
- Prevent password hashes and recovery tokens from returning in ordinary responses.
- Add recent-authentication requirements for sensitive account changes.
- Replace local session state with server session state behind the same repository interface.
- Preserve safe post-login redirect destinations.

## Deliverables

- Identity API.
- Session API.
- Registration and login forms connected to the API.
- Email verification workflow.
- Recovery workflow.
- Session revocation workflow.
- Authentication audit events.
- Rate limiting rules.

## Verification

- Passwords never appear in logs or API responses.
- Sessions rotate after login and privilege changes.
- Expired and revoked sessions cannot access protected endpoints.
- Login and recovery endpoints are rate-limited.
- Browser tests cover registration, login, logout, expiry, and recovery.
- A client cannot create an authenticated session by editing localStorage.

## Exit Criteria

- Browser authentication is server-authoritative.
- Protected API requests reject unauthenticated callers.
- Session security behavior is covered by integration and end-to-end tests.

# Stage 11: Implement Authorization and Resource-Scoped Permissions

## Objective

Ensure that every protected read and mutation is authorized against the actual resource and community role.

## Development Goals

- Define global platform roles.
- Define community-scoped roles.
- Define permission policies for:
  - Reading public content.
  - Reading member content.
  - Joining communities.
  - Posting and commenting.
  - Managing members.
  - Publishing content.
  - Moderating content.
  - Managing billing and payouts.
  - Managing community settings.
- Separate authentication from authorization.
- Add authorization checks in application services.
- Add repository-level defensive checks where appropriate.
- Define behavior for banned, suspended, pending, paused, and cancelled memberships.
- Prevent client-provided owner, role, price, and entitlement values from being trusted.
- Add policy tests for each role and lifecycle state.

## Deliverables

- Role and permission policies.
- Authorization service.
- Permission matrix.
- Protected route and mutation checks.
- Authorization test suite.

## Verification

- A hidden client button is never the only protection.
- Users cannot access another community's protected resources by changing IDs.
- Moderators are limited to their assigned community scope.
- Creators cannot grant themselves platform-level permissions.
- Banned and suspended memberships are denied according to policy.

## Exit Criteria

- Every protected API operation has an explicit authorization path.
- Authorization decisions are tested independently of UI visibility.
- Critical access decisions are based only on server state.

# Stage 12: Migrate Discovery and Community Management

## Objective

Move the central marketplace and community lifecycle from static data to server-backed workflows.

## Development Goals

### Discovery

- Implement public community listing API.
- Support search by title, description, creator, and category.
- Support category and topic facets.
- Support free, paid, and price-range filters.
- Support access-policy filters.
- Support stable sorting by trending, top, and newest.
- Support cursor pagination.
- Respect publication state and visibility rules.
- Define a stable trending calculation.
- Avoid unbounded wildcard scans.
- Add empty, loading, retry, and error states.

### Community Management

- Implement community creation.
- Implement draft, review, published, suspended, and archived states.
- Implement slugs and slug changes with aliases or redirects.
- Implement branding and cover media references.
- Implement category and topic assignment.
- Implement access-policy configuration.
- Implement creator ownership and community roles.
- Implement publish and archive workflows.

## Deliverables

- Discovery endpoints.
- Community endpoints.
- Public community detail route.
- Creator community management screens.
- Search query contract.
- Cursor pagination contract.
- Publication lifecycle implementation.
- Initial discovery indexes.

## Verification

- Only published visible communities appear in public discovery.
- Search and filtering return stable results.
- Pagination does not duplicate or skip records.
- A creator cannot edit another creator's community.
- A suspended community is not publicly discoverable.
- Public routes work after refresh and have canonical URLs.

## Exit Criteria

- Discovery is API-backed.
- Community state is database-backed.
- A second browser sees the same community data.
- Community lifecycle rules are enforced server-side.

# Stage 13: Migrate Profiles and Settings

## Objective

Move user-facing account and profile workflows to validated server data.

## Development Goals

- Implement current-user profile API.
- Separate authentication identity from public profile data.
- Support display name, username, bio, location, avatar reference, and social links.
- Add profile visibility settings.
- Implement notification preferences.
- Implement account security settings.
- Implement account deletion request.
- Implement data export request.
- Implement payment history read model.
- Implement payment-method references without exposing raw payment details.
- Implement theme and accessibility preferences.
- Add optimistic UI only where rollback behavior is defined.
- Preserve form values after recoverable server failures.

## Deliverables

- Profile API.
- Settings API.
- Profile and settings feature modules.
- Validation and error display behavior.
- Account deletion and export request placeholders or workflows.
- Profile audit events for sensitive changes.

## Verification

- Profile changes survive refresh and subsequent login.
- Unauthorized users cannot modify another profile.
- Sensitive changes require recent authentication where appropriate.
- Settings are persisted server-side.
- Form errors identify fields without losing entered values.

## Exit Criteria

- Profile and settings no longer depend on browser-owned user records.
- Account changes are validated, authorized, and auditable.

# Stage 14: Implement Memberships and Free Access

## Objective

Build the access-control foundation before adding paid billing.

## Development Goals

- Implement free community membership activation.
- Implement private-community join requests.
- Implement membership statuses:
  - Pending.
  - Active.
  - Paused.
  - Cancelled.
  - Banned.
- Implement role assignment within communities.
- Implement leave behavior.
- Implement member removal and ban behavior.
- Implement entitlement checks for protected content.
- Make membership transitions transactional.
- Prevent duplicate active memberships.
- Add membership notifications.
- Add membership history and audit events.

## Deliverables

- Membership API.
- Membership repository.
- Join and leave workflows.
- Private-community approval workflow.
- Membership policy service.
- Entitlement query interface.
- Membership audit events.

## Verification

- A user can join a free public community.
- A user cannot create duplicate active memberships.
- A banned user cannot access protected content.
- Private membership requires approval.
- Membership changes are visible across browser sessions.
- Access is denied when entitlement state is inactive.

## Exit Criteria

- The membership module is the authority for access.
- Protected feature code asks the membership contract rather than checking local UI state.
- Free access works end to end before paid access begins.

# Stage 15: Implement Posts, Comments, Reactions, and Moderation Basics

## Objective

Add safe social participation with explicit content state and initial moderation controls.

## Development Goals

- Implement post creation and listing.
- Implement comments and threaded replies.
- Implement reactions.
- Implement bookmarks.
- Implement mentions with validated references.
- Define post and comment size limits.
- Define edit and deletion behavior.
- Add publication states:
  - Published.
  - Hidden.
  - Deleted.
  - Under review.
- Implement content reports.
- Add basic moderator hide and restore operations.
- Add moderation action records.
- Add audit history where retention requires it.
- Safely render user-generated text.
- Validate links and attachment metadata.
- Paginate feeds and comments.

## Deliverables

- Social API.
- Feed and composer features.
- Comment and reaction interactions.
- Report workflow.
- Moderator review actions.
- Content validation and safe rendering.
- Feed pagination.

## Verification

- Users cannot post without appropriate membership permission.
- Hidden content is not shown to unauthorized viewers.
- Moderation actions record actor, scope, reason, previous state, and new state.
- User content cannot inject executable markup.
- Feed queries remain bounded and paginated.
- Posts and comments survive refresh and appear across sessions.

## Exit Criteria

- Social participation is server-backed and permission-aware.
- Initial moderation behavior is auditable.
- Content safety rules are tested.

# Stage 16: Implement Learning and Progress

## Objective

Provide courses, lessons, access checks, and durable member progress.

## Development Goals

- Implement courses and course sections.
- Implement lessons with types:
  - Video.
  - Text.
  - Download.
  - External resource.
- Implement draft, published, and archived course states.
- Implement lesson ordering.
- Implement entitlement checks before protected lesson access.
- Implement lesson completion.
- Implement resume playback position.
- Implement course progress aggregation.
- Implement creator progress analytics read models.
- Ensure progress is scoped by user and lesson.
- Add idempotent completion commands.
- Add access and progress error states.

## Deliverables

- Learning API.
- Course and lesson management features.
- Member classroom features.
- Progress repository and service.
- Progress read models.
- Course and lesson test fixtures.

## Verification

- Draft content is not visible to ordinary members.
- Protected lessons require active entitlement.
- Lesson completion is idempotent.
- Resume position is persisted correctly.
- Progress is not represented only as a mutable total.
- Creator analytics do not expose private member data improperly.

## Exit Criteria

- Members can consume published entitled content.
- Progress survives refresh and device changes.
- Learning access uses membership and entitlement contracts.

# Stage 17: Implement Events and Reminders

## Objective

Add time-aware community events without coupling calendar behavior to the UI.

## Development Goals

- Implement event creation and editing.
- Implement draft and published event states.
- Store event times in UTC.
- Store the intended IANA time zone.
- Implement RSVP and capacity.
- Implement event cancellation.
- Implement calendar export.
- Implement reminder scheduling.
- Define behavior for cancelled events and changed times.
- Add event permissions by role and membership.
- Add event notifications through jobs.

## Deliverables

- Event domain model.
- Event API.
- Calendar and RSVP UI.
- Reminder job definitions.
- Time-zone conversion utilities.
- Event notification templates.

## Verification

- Events display correctly in the user's time zone.
- Capacity rules are transactional.
- Duplicate RSVPs are prevented.
- Cancelled events do not trigger stale reminders.
- Reminder jobs are retryable and idempotent.

## Exit Criteria

- Event scheduling is time-zone-safe.
- Event notifications are generated from durable state and jobs.

# Stage 18: Implement Messaging and Notifications

## Objective

Add direct communication with clear permission, privacy, moderation, and delivery rules.

## Development Goals

### Messaging

- Define who may start a conversation.
- Define whether membership is required.
- Implement conversations and participants.
- Implement messages.
- Implement read cursors.
- Implement message pagination.
- Implement blocking and messaging restrictions.
- Implement message reports.
- Define retention and deletion behavior.
- Start with ordinary API polling or a managed realtime adapter.
- Avoid requiring custom websockets before usage proves the need.

### Notifications

- Implement notification records.
- Generate notifications from domain events.
- Implement read state.
- Implement notification preferences.
- Implement quiet hours.
- Implement email delivery jobs.
- Track delivery attempts and failures.
- Version notification payloads so old notifications remain renderable.

## Deliverables

- Messaging API.
- Notification API.
- Conversation and message UI.
- Notification inbox.
- Read-state behavior.
- Notification preference settings.
- Delivery job and failure tracking.

## Verification

- Users cannot message blocked or unauthorized recipients.
- Messages are paginated and bounded.
- Read state is server-backed.
- Notification delivery retries are safe.
- Notification failures are visible operationally without exposing sensitive content.
- In-app and email behavior derives from durable domain events.

## Exit Criteria

- Messaging permissions and moderation are explicit.
- Notification state is not trusted from browser badges.
- Delivery failures have retry and observability behavior.

# Stage 19: Implement Billing, Checkout, and Entitlements

## Objective

Introduce paid memberships safely without allowing client state or payment redirects to grant access.

## Development Goals

- Define structured plans, prices, currencies, and billing intervals.
- Implement billing customer references.
- Implement provider checkout-session creation.
- Keep provider price IDs server-owned.
- Implement payment transaction state.
- Implement subscription state where applicable.
- Implement invoices and receipts.
- Implement refunds and cancellations.
- Implement failed renewal behavior.
- Implement disputes and chargebacks.
- Verify webhook signatures.
- Deduplicate webhook event IDs.
- Handle out-of-order and retried provider events.
- Update payment state and entitlement state in transactions.
- Write outbox events for notifications and receipts.
- Keep creator revenue ledger entries separate from current balance.
- Add payout onboarding and payout status.
- Add affiliate attribution only after core billing state is reliable.
- Never store raw card details.
- Never grant paid access from a client redirect alone.

## Checkout Flow

1. The browser requests checkout for a selected plan.
2. The API verifies the community and plan are active.
3. The API creates the provider checkout session using server-owned prices.
4. The browser completes payment with the provider.
5. The provider sends a signed webhook.
6. The webhook handler verifies and deduplicates the event.
7. The billing module records payment state transactionally.
8. The membership module activates or updates entitlement.
9. Receipt and notification jobs are queued.
10. The browser refreshes authoritative server state.

## Deliverables

- Billing domain model.
- Provider adapter.
- Checkout API.
- Webhook endpoint.
- Webhook event storage.
- Entitlement activation service.
- Subscription and refund workflows.
- Revenue ledger.
- Billing UI and payment history.
- Reconciliation job.

## Verification

- Browser-provided prices are ignored by the server.
- Invalid plans cannot create checkout sessions.
- Webhook retries do not duplicate payments, memberships, or entitlements.
- Payment redirects without verified webhook state do not grant access.
- Refunds and cancellations update entitlements correctly.
- Provider records can be reconciled with internal state.
- Payment secrets and raw card data never enter logs or database records.

## Exit Criteria

- Paid access is granted only from verified internal payment state.
- Payment lifecycle states and entitlement lifecycle states are explicit.
- Billing behavior has integration, contract, and end-to-end coverage using provider test fixtures.

# Stage 20: Implement Media Storage and Processing

## Objective

Replace uncontrolled external image URLs and unsafe uploads with controlled media handling.

## Development Goals

- Provision S3-compatible object storage.
- Implement server-issued presigned uploads.
- Validate MIME type, file size, dimensions, and extension server-side.
- Scan uploads for malware where required.
- Store media metadata in PostgreSQL.
- Generate controlled image variants.
- Serve public media through a CDN.
- Serve private media through signed URLs.
- Support avatars, community covers, attachments, and creator media.
- Add upload progress, retry, and failure states.
- Prevent unapproved media from becoming visible before processing completes.
- Add lifecycle rules for abandoned and deleted media.

## Deliverables

- Media metadata model.
- Upload authorization API.
- Object storage adapter.
- Media processing worker.
- Responsive image variants.
- CDN and signed-delivery configuration.
- Media moderation and deletion behavior.

## Verification

- The server rejects invalid file metadata.
- Private media cannot be fetched without authorization.
- Failed processing does not publish unusable media.
- Deleted records follow the retention policy.
- Uploads are not trusted based only on browser file names.

## Exit Criteria

- Production media is not sourced directly from uncontrolled external URLs.
- Media permissions and processing state are represented explicitly.

# Stage 21: Add Outbox, Workers, and Scheduled Jobs

## Objective

Make asynchronous work reliable, retryable, observable, and decoupled from request latency.

## Development Goals

- Implement an outbox table and publishing process.
- Implement worker processes.
- Implement retry policies and backoff.
- Implement dead-letter handling.
- Implement idempotency keys and deduplication.
- Add jobs for:
  - Email verification.
  - Password recovery email.
  - Notifications.
  - Search indexing.
  - Media processing.
  - Event reminders.
  - Payment reconciliation.
  - Analytics aggregation.
  - Data export.
  - Cleanup and retention.
- Add scheduled job runner.
- Add job metrics and queue depth metrics.
- Ensure database mutations and outbox events are committed together.
- Define behavior when workers are unavailable.

## Deliverables

- Outbox implementation.
- Worker application.
- Job registry.
- Retry and dead-letter handling.
- Scheduled job definitions.
- Worker dashboards and alerts.
- Idempotency strategy.

## Verification

- A committed domain mutation cannot silently lose its required asynchronous event.
- Retried jobs do not duplicate user-visible side effects.
- Dead-letter jobs are visible and recoverable.
- Worker downtime does not corrupt transactional state.
- Queue backlogs trigger operational alerts.

## Exit Criteria

- Asynchronous workflows are durable and observable.
- Important background side effects have explicit retry and recovery behavior.

# Stage 22: Complete Moderation, Trust, and Auditability

## Objective

Make community safety, administrative intervention, and sensitive changes auditable.

## Development Goals

- Implement reports for posts, comments, messages, users, and communities.
- Implement moderation cases and review queues.
- Implement hide, restore, warn, suspend, and ban actions.
- Implement user restrictions and community restrictions.
- Implement appeals where required.
- Record actor, scope, reason, target, previous state, new state, and timestamp.
- Make audit records append-only from the application perspective.
- Audit sensitive actions:
  - Authentication events.
  - Role changes.
  - Membership changes.
  - Payment adjustments.
  - Refunds.
  - Entitlement changes.
  - Content moderation.
  - Account deletion and export.
- Define administrator access controls and review requirements.
- Ensure audit records exclude secrets and unnecessary personal data.

## Deliverables

- Moderation module.
- Review queue UI.
- Restriction policies.
- Audit event model.
- Audit log queries and retention policy.
- Moderator and administrator permission tests.

## Verification

- Moderation actions cannot be performed outside the actor's scope.
- Every sensitive action produces an audit record.
- Audit records cannot be silently rewritten through ordinary application paths.
- Appeals and restoration behavior preserve prior state information.

## Exit Criteria

- Safety workflows are usable by authorized staff.
- Sensitive changes can be investigated after the fact.
- Audit and retention rules are documented and tested.

# Stage 23: Establish the Design System and Accessibility Baseline

## Objective

Make the interface consistent, responsive, keyboard-operable, and safe for assistive-technology users.

## Development Goals

- Split CSS into stable layers:
  - Tokens.
  - Reset.
  - Base.
  - Layout.
  - Components.
  - Features.
  - Utilities.
- Define semantic tokens for color, spacing, type, radii, shadows, and breakpoints.
- Remove repeated selector overrides.
- Define component states:
  - Default.
  - Hover.
  - Focus.
  - Disabled.
  - Loading.
  - Error.
  - Empty.
  - Success.
- Use semantic elements for controls and dialogs.
- Associate labels and descriptions with form inputs.
- Implement focus trapping and restoration for dialogs.
- Implement Escape behavior for dismissible overlays.
- Add visible focus indicators.
- Ensure sufficient color contrast.
- Ensure color is not the only state signal.
- Support reduced motion.
- Maintain usable touch targets.
- Verify mobile layouts for discovery, checkout, settings, chat, and notifications.
- Ensure no essential workflow depends on hover.
- Add screen-reader announcements for errors, saves, new messages, and important state changes.

## Deliverables

- Layered design system styles.
- Accessible shared components.
- Responsive breakpoint guidance.
- Accessibility test configuration.
- Keyboard navigation checklist.
- Visual regression snapshots.

## Verification

- Automated accessibility checks pass for critical screens.
- Keyboard-only users can complete authentication, discovery, joining, checkout, posting, and settings workflows.
- Dialog focus is contained and restored.
- Mobile viewports do not crop or overlap essential controls.
- Reduced-motion behavior works.

## Exit Criteria

- Accessibility is part of feature completion, not a final visual polish step.
- Shared components provide consistent behavior across features.

# Stage 24: Add Observability and Operational Controls

## Objective

Make production behavior measurable, diagnosable, and recoverable.

## Development Goals

### Logging

- Use structured JSON logs.
- Include timestamp, severity, service, module, request ID, operation, duration, outcome, and safe resource identifiers.
- Never log passwords, raw session tokens, payment secrets, full private messages, or unnecessary personal data.

### Metrics

Track:

- Request volume, errors, and latency by route.
- Authentication success and failure.
- Rate-limit events.
- Discovery result counts and empty searches.
- Membership activation and cancellation.
- Payment success, failure, refund, dispute, and webhook lag.
- Queue depth, retries, and dead letters.
- Database query latency and pool saturation.
- Media processing failures.
- Notification delivery success.

### Tracing

- Add request tracing across web, API, database, and workers.
- Correlate webhook processing with resulting payment and entitlement changes.
- Correlate outbox events with worker jobs.

### Alerts and Runbooks

- Define alerts for availability, error rate, latency, database saturation, queue backlog, payment webhook failures, and authentication abuse.
- Assign an owner to every alert.
- Document how to confirm, mitigate, recover, and follow up.
- Add dashboards for user-facing and operational workflows.

## Deliverables

- Structured logging.
- Metrics instrumentation.
- Distributed tracing.
- Dashboards.
- Alert definitions.
- Runbooks.
- Incident response contacts.

## Verification

- A failed critical workflow can be traced across application layers.
- Alerts identify actionable failures rather than raw noise.
- Logs contain enough context without exposing secrets.
- Runbooks are usable by someone other than the original implementer.

## Exit Criteria

- Critical workflows have measurable latency, failure, and throughput behavior.
- On-call ownership is explicit.
- Operational failure is visible before users report it.

# Stage 25: Configure Environments, CI/CD, and Safe Delivery

## Objective

Create repeatable delivery pipelines with separation between local, test, staging, and production systems.

## Development Goals

- Maintain separate environments for:
  - Local development.
  - Test or CI.
  - Staging.
  - Production.
- Keep environment configuration outside source control where appropriate.
- Use a secret manager or deployment platform for secrets.
- Never copy production data into development without approved anonymization.
- Add required checks for every change:
  - Formatting.
  - Linting.
  - Type checking.
  - Unit tests.
  - Integration tests.
  - Contract validation.
  - Accessibility checks.
  - Production build.
  - Dependency scanning.
  - Secret scanning.
- Build immutable artifacts.
- Run backward-compatible migrations in a controlled stage.
- Deploy the application.
- Run smoke tests.
- Monitor error and latency metrics.
- Use feature flags for risky releases.
- Define application rollback.
- Define database rollback or forward-fix strategy.
- Add deployment audit records.

## Deliverables

- CI pipeline.
- Staging environment.
- Production deployment process.
- Secret-management configuration.
- Feature-flag system.
- Smoke-test suite.
- Deployment and rollback documentation.

## Verification

- A pull request cannot merge without the required checks.
- Staging deployments are reproducible.
- Smoke tests verify the deployed artifact.
- Secrets are not present in source control or client bundles.
- Rollback steps have been executed successfully.

## Exit Criteria

- Releases are repeatable and reviewable.
- Environments are separated.
- Risky changes can be enabled gradually and disabled safely.

# Stage 26: Performance, Load, and Resilience Hardening

## Objective

Measure the system against realistic usage and failure conditions rather than relying on architecture assumptions.

## Development Goals

- Define representative fixture volumes.
- Measure public discovery p95 latency.
- Measure search p95 latency.
- Measure authenticated profile reads.
- Measure post creation under concurrency.
- Measure notification queue throughput.
- Measure payment webhook retries.
- Measure database connection pool utilization.
- Measure cache hit ratio.
- Test database slow or unavailable.
- Test email provider unavailable.
- Test payment provider delayed.
- Test queue worker stopped.
- Test search adapter unavailable.
- Test object-storage upload failure.
- Add pagination limits to every large collection.
- Add cache only after measuring a clear benefit.
- Use indexes based on query plans.
- Confirm no unbounded member, message, feed, or comment queries.
- Define initial SLO, RPO, and RTO targets.

## Deliverables

- Load-test scenarios.
- Resilience-test scenarios.
- Performance baseline report.
- Query-plan review.
- SLO document.
- RPO and RTO document.
- Capacity and scaling assumptions.

## Verification

- Performance targets are measured against representative data.
- Failure tests produce safe degraded behavior.
- Queue retries and provider outages do not create duplicate state.
- Recovery procedures are tested rather than assumed.

## Exit Criteria

- Critical workflows meet their agreed initial targets.
- Known bottlenecks have owners and follow-up work.
- The system can tolerate defined dependency failures without corrupting data.

# Stage 27: Security and Privacy Hardening

## Objective

Perform the security work required before describing the platform as production-ready.

## Development Goals

- Review authentication and session security.
- Review resource-scoped authorization.
- Review CSRF and CORS configuration.
- Configure Content Security Policy.
- Apply server-side rate limits.
- Validate all API inputs.
- Safely render all user-generated content.
- Validate and scan uploads.
- Verify webhook signatures.
- Check secrets and dependencies.
- Review data retention and deletion behavior.
- Implement account export and deletion requests.
- Define retention periods for messages, moderation records, payments, and audit events.
- Review analytics for privacy impact.
- Complete dependency scanning.
- Complete secret scanning.
- Complete penetration testing or an appropriately scoped security review.
- Document security incident response.

## Deliverables

- Security review report.
- Threat model.
- Privacy and retention policy.
- Security test suite.
- Dependency and secret scan results.
- Incident response procedure.
- Remediation plan for findings.

## Verification

- Critical findings are resolved or formally accepted with owners and dates.
- Authorization tests cover cross-user and cross-community access.
- No secrets or raw payment details are exposed.
- Data export and deletion behavior follows the approved policy.
- Webhook and session security are tested against replay and retry behavior.

## Exit Criteria

- Security-sensitive state is server-authoritative.
- Critical security risks have been addressed.
- Privacy and retention behavior is documented and implemented.

# Stage 28: Production Readiness Review

## Objective

Evaluate the complete system against the architecture's 10/10 definition of done.

## Product and Data Review

- User roles and permissions are documented.
- Community lifecycle states are implemented.
- Membership and entitlement rules are implemented.
- Pricing and currency are structured.
- Retention and deletion policies are approved.
- Seed and fixture data are deterministic.

## Application Review

- URL routing supports refresh and browser navigation.
- Loading, empty, error, retry, and success states exist.
- No critical feature depends on browser-global functions.
- No critical feature reads localStorage directly.
- User-generated content is safely rendered.
- Client state cannot grant access.
- Large collections are paginated.
- APIs return stable, validated contracts.

## Security Review

- Server-side authentication is active.
- Passwords use a memory-hard hash.
- Sessions are secure, rotated, expirable, and revocable.
- Authorization is resource-scoped.
- CSRF, CORS, CSP, and rate limits are configured.
- Uploads are validated and scanned.
- Secrets are managed outside source control.
- Security events are audited.

## Payments Review

- Provider webhooks are signature-verified.
- Webhooks are idempotent.
- Payment state and entitlements are transactional.
- Refunds, cancellations, disputes, and failed renewals are handled.
- Reconciliation jobs exist.
- Paid access cannot be granted by a client redirect.

## Quality Review

- Unit tests cover domain rules.
- Integration tests cover repositories and transactions.
- Contract tests validate API shapes.
- End-to-end tests cover critical journeys.
- Accessibility tests run in CI.
- Load tests have been run against representative data.
- Dependency and secret scans pass.
- Visual regressions are reviewed.

## Operations Review

- Structured logs and request IDs are available.
- Metrics and traces cover critical workflows.
- Alerts have owners and runbooks.
- Backups are automated.
- Restore tests have passed.
- Rollback has been rehearsed.
- Incident response contacts are documented.
- SLOs, RPO, and RTO are measured.

## Exit Criteria

The system is ready for its defined production scope only when every required checklist item is complete or has an explicitly approved exception. Exceptions must include a risk description, an owner, a mitigation, and a review date.

# Stage 29: Gradual Release and Post-Release Learning

## Objective

Release the system safely, measure real usage, and use evidence to guide future architecture decisions.

## Development Goals

- Release to internal users first.
- Enable features with flags where risk is meaningful.
- Monitor authentication, discovery, membership, checkout, webhook, and queue metrics.
- Monitor error reports and user feedback.
- Verify backups and recovery during the release period.
- Track onboarding and conversion funnels.
- Track empty searches and discovery success.
- Track membership activation, cancellation, refund, and retention.
- Track creator publishing and revenue workflows.
- Review accessibility feedback.
- Review performance on representative mobile connections.
- Hold a post-release architecture review.
- Record decisions about search infrastructure, realtime messaging, service extraction, and mobile clients only after evidence exists.

## Deliverables

- Release plan.
- Feature-flag plan.
- Monitoring dashboard review.
- Post-release incident log.
- Product analytics report.
- Architecture decision records for future changes.
- Updated roadmap based on measured demand.

## Exit Criteria

- The first release is stable for its declared scope.
- Monitoring and support ownership are active.
- Future complexity is justified by measured usage or clear organizational needs.

# Final Implementation Checklist

## Foundation

- [ ] Product scope is approved.
- [ ] Roles and permissions are documented.
- [ ] Routes and terminology are documented.
- [ ] Prototype screenshots and smoke tests exist.
- [ ] Fixtures are deterministic.
- [ ] Repository and module boundaries are defined.

## Frontend Architecture

- [ ] Application state is separated from feature state.
- [ ] Real URL routing is implemented.
- [ ] UI components do not access storage directly.
- [ ] Features have isolated views, controllers, validation, and API adapters.
- [ ] Domain values are structured.
- [ ] Loading, empty, error, retry, success, and disabled states exist.
- [ ] Dialog and focus behavior is accessible.

## Persistence and Backend

- [ ] Repository interfaces exist.
- [ ] Local and API adapters share contracts.
- [ ] Versioned API exists.
- [ ] PostgreSQL migrations exist.
- [ ] Foreign keys and unique constraints exist.
- [ ] Database integration tests pass.
- [ ] Server state is authoritative.

## Identity and Authorization

- [ ] Registration and verification work.
- [ ] Login, logout, recovery, and session revocation work.
- [ ] Passwords are securely hashed.
- [ ] Sessions are secure and rotated.
- [ ] Authorization is resource-scoped.
- [ ] Rate limits are active.

## Product Capabilities

- [ ] Discovery and community lifecycle work through the API.
- [ ] Profiles and settings persist through the API.
- [ ] Free memberships work transactionally.
- [ ] Posts, comments, reactions, and moderation work.
- [ ] Courses, lessons, and progress work.
- [ ] Events and reminders work.
- [ ] Messaging permissions and pagination work.
- [ ] Notifications and delivery tracking work.

## Payments and Media

- [ ] Provider checkout uses server-owned prices.
- [ ] Webhooks are verified and idempotent.
- [ ] Entitlements update transactionally.
- [ ] Refunds, cancellations, disputes, and renewals are handled.
- [ ] Reconciliation jobs exist.
- [ ] Media uploads are validated and scanned.
- [ ] Private media access is authorized.

## Operations and Quality

- [ ] Outbox and workers are operating.
- [ ] Structured logs, metrics, and traces exist.
- [ ] Alerts have owners and runbooks.
- [ ] CI checks are required.
- [ ] Accessibility, visual, unit, integration, contract, and end-to-end tests pass.
- [ ] Load and resilience tests are complete.
- [ ] Backups and restore tests pass.
- [ ] Rollback has been rehearsed.
- [ ] Security and privacy reviews are complete.
- [ ] Production ownership is explicit.

# Final Principle

A polished interface is not the completion point for SkillSpace. The implementation is complete only when the visible workflow, the domain rules, the data model, the security boundary, the failure behavior, and the operational evidence all agree.

The practical path is to keep the product understandable, move one boundary at a time, verify each stage, and postpone infrastructure complexity until real measurements justify it.
