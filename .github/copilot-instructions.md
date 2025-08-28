# GitHub Copilot Instructions for myapps-nextjs

このファイルは GitHub Copilot に対するプロジェクト固有の指示です。以下のルールとガイドラインを厳守してください。

## 🏗️ Project Overview

- **Framework**: Next.js 15.5 (App Router)
- **React**: 19.1
- **TypeScript**: strict mode
- **Database**: Prisma ORM with MySQL
- **Styling**: Tailwind CSS v4 + PostCSS
- **State Management**: Zustand (lightweight client-side state management)
- **Server State**: TanStack Query (data fetching & caching)
- **Authentication**: WorkOS AuthKit (enterprise-grade SSO)
- **API Framework**: Hono (lightweight web framework for API Routes)
- **Infrastructure**: AWS CDK v2 (Infrastructure as Code)
- **Storage**: AWS S3 (file uploads and storage)
- **Package Manager**: pnpm
- **Path Alias**: `@/*` → `src/*`
- **UI**: shadcn/ui (managed via `components.json`)
- **Icons**: react-icons (do NOT use lucide-react)
- **Testing**: Jest with jsdom

## 📁 Directory Structure

```
src/
├── app/                    # App Router pages/layouts/route handlers
│   ├── (auth)/            # Authentication protected group
│   │   ├── account/       # Account management (protected)
│   │   └── notes/         # Notes management (protected)
│   │       ├── _components/ # Page-specific components
│   │       └── _actions/    # Page-specific Server Actions
│   ├── [route]/           # Example page route
│   │   ├── _components/   # Page-specific components (underscore prevents routing)
│   │   ├── _actions/      # Page-specific Server Actions (underscore prevents routing)
│   │   ├── page.tsx       # Page component
│   │   └── layout.tsx     # Route layout (optional)
│   ├── api/               # API Routes (Hono integration)
│   │   └── [[...route]]/  # Dynamic routing
│   ├── callback/          # WorkOS authentication callback
│   ├── login/             # Login route
│   ├── signup/            # Signup route
│   ├── globals.css        # Global styles (Tailwind v4)
│   ├── layout.tsx         # Root layout (Geist fonts, WorkOS AuthKit provider)
│   └── page.tsx           # Home page
├── components/             # Reusable components
│   ├── auth/              # Authentication components
│   │   └── AuthButton.tsx # Auth button with WorkOS
│   ├── ui/                # shadcn/ui components
│   ├── icons/             # Icon components
│   └── layout/            # Layout components
├── lib/                    # Utilities and business logic
│   ├── api/               # API endpoints (Hono)
│   │   └── upload.ts      # File upload API
│   ├── utils.ts           # Utility functions
│   ├── prisma.ts          # Prisma client configuration
│   ├── workos.ts          # WorkOS configuration
│   ├── actions/           # Shared Server Actions (cross-page usage)
│   ├── hooks/             # Custom hooks
│   └── types/             # Type definitions
├── middleware.ts           # Next.js middleware (authentication protection)
├── __tests__/              # Unit test files
└── styles/                 # Additional CSS files
prisma/                     # Database configuration
├── schema.prisma           # Database schema and models
└── seed.ts                 # Database seeding script
e2e/                        # E2E test files (Playwright)
├── home.spec.ts           # Home page E2E tests
├── api.spec.ts            # API endpoint E2E tests
└── README.md              # E2E testing guide
infra/                      # AWS CDK infrastructure configuration
├── lib/                   # CDK stack definitions
│   └── infra-stack.ts     # Main infrastructure stack (S3, etc.)
├── bin/                   # CDK app entry point
├── test/                  # Infrastructure tests
├── package.json           # CDK dependencies and scripts
└── cdk.json               # CDK configuration
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

## 🔐 Authentication & Authorization (WorkOS)

### Protected Routes
- **`app/(auth)` group**: All pages under this group require authentication
- **Automatic protection**: Middleware automatically redirects unauthenticated users to login
- **Protected pages**: `/account`, `/notes`

### Authentication Flow
1. **User access**: User tries to access protected route
2. **Middleware check**: `middleware.ts` checks authentication
3. **Redirect**: Unauthenticated users redirected to login
4. **WorkOS Auth**: User authenticates via WorkOS AuthKit
5. **Callback**: User redirected back to `/callback`
6. **Session**: Session established and cookies set
7. **Access**: User can now access protected routes

### Usage Patterns

**Server Components:**
```typescript
import { withAuth } from '@workos-inc/authkit-nextjs'

export default async function ProtectedPage() {
  const { user } = await withAuth({ ensureSignedIn: true })
  return <div>Welcome, {user.firstName}!</div>
}
```

**Client Components:**
```typescript
import { useAuth } from '@workos-inc/authkit-nextjs/components'

