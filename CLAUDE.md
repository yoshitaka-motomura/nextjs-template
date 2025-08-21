# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production app with Turbopack
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint (flat config)
- `pnpm test` - Run Jest test suite
- `pnpm test:watch` - Run Jest in watch mode
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check formatting with Prettier

## Project Architecture

This is a Next.js 15 project using the App Router architecture with the following key technologies:

### Core Stack
- **Framework**: Next.js 15.5.0 with App Router
- **React**: 19.1.0
- **TypeScript**: Full TypeScript setup with strict mode
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Components**: shadcn/ui (configured via `components.json`), Radix Label/Slot
- **Icons**: react-icons
- **Testing/Formatting/Linting**: Jest (jsdom + babel-jest), Prettier, ESLint v9 flat config
- **Bundler**: Turbopack enabled for dev and build

### Project Structure
- `src/app/` - App Router pages and layouts
- `src/app/globals.css` - Global styles (Tailwind v4)
- `src/app/layout.tsx` - Root layout
- `src/app/page.tsx` - Home page component
- `src/app/api/health/route.ts` - Health check endpoint (GET/HEAD, no-cache)
- `src/components/ui/` - shadcn/ui components (e.g., `button.tsx`, `input.tsx`)
- `src/lib/utils.ts` - Utility helpers (added by shadcn init)
- `public/` - Static assets (`images/`, `fonts/`, SVG icons)
- `components.json` - shadcn/ui configuration

### Configuration Files
- `next.config.ts` - Next.js config
- `tsconfig.json` - TypeScript config with `@/*` path mapping to `src/*`
- `eslint.config.mjs` - ESLint v9 flat config with Next.js presets
- `postcss.config.mjs` - PostCSS config for Tailwind CSS v4
- `components.json` - shadcn/ui configuration (style, aliases, base color)

### Key Features
- **UI**: shadcn/ui components scaffolded into `src/components/ui`
- **Icons**: Use `react-icons` (not lucide-react)
- **Health Endpoint**: `/api/health` returns `{ status: "ok", timestamp }`, caching disabled
- **Font Optimization**: Uses Geist Sans and Geist Mono via next/font/google
- **Dark Mode**: CSS custom properties with prefers-color-scheme support
- **Modern Tooling**: ESLint v9, TypeScript 5, Tailwind v4

### Development Notes
- Uses pnpm as package manager
- Turbopack enabled for faster builds and dev server
- Path alias `@/*` maps to `src/*` for clean imports
- Strict TypeScript configuration with noEmit for type checking only
- When editing UI, prefer Tailwind utilities and existing shadcn/ui patterns
- Jest runs in `jsdom` environment; CSS imports are mapped via `identity-obj-proxy`