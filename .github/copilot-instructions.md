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
│   ├── [route]/           # Example page route
│   │   ├── _components/   # Page-specific components (underscore prevents routing)
│   │   ├── _actions/      # Page-specific Server Actions (underscore prevents routing)
│   │   ├── page.tsx       # Page component
│   │   └── layout.tsx     # Route layout (optional)
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
│   ├── actions/           # Shared Server Actions (cross-page usage)
│   ├── api/               # API utilities
│   ├── hooks/             # Custom hooks
│   └── types/             # Type definitions
├── __tests__/              # Unit test files
└── styles/                 # Additional CSS files
e2e/                        # E2E test files (Playwright)
├── home.spec.ts           # Home page E2E tests
├── api.spec.ts            # API endpoint E2E tests
└── README.md              # E2E testing guide
```

### Page-Specific Organization Rules

**Components:**
- **Page-specific**: `src/app/[route]/_components/ComponentName.tsx` (PascalCase)
- **Global/shared**: `src/components/ui/` (shadcn/ui components)

**Server Actions:**
- **Page-specific**: `src/app/[route]/_actions/action-name.ts` (kebab-case, one function per file)
- **Global/shared**: `src/lib/actions/` (for cross-page usage)

**Example structure:**
```
src/app/users/
├── _components/
│   ├── UserCard.tsx
│   ├── UserForm.tsx
│   └── UserList.tsx
├── _actions/
│   ├── create-user.ts
│   ├── update-user.ts
│   └── delete-user.ts
├── page.tsx
└── layout.tsx
```

## 🚀 Common Commands

- **Development**: `pnpm dev`
- **Build**: `pnpm build`
- **Production**: `pnpm start`
- **Lint**: `pnpm lint`
- **Test**: `pnpm test` / `pnpm test:watch`
- **E2E Test**: `pnpm e2e` / `pnpm e2e:ui` / `pnpm e2e:headed`
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

### Server Actions Best Practices
- **`'use server'` Directive**: Always include at the top of action files
- **Input Validation**: Validate all form data and parameters
- **Error Handling**: Use try-catch blocks with proper error responses
- **Revalidation**: Use `revalidatePath()` or `revalidateTag()` after data mutations
- **File Organization**: One function per file, named by purpose (e.g., `create-user.ts`)
- **Single Responsibility**: Each action should focus on one specific task

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
- **E2E Tests**: `e2e/**/*.spec.ts`
- **Unit Framework**: Jest with jsdom + babel-jest
- **E2E Framework**: Playwright with multiple browsers
- **DOM Testing**: Use Testing Library patterns for unit tests

### Testing Principles
- **Minimal Mocking**: Mock at boundaries, not implementation details
- **Stability**: Prevent flaky tests with explicit waiting/timing
- **API Testing**: Test public APIs and behavior, not internal implementation
- **E2E Focus**: Test user workflows and critical paths
- **Semantic Selectors**: Use `getByRole`, `getByText` over CSS selectors

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
- [ ] Unit tests pass (`pnpm test`)
- [ ] E2E tests pass (`pnpm e2e`) - if UI changes
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
