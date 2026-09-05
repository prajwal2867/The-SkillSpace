# SkillSpace

**SkillSpace** is a modern, feature-rich web platform prototype designed for creators, educators, entrepreneurs, and learners to build, discover, and grow vibrant online communities. 

Built with clean Vanilla JavaScript, standard modular architecture, and a curated design system, SkillSpace offers a sleek user experience comparable to top community platforms like Skool and Circle.


---

## What Is This All About?

SkillSpace is an all-in-one online platform designed for creators, coaches, and educators to host community discussions, online courses, and event calendars in a single location.

### Core Mission & Purpose

1. **Unifying Creators & Learners**:
   - Creators can showcase their bootcamps, masterclasses, and private mastermind rooms.
   - Learners can easily discover top-rated communities across diverse fields such as AI, Web Development, Short-Form Editing, Marketing, Fitness, and Design.

2. **Full-Featured Prototype Experience**:
   - **Community Discovery**: Browse curated rooms filtered by categories (*Tech, Money, Hobbies, Self-improvement*), access model (*Free vs. Paid*, *Public vs. Private*), and activity level (*Trending / Top*).
   - **Deep Dive Pages**: Explore comprehensive community landing pages featuring video/media galleries, structured curriculum checklists, member metrics, and verified student reviews.
   - **Gamification & Activity Tracking**: Track member participation with a GitHub-style 365-day contribution heat map and member badges.
   - **Realistic Prototype Data**: Powered by an integrated dataset of 70+ dummy users, realistic course feedback, live activity feeds, and chat notifications to simulate a thriving production environment.

3. **High-Performance Lightweight Architecture**:
   - Demonstrates state management, dynamic DOM rendering, theme switching (Light/Dark mode), and local storage persistence using pure **Vanilla JavaScript (ES Modules)** and **Vanilla CSS tokens**, bundled with Vite for ultra-fast performance.

---

## Features

- **Discover & Filter Communities**:
  - Filter communities by category (*Tech, Hobbies, Money, Health, Self-improvement, Spirituality, Music, etc.*).
  - Multi-attribute filtering by price (*Free / Paid*), access type (*Public / Private*), and sorting criteria (*Trending / Top*).
  - Instant client-side search across titles, descriptions, and categories.

- **Immersive Community View**:
  - Detailed overview pages featuring video/media galleries, structured curriculum highlights, and about sections.
  - Authentic course reviews and member feedback linked to realistic dummy user profiles.
  - Creator profiles detailing background, bio, avatar, and credentials.
  - One-click join/leave group flow with member counts and online activity indicators.
  - Convenient topbar navigation with an SVG back button for seamless page transitions.

- **User Management & Profiles**:
  - Interactive profile dashboard with a GitHub-style 365-day contribution heat map.
  - Profile settings editor (name, bio, location, avatar updates, theme customization).
  - Dropdown user menu with quick access to settings, affiliates, language options, and account controls.
  - Persisted user sessions via LocalStorage (`store.js`).

- **Dark Mode & Theme System**:
  - Built-in theme switcher with CSS variable design tokens supporting seamless Light and Dark modes.

- **Generated Dummy Data**:
  - Integrated dataset of 70+ synthetic user profiles, realistic community reviews, activity logs, and chat notifications.

---

## Tech Stack

- **Frontend Core**: JavaScript (ES6+ Modules), HTML5
- **Styling**: Vanilla CSS3 (Custom Properties / Design Tokens, Flexbox, CSS Grid, Transitions)
- **Tooling & Bundler**: [Vite](https://vitejs.dev/)
- **Typography**: Inter (Google Fonts)

---

## Project Structure

```text
The SkillSpace/
├── src/
│   ├── domain/
│   │   └── data.js           # Categories, initial communities, demo users, & reviews
│   ├── services/
│   │   └── store.js          # LocalStorage persistence & session management
│   ├── main.js               # Application state, UI components, rendering & event handling
│   └── styles.css            # Core design tokens, global styles, animations & layout
├── dummy_data.js             # 70+ pre-generated user profiles, posts, & course datasets
├── generate_data.js          # Generator script for mock datasets
├── index.html                # Main entry HTML document
├── package.json              # Project dependencies & Vite scripts
└── README.md                 # Project documentation
```

---

## Getting Started

### Prerequisites

Make sure you have **Node.js** (v16 or higher) and **npm** installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/The-SkillSpace.git
   cd The-SkillSpace
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server

Start the local development server with instant HMR (Hot Module Replacement):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### Production Build

To build the static production bundle:
```bash
npm run build
```
The optimized production files will be output to the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the issues page if you want to contribute.

---

## License

This project is open-source and available under the [MIT License](LICENSE).
