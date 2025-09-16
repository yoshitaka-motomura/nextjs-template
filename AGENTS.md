# AI Agents Instructions for Next.js Template

This document provides comprehensive instructions for AI agents (Claude, GitHub Copilot, Cursor, etc.) working with this Next.js 15.5.0 template project. These instructions ensure consistent, high-quality code generation and modifications across all AI assistants.

## Project Overview

- **Framework**: Next.js 15.5.0 (App Router + Turbopack)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4
- **Database**: Prisma ORM + MySQL
- **State Management**: Zustand
- **Server State**: React Query (TanStack Query)
- **Authentication**: WorkOS AuthKit
- **API Framework**: Hono
- **Infrastructure**: AWS CDK v2
- **Package Manager**: pnpm
- **Default Language**: Japanese (ja)

## Core Development Principles

### 1. Server-First Architecture
- Default to Server Components
- Use `"use client"` only when client-side functionality is required
- Prioritize server actions over client-side data fetching
- Document cache strategies explicitly

### 2. Type Safety First
- Strict TypeScript mode enabled
- Explicit type annotations for public APIs
- Avoid `any`/`unknown` except in exceptional cases
- Use union/discriminated union types over enums

### 3. Performance Optimization
- Leverage React 19 concurrent features
- Utilize Turbopack for fast builds
- Implement appropriate caching strategies
- Minimize client-side JavaScript

### 4. Accessibility & UX
- Implement comprehensive ARIA attributes
- Ensure keyboard navigation support
- Use semantic HTML elements
- Provide user-friendly error messages

## File Organization Standards

### Directory Structure
```
src/
├── app/                     # Next.js App Router
│   ├── (auth)/             # Protected route group
│   ├── api/[[...route]]/   # API routes (Hono)
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # shadcn/ui components
│   └── auth/              # Authentication components
└── lib/
    ├── actions/           # Shared server actions
    ├── api/              # API endpoints (Hono)
    ├── db/               # Database operations
    ├── store/            # Zustand stores
    ├── types/            # Type definitions
    ├── utils/            # Utility functions
    ├── prisma.ts         # Prisma client
    └── workos.ts         # WorkOS configuration
```

### Page-Specific Organization
For each route, use this structure:
```
src/app/[route]/
├── _components/          # Page-specific components
├── _actions/            # Page-specific server actions
├── page.tsx
└── layout.tsx
```

## Coding Standards

### Naming Conventions
- **Components**: PascalCase
- **Functions**: camelCase with verbs/phrases
- **Variables**: camelCase with nouns/phrases
- **Constants**: UPPER_SNAKE_CASE (only when necessary)
- **Hooks**: `use*` prefix
- **Boolean values**: `is/has/can/should` prefix

### Import Organization
1. External libraries
2. Aliases (`@/*`)
3. Relative imports
4. Types use `import type`

### Code Structure
- Use early returns to reduce nesting
- Keep functions focused and single-purpose
- Implement comprehensive error handling
- Document complex business logic

## Technology-Specific Guidelines

### React/Next.js Implementation

#### Server Components (Default)
```typescript
// Default pattern - Server Component
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

#### Client Components (When Necessary)
```typescript
'use client'
// Only when client-side functionality is required
export function InteractiveComponent() {
  const [state, setState] = useState()
  return <button onClick={() => setState()}>Click</button>
}
```

#### Server Actions Pattern
```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function createPost(formData: FormData) {
  try {
    const title = formData.get('title') as string

    // Validate input
    if (!title) {
      throw new Error('Title is required')
    }

    // Database operation
    const post = await prisma.post.create({
      data: { title }
    })

    revalidatePath('/posts')
    return { success: true, post }
  } catch (error) {
    console.error('Create post error:', error)
    return { success: false, error: 'Failed to create post' }
  }
}
```

### Database Operations (Prisma)

#### Required Pattern
```typescript
import { prisma } from '@/lib/prisma'
import type { Post } from '@prisma/client'

export async function getPostsWithAuthor() {
  try {
    return await prisma.post.findMany({
      include: { author: true },
      where: { published: true }
    })
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Failed to fetch posts')
  }
}
```

### State Management

#### Zustand Store Pattern
```typescript
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface StoreState {
  count: number
  increment: () => void
  decrement: () => void
}

export const useStore = create<StoreState>()(
  devtools((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 }))
  }))
)
```

#### React Query Usage
```typescript
import { useQuery } from '@tanstack/react-query'

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then(res => res.json()),
    staleTime: 5 * 60 * 1000 // 5 minutes
  })
}
```

### Authentication (WorkOS)

#### Server Component Authentication
```typescript
import { withAuth } from '@workos-inc/authkit-nextjs'

export default withAuth(async function ProtectedPage({ user }) {
  return <div>Welcome, {user.firstName}</div>
})
```

#### Client Component Authentication
```typescript
'use client'
import { useAuth } from '@workos-inc/authkit-nextjs'

