# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build production app with Turbopack
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Project Architecture

This is a Next.js 15 project using the App Router architecture with the following key technologies:

### Core Stack
- **Framework**: Next.js 15.5.0 with App Router
- **React**: 19.1.0 
- **TypeScript**: Full TypeScript setup with strict mode
- **Styling**: Tailwind CSS v4 with PostCSS
- **Internationalization**: next-intl for i18n support
- **Bundler**: Turbopack enabled for dev and build

### Project Structure
- `src/app/` - App Router pages and layouts following Next.js 13+ conventions
- `src/app/layout.tsx` - Root layout with Geist font family setup
- `src/app/page.tsx` - Home page component
- `src/app/globals.css` - Global styles with Tailwind imports and CSS custom properties
- `public/` - Static assets (SVG icons)

### Configuration Files
- `next.config.ts` - Next.js config with next-intl plugin integration
- `tsconfig.json` - TypeScript config with `@/*` path mapping to `src/*`
- `eslint.config.mjs` - ESLint v9 flat config with Next.js presets
- `postcss.config.mjs` - PostCSS config for Tailwind CSS v4

### Key Features
- **Internationalization**: Configured with next-intl plugin
- **Font Optimization**: Uses Geist Sans and Geist Mono via next/font/google
- **Dark Mode**: CSS custom properties with prefers-color-scheme support
- **Modern Tooling**: ESLint v9, TypeScript 5, Tailwind v4

### Development Notes
- Uses pnpm as package manager
- Turbopack enabled for faster builds and dev server
- Path alias `@/*` maps to `src/*` for clean imports
- Strict TypeScript configuration with noEmit for type checking only