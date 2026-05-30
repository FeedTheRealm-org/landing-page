# Feed the Realm — Landing Page

Public-facing website for the Feed the Realm game. Built with React, TypeScript, and Vite. Content (blog posts, media, page copy) is managed through static YAML/Markdown files in `public/data/`.

## Technologies

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router v7](https://reactrouter.com/)
- [MUI (Material UI)](https://mui.com/)
- [Tailwind CSS v4](https://tailwindcss.com/)

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Development

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Build

```bash
# Type-check and build for production
pnpm build

# Preview the production build locally
pnpm preview
```

### Lint

```bash
pnpm lint
```

## Structure

```
src/
├── pages/          # Top-level route views
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Features.tsx
│   ├── Blog.tsx
│   ├── BlogPost.tsx
│   └── Media.tsx
├── components/     # Shared UI components (Header, Footer, Dialogs, etc.)
├── services/       # API client and asset service modules
└── assets/         # Static assets

public/
└── data/           # Content source files (YAML, Markdown, images)
    ├── metadata.yaml       # Site-wide metadata and social links
    ├── home-page/
    ├── about-page/
    ├── features-page/
    ├── blog-page/
    └── media-page/
```

## Content Management

All page content is driven by static files under `public/data/`. To update text, blog posts, or media:

1. Edit or add the relevant YAML/Markdown files in the corresponding `public/data/<page>-page/` directory.
2. Site-wide metadata (description, social links) lives in `public/data/metadata.yaml`.

No rebuild is required for content-only changes when running in development mode.