export default function AuthComponent() {
  const { user, loading, signOut } = useAuth()
  
  if (loading) return <div>Loading...</div>
  if (!user) return <div>Please sign in</div>
  
  return (
    <div>
      <p>Welcome, {user.firstName}!</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
```

## 🚀 Common Commands

- **Development**: `pnpm dev`
- **Build**: `pnpm build`
- **Production**: `pnpm start`
- **Lint**: `pnpm lint`
- **Test**: `pnpm test` / `pnpm test:watch`
- **E2E Test**: `pnpm e2e` / `pnpm e2e:ui` / `pnpm e2e:headed`
- **Format**: `pnpm format` / `pnpm format:check`
- **Database**: `pnpm db:generate` / `pnpm db:push` / `pnpm db:studio` / `pnpm db:seed`
- **Infrastructure**: `cd infra && npm run deploy` / `npm run diff` / `npm run synth`

## 💻 Coding Guidelines

### TypeScript
- **Type Safety First**: Avoid `any`/`unknown` usage. Always provide explicit types for public APIs.
- **Nullable Handling**: Use early returns and guard clauses for undefined/null values.
- **Utility Types**: Leverage union types and discriminated unions over enums.

### React / Next.js (App Router)
- **Server Components Default**: Use server components by default. Add `"use client"` only when necessary.
- **Props Design**: Explicit typing, split complex props into objects, use default values.
- **State Management**: Use Zustand for client-side state. Keep stores lightweight and focused on specific domains.
- **State Minimization**: Minimize state, avoid derived state, use `useEffect` for side effects.
- **Routing**: Place API routes in `src/app/api/**/route.ts`. Use `NextResponse` with explicit headers.

### Server Actions Best Practices
- **`'use server'` Directive**: Always include at the top of action files
- **Input Validation**: Validate all form data and parameters
- **Error Handling**: Use try-catch blocks with proper error responses
- **Revalidation**: Use `revalidatePath()` or `revalidateTag()` after data mutations
- **File Organization**: One function per file, named by purpose (e.g., `create-user.ts`)
- **Single Responsibility**: Each action should focus on one specific task

### Database (Prisma) Best Practices
- **Import Client**: Always use `import { prisma } from '@/lib/prisma'`
- **Error Handling**: Wrap database operations in try-catch blocks
- **Type Safety**: Use Prisma-generated types for type safety
- **Relations**: Use `include` or `select` for related data
- **Transactions**: Use `prisma.$transaction()` for multi-table operations
- **Validation**: Always validate data before database operations

### Authentication (WorkOS) Best Practices
- **Protected Routes**: Use `app/(auth)` group for authentication-required pages
- **Server Components**: Use `withAuth` from `@workos-inc/authkit-nextjs`
- **Client Components**: Use `useAuth` hook for user state management
- **Middleware**: Authentication is automatically handled by `middleware.ts`
- **Error Handling**: Proper authentication error responses and redirects
- **Session Management**: WorkOS handles sessions automatically

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

## 🗃️ State Management Guidelines

### Zustand Best Practices
- **Store Organization**: Create stores in `src/lib/stores/` directory
- **Store Naming**: Use descriptive names like `useUserStore`, `useCartStore`
- **Type Safety**: Always define TypeScript interfaces for store state
- **Store Structure**: Keep stores focused on single domains
- **Actions**: Group related actions together in the same store
- **Selectors**: Use selectors to avoid unnecessary re-renders

### TanStack Query Best Practices
- **Query Keys**: Use consistent and descriptive query keys
- **Error Handling**: Implement proper error boundaries and fallbacks
- **Caching**: Leverage automatic caching and invalidation
- **Optimistic Updates**: Use for better user experience
- **Background Refetching**: Enable for data freshness

### Example Store Structure
```typescript
// src/lib/stores/user-store.ts
interface UserState {
  user: User | null
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  login: async (credentials) => {
    set({ isLoading: true })
    // ... login logic
    set({ isLoading: false, user: userData })
  },
  logout: () => set({ user: null })
}))
```

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
- **Don't** create overly complex Zustand stores - keep them focused and lightweight
- **Don't** bypass authentication checks in protected routes
- **Don't** expose WorkOS API keys or sensitive configuration

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
- [ ] Authentication flows work correctly
- [ ] Protected routes are properly secured

## 🔍 AI Assistance Guidelines

When using Copilot:
1. **Context Matters**: Provide clear context about what you're trying to achieve
2. **Iterative**: Start with small suggestions and refine based on feedback
3. **Project-Aware**: Always consider the existing project structure and patterns
4. **Quality First**: Prioritize type safety and maintainability over quick solutions
5. **Security Conscious**: Ensure authentication and authorization are properly implemented

## 🌐 Environment Variables

Required environment variables for WorkOS integration:

```env
# WorkOS Configuration
WORKOS_API_KEY=your_workos_api_key_here
WORKOS_CLIENT_ID=your_workos_client_id_here
WORKOS_COOKIE_PASSWORD=your_secure_cookie_password_here
NEXT_PUBLIC_WORKOS_REDIRECT_URI=http://localhost:3000/callback

# Database
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
```

---

**Remember**: This project follows strict TypeScript and React best practices with enterprise-grade authentication via WorkOS. Always prioritize code quality, maintainability, security, and consistency with existing patterns.

### Documentation
Project documentation should be stored in the docs directory. If any documentation is missing, add or update it accordingly. Keep edits to the project's README.md to a minimum.
