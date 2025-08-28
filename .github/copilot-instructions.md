# GitHub Copilot Instructions

This document provides instructions for GitHub Copilot to understand the project structure, coding standards, and best practices.

## Project Overview

This is a **Next.js 15.5.0** template project built with modern technologies and best practices.

### Technology Stack
- **Framework**: Next.js 15.5.0 (App Router + Turbopack)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4
- **Database**: Prisma ORM + MySQL
- **State Management**: Zustand
- **Data Fetching**: React Query (TanStack Query)
- **UI Components**: shadcn/ui + Radix UI
- **Form Handling**: React Hook Form + Zod
- **Testing**: Jest + Testing Library + Playwright
- **Development**: ESLint v9 + Prettier

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── example/           # Example pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── icons/            # Icon components
│   ├── layout/           # Layout components
│   ├── providers/        # Provider components
│   └── ui/               # shadcn/ui components
├── lib/                   # Utilities & libraries
│   ├── api/              # API related
│   ├── db/               # Database related
│   ├── hooks/            # Custom hooks
│   ├── prisma.ts         # Prisma client
│   ├── query-client.ts   # React Query client
│   ├── store/            # Zustand stores
│   ├── types/            # Type definitions
│   ├── utils/            # Utility functions
│   └── validations/      # Zod validations
└── messages/              # Internationalization messages

prisma/
├── schema.prisma          # Prisma schema
└── migrations/            # Database migrations
```

## Coding Standards

### TypeScript
- **Strict Mode**: Always enabled
- **Type Safety**: Prohibit `any`/`unknown`, use explicit types
- **Imports**: Use `import type` for type-only imports
- **Path Aliases**: Use `@/*` for `src/*` paths

### React / Next.js
- **Server First**: Default to Server Components, use `"use client"` only when necessary
- **App Router**: Use modern App Router patterns
- **Server Actions**: Prefer server actions over API routes when possible
- **Metadata**: Use `metadata` and `generateMetadata` for SEO

### State Management
- **Client State**: Use Zustand for client-side state
- **Server State**: Use React Query (TanStack Query) for server state
- **Store Organization**: Place stores in `src/lib/store/` organized by domain

### Database (Prisma)
- **Client**: Use singleton pattern in `src/lib/prisma.ts`
- **Data Access**: Place functions in `src/lib/db/` directory
- **Error Handling**: Always wrap operations in try-catch
- **Type Safety**: Use generated Prisma types

### UI / Styling
- **Tailwind CSS v4**: Utility-first approach
- **shadcn/ui**: Use existing components, add new ones with `pnpm dlx shadcn add`
- **Icons**: Use `react-icons` (not `lucide-react`)
- **Accessibility**: Implement proper ARIA attributes and semantic HTML

## File Naming & Organization

### Components
- **React Components**: PascalCase (e.g., `Button.tsx`, `UserProfile.tsx`)
- **Hooks**: `use` prefix (e.g., `useCounter.ts`, `useAuth.ts`)
- **Utilities**: camelCase (e.g., `formatDate.ts`, `validation.ts`)

### Directories
- **Pages**: `src/app/**/page.tsx`
- **Layouts**: `src/app/**/layout.tsx`
- **API Routes**: `src/app/api/**/route.ts`
- **Components**: `src/components/**/*.tsx`
- **Database**: `src/lib/db/**/*.ts`
- **Types**: `src/lib/types/**/*.ts`

## Development Patterns

### Server Components
```typescript
// Default pattern - Server Component
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

### Client Components
```typescript
'use client'
// Only when client-side interactivity is needed
export function InteractiveComponent() {
  const [state, setState] = useState()
  return <button onClick={() => setState()}>Click</button>
}
```

### Database Functions
```typescript
// src/lib/db/example.ts
import { prisma } from '@/lib/prisma'

export async function getData(): Promise<Data[]> {
  try {
    return await prisma.model.findMany()
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Database error')
  }
}
```

### Zustand Store
```typescript
// src/lib/store/example.ts
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ExampleState {
  count: number
  increment: () => void
}

export const useExampleStore = create<ExampleState>()(
  devtools((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 }))
  }))
)
```

## Testing

### Unit Tests
- **Framework**: Jest + Testing Library
- **Location**: `src/**/__tests__/**/*.{test,spec}.{ts,tsx}`
- **Script**: `pnpm test:unit`

### E2E Tests
- **Framework**: Playwright
- **Location**: `e2e/**.spec.ts`
- **Script**: `pnpm e2e`

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server (Turbopack enabled)
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting

# Testing
pnpm test:unit        # Run unit tests
pnpm test:watch       # Run tests in watch mode
pnpm e2e              # Run E2E tests
pnpm e2e:ui           # Run E2E tests with UI

# Database
pnpm prisma generate  # Generate Prisma client
pnpm prisma migrate dev # Run migrations
pnpm prisma studio    # Open Prisma Studio
```

## Best Practices

### Performance
- **Server Components**: Reduce client-side JavaScript
- **Image Optimization**: Use `next/image` with proper sizing
- **Code Splitting**: Leverage Next.js automatic code splitting
- **Caching**: Use React Query for intelligent data caching

### Security
- **Input Validation**: Use Zod schemas for all user inputs
- **SQL Injection**: Prisma ORM prevents SQL injection
- **XSS Protection**: React's built-in XSS protection
- **Environment Variables**: Store sensitive data in `.env.local`

### Accessibility
- **Semantic HTML**: Use proper HTML elements
- **ARIA Attributes**: Implement appropriate ARIA labels and roles
- **Keyboard Navigation**: Ensure keyboard accessibility
- **Screen Readers**: Test with screen reader software

## Common Patterns

### Form Handling
```typescript
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email')
})

export function Form() {
  const form = useForm({
    resolver: zodResolver(schema)
  })
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

### API Routes
```typescript
// src/app/api/example/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const data = await fetchData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

## When Adding New Features

1. **Follow existing patterns** in the codebase
2. **Use appropriate testing** (unit tests for utilities, E2E for user flows)
3. **Update documentation** if necessary
4. **Run linting and tests** before committing
5. **Consider performance implications** of your changes

## Troubleshooting

### Common Issues
- **Prisma Client**: Run `pnpm prisma generate` after schema changes
- **Type Errors**: Check TypeScript strict mode compliance
- **Build Issues**: Verify all dependencies are installed
- **Testing Issues**: Ensure Jest and Playwright configurations are correct

### Getting Help
- Check existing code patterns in the project
- Review the coding guidelines in `.cursor/rules/`
- Run `pnpm lint` to identify code quality issues
- Use `pnpm test:unit` to verify functionality

---

Follow these guidelines to maintain code quality and consistency across the project.