export function AuthButton() {
  const { user, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>

  return user ? (
    <div>Welcome, {user.firstName}</div>
  ) : (
    <a href="/login">Sign in</a>
  )
}
```

## Quality Assurance

### Testing Strategy
- **Unit Tests**: Jest + Testing Library
- **Component Tests**: Focus on behavior, not implementation
- **API Tests**: Test server actions and API routes
- **E2E Tests**: Playwright for critical user flows

### Before Committing
Always verify:
- [ ] TypeScript compilation passes (`pnpm build`)
- [ ] ESLint passes (`pnpm lint`)
- [ ] Tests pass (`pnpm test`)
- [ ] Code follows project conventions
- [ ] No sensitive information included

## Commands Reference

### Development
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
```

### Database
```bash
pnpm db:generate  # Generate Prisma client
pnpm db:push      # Push schema changes
pnpm db:studio    # Open Prisma Studio
pnpm db:seed      # Seed database
```

### Testing
```bash
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
```

## Git & Commit Rules

### Commit Message Format
Use Conventional Commits with emojis for clear, consistent commit history:

#### Commit Types with Emojis
- ✨ **feat**: New features and functionality
- 🐛 **fix**: Bug fixes and error corrections
- 📝 **docs**: Documentation changes
- 🎨 **style**: Code style, formatting changes (no logic changes)
- 🔄 **refactor**: Code refactoring without feature changes
- 🧪 **test**: Adding or updating tests
- 🧹 **chore**: Maintenance tasks, dependency updates
- 🚀 **perf**: Performance improvements
- 🤖 **ci**: CI/CD pipeline changes
- 🔧 **build**: Build system or external dependencies

#### Message Structure
```
<emoji> <type>: <subject>

[optional body]

[optional footer]
```

#### Examples
```bash
✨ feat: ユーザープロファイル編集機能を追加

🐛 fix: ログイン時のバリデーションエラーを修正

📝 docs: API仕様書にユーザー認証セクションを追加

🔄 refactor: データベースアクセス層をPrismaクライアントに統一

🧹 chore: 依存関係を最新バージョンに更新
```

### Commit Guidelines

#### Content Rules
1. **One Purpose**: One commit = one logical change
2. **Clear Subject**: 50文字以内で変更内容を簡潔に説明
3. **Body Details**: 必要に応じて変更理由や影響を詳細説明
4. **Japanese Content**: コミットメッセージは日本語で記述

#### Quality Checklist
コミット前に必ず確認:
- [ ] TypeScript compilation passes (`pnpm build`)
- [ ] ESLint passes (`pnpm lint`)
- [ ] Prettier formatting applied (`pnpm format`)
- [ ] Unit tests pass (`pnpm test`)
- [ ] Changes follow existing patterns
- [ ] No sensitive information (API keys, passwords, URLs)
- [ ] Commit message follows conventions

#### Security Requirements
- ❌ API keys, passwords, tokens
- ❌ Database connection strings
- ❌ Private URLs or endpoints
- ❌ Personal information
- ✅ Environment variable examples (with placeholders)
- ✅ Public configuration files

#### Branch Naming Convention
```bash
feature/user-profile-edit    # 新機能開発
bugfix/login-validation     # バグ修正
hotfix/security-patch       # 緊急修正
refactor/database-layer     # リファクタリング
docs/api-documentation      # ドキュメント更新
```

#### Pre-commit Hooks
Recommended pre-commit checks:
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "pnpm lint && pnpm format && pnpm test",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

## Error Handling Patterns

### Client-Side Error Boundaries
```typescript
'use client'
import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export function withErrorBoundary(Component: React.ComponentType) {
  return function WrappedComponent(props: any) {
    return (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}
```

### Server-Side Error Handling
```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await fetchData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## Performance Best Practices

### Code Splitting
```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
})
```

### Image Optimization
```typescript
import Image from 'next/image'

export function OptimizedImage() {
  return (
    <Image
      src="/image.jpg"
      alt="Description"
      width={800}
      height={600}
      priority // For above-the-fold images
    />
  )
}
```

## Security Guidelines

### Input Validation
```typescript
import { z } from 'zod'

const UserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email()
})

export async function createUser(data: unknown) {
  const validatedData = UserSchema.parse(data)
  // Proceed with validated data
}
```

### Environment Variables
```typescript
const config = {
  databaseUrl: process.env.DATABASE_URL!,
  workosApiKey: process.env.WORKOS_API_KEY!
}

// Validate required environment variables at startup
Object.entries(config).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
})
```

## Documentation Standards

### Code Comments
- Focus on "why" rather than "what"
- Document complex business logic
- Explain non-obvious technical decisions
- Keep comments concise and up-to-date

### API Documentation
```typescript
/**
 * Creates a new user account
 * @param userData - User information including name and email
 * @returns Promise resolving to created user data
 * @throws Error if validation fails or user already exists
 */
export async function createUser(userData: CreateUserInput): Promise<User> {
  // Implementation
}
```

---

These instructions ensure consistent, high-quality code generation across all AI agents. Follow these guidelines strictly to maintain code quality, security, and maintainability throughout the project lifecycle.