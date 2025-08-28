# Claude Instructions for Next.js Template

This document provides instructions for using Claude with a Next.js 15.5.0 + React 19 + TypeScript + Tailwind CSS v4 + Prisma + React Query + Zustand template project.

## Project Overview

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

## Technology Stack Details

### Frontend
- **Next.js 15.5.0**: App Router, Turbopack, Server Components
- **React 19.1.0**: Latest React features and performance optimizations
- **TypeScript 5**: strict mode, comprehensive type safety
- **Tailwind CSS v4**: Utility-first CSS with latest features

### Database & State Management
- **Prisma ORM**: Type-safe database operations with MySQL support
- **Zustand**: Lightweight and simple state management
- **React Query**: Server state management, caching, and synchronization

### UI & Forms
- **shadcn/ui**: Reusable UI components
- **Radix UI**: Accessible primitive components
- **React Hook Form**: Performance-focused form management
- **Zod**: Type-safe schema validation

### Development & Testing
- **ESLint v9**: Flat configuration, code quality management
- **Prettier**: Code formatting consistency
- **Jest**: Unit testing, Testing Library
- **Playwright**: E2E testing, multi-browser support

## Development Guidelines

### Architecture Principles
1. **Server First**: Default to Server Components, use `"use client"` only when necessary
2. **Type Safety**: TypeScript strict mode, comprehensive type safety
3. **Performance**: Turbopack, React 19 optimizations, appropriate caching strategies
4. **Accessibility**: ARIA attributes, semantic HTML, keyboard navigation

### File Organization Rules
- **Pages**: `src/app/**/page.tsx`
- **Layouts**: `src/app/**/layout.tsx`
- **API Routes**: `src/app/api/**/route.ts`
- **Components**: `src/components/**/*.tsx`
- **Utilities**: `src/lib/**/*.ts`
- **Database**: `src/lib/db/**/*.ts`
- **Types**: `src/lib/types/**/*.ts`

### Database Design
- **Prisma Schema**: `prisma/schema.prisma`
- **Data Access**: `src/lib/db/**/*.ts`
- **Migrations**: `prisma/migrations/`
- **Seeding**: `prisma/seed.ts`

### State Management Patterns
- **Server State**: React Query (TanStack Query)
- **Client State**: Zustand
- **Form State**: React Hook Form + Zod
- **URL State**: Next.js App Router

## Implementation Patterns

### Server Components
```typescript
// Default to Server Component
export default async function Page() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

### Client Components
```typescript
'use client'
// Only when client-side is necessary
export function InteractiveComponent() {
  const [state, setState] = useState()
  return <button onClick={() => setState()}>Click</button>
}
```

### API Routes
```typescript
// src/app/api/example/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello' })
}
```

### Database Operations
```typescript
// src/lib/db/example.ts
import { prisma } from '@/lib/prisma'

export async function getData() {
  try {
    return await prisma.model.findMany()
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('Database error')
  }
}
```

### State Management
```typescript
// Zustand store
import { create } from 'zustand'

export const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 }))
}))
```

## Testing Strategy

### Unit Testing
- **Jest**: Testing framework
- **Testing Library**: DOM manipulation and user interactions
- **Coverage**: Critical business logic coverage

### E2E Testing
- **Playwright**: Browser testing
- **Critical Paths**: Important user workflows
- **Cross-browser**: Chrome, Firefox, Safari, Mobile

## Performance Optimization

### Next.js 15.5.0
- **Turbopack**: Fast development builds
- **App Router**: Efficient routing and rendering
- **Server Components**: Reduced client-side JavaScript

### React 19
- **Concurrent Features**: Asynchronous rendering
- **Automatic Batching**: State update optimizations
- **Suspense**: Improved data fetching

### Tailwind CSS v4
- **CSS Variables**: Dynamic theme switching
- **Improved Performance**: More efficient CSS generation
- **Modern Features**: Latest CSS capabilities

## Security & Best Practices

### Database
- **Input Validation**: Schema validation with Zod
- **SQL Injection**: Automatic escaping with Prisma
- **Access Control**: Proper authentication and authorization

### API
- **Rate Limiting**: Appropriate rate limiting
- **Input Sanitization**: User input sanitization
- **Error Handling**: Prevent sensitive information exposure

### Frontend
- **XSS Prevention**: React's built-in XSS protection
- **CSRF Protection**: Appropriate CSRF countermeasures
- **Content Security Policy**: CSP header configuration

## Deployment

### Environment Configuration
- **Development**: Local development environment
- **Staging**: Staging environment
- **Production**: Production environment

### Build Optimization
- **Turbopack**: Fast development builds
- **Tree Shaking**: Unused code removal
- **Code Splitting**: Appropriate code splitting

## Troubleshooting

### Common Issues
1. **Prisma Client**: Run `pnpm prisma generate`
2. **TypeScript Errors**: Check and fix type definitions
3. **Build Issues**: Verify dependencies and updates
4. **Performance**: React DevTools, Next.js Analytics

### Debug Tools
- **React DevTools**: Component state inspection
- **Next.js Analytics**: Performance metrics
- **Prisma Studio**: Database visualization
- **Playwright Inspector**: E2E test debugging

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

---

Use this template to develop high-quality, maintainable Next.js applications.