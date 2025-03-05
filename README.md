# VitePress 2.0 Project

This is a documentation site built with VitePress 2.0.0-alpha.3.

## Getting Started

### Installation

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm docs:dev
```

### Build

Build the site for production:

```bash
pnpm docs:build
```

### Preview

Preview the production build locally:

```bash
pnpm docs:preview
```

## Testing with Playwright

This project uses Playwright for end-to-end testing.

### Install Playwright

```bash
pnpm add -D @playwright/test
pnpm exec playwright install
```

### Run Tests

```bash
pnpm test
```

## Project Structure

- `.vitepress/` - VitePress configuration
- `public/` - Static assets
- `index.md` - Home page
- `*.md` - Documentation pages 