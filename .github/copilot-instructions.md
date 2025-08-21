# GitHub Copilot Instructions for myapps-nextjs

このファイルは GitHub Copilot に対するプロジェクト固有の指示です。以下のルールとガイドラインを厳守してください。

## 🏗️ Project Overview

- **Framework**: Next.js 15.5 (App Router)
- **React**: 19.1
- **TypeScript**: strict mode
- **Styling**: Tailwind CSS v4 + PostCSS
- **Package Manager**: pnpm
- **Path Alias**: `@/*` → `src/*`
- **UI**: shadcn/ui (managed via `components.json`)
- **Icons**: react-icons (do NOT use lucide-react)
- **Testing**: Jest with jsdom

## 📁 Directory Structure

```
src/
├── app/                    # App Router pages/layouts/route handlers
│   ├── api/               # API routes
│   ├── globals.css        # Global styles (Tailwind v4)
│   ├── layout.tsx         # Root layout (Geist fonts)
│   └── page.tsx           # Home page
├── components/             # Reusable components
│   ├── ui/                # shadcn/ui components
│   ├── icons/             # Icon components
│   └── layout/            # Layout components
├── lib/                    # Utilities and business logic
│   ├── utils.ts           # Utility functions
│   ├── api/               # API utilities
│   ├── hooks/             # Custom hooks
│   └── types/             # Type definitions
├── __tests__/              # Test files
└── styles/                 # Additional CSS files
```

## 🚀 Common Commands

- **Development**: `pnpm dev`
- **Build**: `pnpm build`
- **Production**: `pnpm start`
- **Lint**: `pnpm lint`
- **Test**: `pnpm test` / `pnpm test:watch`
- **Format**: `pnpm format` / `pnpm format:check`

## 💻 Coding Guidelines

### TypeScript
- **Type Safety First**: Avoid `any`/`unknown` usage. Always provide explicit types for public APIs.
- **Nullable Handling**: Use early returns and guard clauses for undefined/null values.
- **Utility Types**: Leverage union types and discriminated unions over enums.

### React / Next.js (App Router)
- **Server Components Default**: Use server components by default. Add `"use client"` only when necessary.
- **Props Design**: Explicit typing, split complex props into objects, use default values.
- **State Management**: Minimize state, avoid derived state, use `useEffect` for side effects.
- **Routing**: Place API routes in `src/app/api/**/route.ts`. Use `NextResponse` with explicit headers.

### UI (Tailwind v4 / shadcn/ui)
- **Utility-First**: Use Tailwind utilities before custom CSS.
- **Class Merging**: Use `clsx` + `tailwind-merge` for conditional classes.
- **Components**: Use existing `src/components/ui/*` components. Add new ones with `pnpm dlx shadcn add <component>`.
- **Icons**: Use `react-icons` (e.g., `import { FaGithub } from 'react-icons/fa'`).

### Naming & Structure
- **Naming**: Use descriptive names, no abbreviations. Functions as verbs, variables as nouns.
- **Components**: PascalCase for components, `use*` for hooks.
- **Import Order**: External → Aliases (`@/*`) → Relative. Use `import type` for types.

## 🧪 Testing Guidelines

### Test Structure
- **Unit Tests**: `src/**/__tests__/**/*.{test,spec}.{ts,tsx}`
- **Framework**: Jest with jsdom + babel-jest
- **DOM Testing**: Use Testing Library patterns

### Testing Principles
- **Minimal Mocking**: Mock at boundaries, not implementation details
- **Stability**: Prevent flaky tests with explicit waiting/timing
- **API Testing**: Test public APIs and behavior, not internal implementation

## 🎨 Styling Guidelines

### Tailwind CSS v4
- **Utility Priority**: Use Tailwind utilities first, minimize custom CSS
- **Design Scale**: Follow default spacing and color scales
- **Responsive**: Use utility classes for responsive design
- **Dark Mode**: Implement with utility classes

### CSS Variables
- Use CSS custom properties for theme values
- Maintain semantic meaning in variable names
- Follow the established color scheme in `globals.css`

## 🔧 Development Workflow

### Before Making Changes
1. **Search & Explore**: Use search to understand existing code and dependencies
2. **Understand Context**: Check related files and understand the current design
3. **Plan Changes**: Identify minimal changes needed to achieve the goal

### During Development
1. **Follow Patterns**: Match existing code style and architecture
2. **Type Safety**: Ensure TypeScript strict mode compliance
3. **Linting**: Follow ESLint rules and project conventions

### After Changes
1. **Verify**: Run `pnpm lint` and `pnpm test`
2. **Build Check**: Ensure `pnpm build` succeeds
3. **Documentation**: Update relevant documentation if needed

## 📝 Git & Commits

### Commit Message Format
Use Conventional Commits with emojis:

- ✨ **feat**: New features
- 🐛 **fix**: Bug fixes
- 📝 **docs**: Documentation changes
- 🎨 **style**: Code style changes
- 🔄 **refactor**: Code refactoring
- 🧪 **test**: Adding or updating tests
- 🧹 **chore**: Maintenance tasks
- 🚀 **perf**: Performance improvements
- 🤖 **ci**: CI/CD changes

### Commit Guidelines
- **One Purpose**: One commit = one logical change
- **Clear Message**: Explain what and why in 1-2 sentences
- **No Sensitive Info**: Avoid API keys, URLs, or environment variables

## 🚫 What NOT to Do

- **Don't** use `lucide-react` (use `react-icons` instead)
- **Don't** add unnecessary dependencies without clear justification
- **Don't** break existing TypeScript strict mode compliance
- **Don't** ignore ESLint warnings
- **Don't** commit auto-generated files unnecessarily
- **Don't** make unrelated refactoring changes

## ✅ Quality Checklist

Before committing, ensure:
- [ ] TypeScript compilation passes
- [ ] ESLint passes (`pnpm lint`)
- [ ] Tests pass (`pnpm test`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Changes follow existing patterns
- [ ] No sensitive information is included
- [ ] Commit message follows conventions

## 🔍 AI Assistance Guidelines

When using Copilot:
1. **Context Matters**: Provide clear context about what you're trying to achieve
2. **Iterative**: Start with small suggestions and refine based on feedback
3. **Project-Aware**: Always consider the existing project structure and patterns
4. **Quality First**: Prioritize type safety and maintainability over quick solutions

---

**Remember**: This project follows strict TypeScript and React best practices. Always prioritize code quality, maintainability, and consistency with existing patterns.
