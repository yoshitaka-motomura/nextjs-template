# Claude Instructions for My Next.js App

## Project Overview

This is a modern Next.js 15.5 application built with React 19, TypeScript, Tailwind CSS v4, Prisma ORM, and WorkOS AuthKit. The project follows enterprise-grade patterns with authentication protection groups and comprehensive testing.

## Technology Stack

### Core Framework
- **Next.js**: 15.5.0 with App Router
- **React**: 19.1.0 with latest features
- **TypeScript**: 5.5.0 with strict mode
- **Node.js**: 18.17.0+ required

### Styling & UI
- **Tailwind CSS**: v4 with PostCSS
- **shadcn/ui**: Component library with Radix UI primitives
- **react-icons**: Icon library (do not use lucide-react)

### Database & ORM
- **Prisma**: ^6.14.0 with MySQL
- **MySQL**: Primary database with migrations

### Authentication & SSO
- **WorkOS AuthKit**: ^2.5.0 for enterprise authentication
- **WorkOS Node SDK**: ^7.69.1 for server-side operations
- **Protected Routes**: `app/(auth)` group requires authentication

### State Management
- **Zustand**: ^5.0.8 for client-side state
- **TanStack Query**: ^5.85.5 for server state and caching

### Forms & Validation
- **React Hook Form**: ^7.62.0 for form handling
- **Zod**: ^4.1.0 for schema validation

### API & Server
- **Hono**: ^4.9.4 - Lightweight and fast web framework (API Routes)

### Testing & Quality
- **Jest**: ^30.0.5 for unit testing
- **Playwright**: ^1.55.0 for E2E testing
- **ESLint**: ^9 flat config
- **Prettier**: ^3.6.2 for formatting

### Infrastructure
- **AWS CDK**: v2 for Infrastructure as Code
- **TypeScript**: CDK constructs in TypeScript
- **S3**: File storage and uploads

## Project Structure

```
src/
├─ app/                          # App Router
│  ├─ (auth)/                   # Authentication protected group
│  │  ├─ account/               # Account management (protected)
│  │  └─ notes/                 # Notes management (protected)
│  │     ├─ _components/        # Page-specific components
│  │     └─ _actions/           # Page-specific Server Actions
│  ├─ about/                    # About page
│  ├─ contact/                  # Contact page
│  ├─ policy/                   # Policy page
│  ├─ upload/                   # Upload page
│  ├─ api/                      # API Routes (Hono integration)
│  │  └─ [[...route]]/          # Dynamic routing
│  ├─ callback/                 # WorkOS auth callback
│  ├─ login/                    # Login route
│  ├─ signup/                   # Signup route
│  ├─ globals.css               # Global styles (Tailwind v4)
│  ├─ layout.tsx                # Root layout
│  ├─ loading.tsx               # Loading component
│  ├─ not-found.tsx             # 404 page
│  └─ page.tsx                  # Home page
├─ components/                   # Reusable components
│  ├─ auth/                     # Authentication components
│  │  └─ AuthButton.tsx         # Auth button with WorkOS
│  ├─ layout/                   # Layout components
│  │  ├─ GlobalHeader.tsx       # Global header
│  │  └─ OffCanvasMenu.tsx      # Off-canvas menu
│  ├─ providers/                # Context providers
│  │  └─ QueryProvider.tsx      # TanStack Query provider
│  └─ ui/                       # shadcn/ui components
├─ lib/                         # Utilities and libraries
│  ├─ api/                      # API endpoints (Hono)
│  │  └─ upload.ts              # File upload API
│  ├─ db/                       # Database access layer
│  │  ├─ note.ts                # Note queries
│  │  ├─ post.ts                # Post queries
│  │  └─ user.ts                # User queries
│  ├─ errors/                   # Error handling
│  │  ├─ handlers.ts            # Error handlers
│  │  └─ index.ts               # Error classes
│  ├─ hooks/                    # Custom React hooks
│  │  ├─ useErrorHandler.ts     # Error handling hook
│  │  └─ useNotes.ts            # Notes management hook
│  ├─ prisma.ts                 # Prisma client
│  ├─ query-client.ts           # TanStack Query client
│  ├─ types/                    # Type definitions
│  │  └─ database.ts            # Database types
│  ├─ utils/                    # Utility functions
│  │  └─ index.ts               # Utility exports
│  ├─ utils.ts                  # Main utilities
│  ├─ validations/              # Validation schemas
│  │  ├─ contact.ts             # Contact form validation
│  │  └─ notes.ts               # Notes validation
│  └─ workos.ts                 # WorkOS configuration
├─ middleware.ts                 # Next.js middleware (auth protection)
└─ styles/                      # Additional styles
```

## Key Features

### Authentication & Authorization
- **WorkOS AuthKit**: Enterprise-grade authentication with SSO support
- **Protected Routes**: `app/(auth)` group automatically requires authentication
- **Middleware Protection**: Automatic redirect to login for unauthenticated users
- **Session Management**: Automatic session handling and security

### Database Integration
- **Prisma ORM**: Type-safe database operations with MySQL
- **Data Access Layer**: Organized in `src/lib/db/` with proper error handling
- **Migrations**: Proper database schema management
- **Seeding**: Development data population

### State Management
- **Zustand**: Lightweight client-side state management
- **TanStack Query**: Server state management with caching and synchronization
- **React Hooks**: Custom hooks for common operations

### UI & Styling
- **Tailwind CSS v4**: Utility-first CSS with PostCSS
- **shadcn/ui**: Accessible component library
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: CSS custom properties support

### Testing Strategy
- **Unit Tests**: Jest with React Testing Library
- **E2E Tests**: Playwright for critical user workflows
- **Test Coverage**: Comprehensive testing of components and APIs

## Development Guidelines

### Code Style
- **TypeScript**: Strict mode with explicit types
- **ESLint**: Flat config with strict rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: With emojis for better readability

### Component Architecture
- **Server Components**: Default to server components
- **Client Components**: Use `"use client"` only when necessary
- **Component Organization**: Page-specific components in `_components/` folders
- **Props Design**: Explicit types with proper validation

### Database Patterns
- **Prisma Client**: Singleton pattern in `src/lib/prisma.ts`
- **Error Handling**: Always wrap operations in try-catch
- **Type Safety**: Use generated Prisma types
- **Transactions**: For multi-table operations

### Authentication Patterns
- **Server Components**: Use `withAuth` for protected pages
- **Client Components**: Use `useAuth` hook for user state
- **Middleware**: Automatic route protection
- **Error Handling**: Proper authentication error responses

### Testing Patterns
- **Unit Tests**: Component behavior and utilities
- **E2E Tests**: Critical user workflows
- **Mocking**: Minimal mocking, focus on real behavior
- **Accessibility**: Test with ARIA selectors

## Environment Variables

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/database_name"

# WorkOS Authentication
WORKOS_API_KEY="your_workos_api_key"
WORKOS_CLIENT_ID="your_workos_client_id"
WORKOS_COOKIE_PASSWORD="your_secure_cookie_password"
NEXT_PUBLIC_WORKOS_REDIRECT_URI="http://localhost:3000/callback"
```

## Available Commands

```bash
# Development
pnpm dev                    # Start dev server with Turbopack
pnpm build                  # Build for production
pnpm start                  # Start production server

# Testing
pnpm test                   # Run unit tests
pnpm test:watch            # Run tests in watch mode
pnpm e2e                   # Run E2E tests
pnpm e2e:ui               # Run E2E tests with UI

# Code Quality
pnpm lint                   # Run ESLint
pnpm format                 # Format with Prettier
pnpm format:check          # Check formatting

# Database
pnpm db:generate           # Generate Prisma client
pnpm db:migrate            # Run migrations
pnpm db:push               # Push schema changes
pnpm db:studio             # Open Prisma Studio
pnpm db:seed               # Seed database
pnpm db:reset              # Reset database
```

## Authentication Flow

1. **User Access**: User tries to access protected route
2. **Middleware Check**: `middleware.ts` checks authentication
3. **Redirect**: Unauthenticated users redirected to login
4. **WorkOS Auth**: User authenticates via WorkOS AuthKit
5. **Callback**: User redirected back to `/callback`
6. **Session**: Session established and cookies set
7. **Access**: User can now access protected routes

## Protected Routes

The following routes require authentication:
- `/account` - User account management
- `/notes` - Personal notes management

These are automatically protected by the middleware and will redirect unauthenticated users to the login page.

## Error Handling

- **Custom Error Classes**: Defined in `src/lib/errors/`
- **Error Boundaries**: React error boundaries for client components
- **API Error Responses**: Proper HTTP status codes and messages
- **User-Friendly Messages**: Clear error messages for end users

## Performance Considerations

- **Turbopack**: Fast development and build times
- **Server Components**: Reduced client-side JavaScript
- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: Automatic code splitting by Next.js
- **Caching**: TanStack Query for intelligent data caching

## Security Features

- **Authentication**: WorkOS enterprise-grade security
- **Input Validation**: Zod schemas for all user inputs
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **XSS Protection**: React's built-in XSS protection
- **CSRF Protection**: WorkOS handles CSRF protection

## Deployment Notes

- **Environment Variables**: All sensitive data in environment variables
- **Database**: Use production MySQL instance
- **WorkOS**: Configure production WorkOS application
- **Build Optimization**: Turbopack for faster builds
- **Monitoring**: Health check endpoint at `/api/health`

## Common Patterns

### Server Actions
```typescript
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createNote(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    
    await prisma.note.create({
      data: { title, content }
    })
    
    revalidatePath('/notes')
  } catch (error) {
    console.error('Note creation error:', error)
    throw new Error('ノートの作成に失敗しました')
  }
}
```

### Protected Page Component
```typescript
import { withAuth } from '@workos-inc/authkit-nextjs'

export default async function ProtectedPage() {
  const { user } = await withAuth({ ensureSignedIn: true })
  
  return (
    <div>
      <h1>ようこそ、{user.firstName}さん！</h1>
      {/* Protected content */}
    </div>
  )
}
```

### Database Query Function
```typescript
import { prisma } from '@/lib/prisma'
import type { Note } from '@prisma/client'

export async function getNotes(): Promise<Note[]> {
  try {
    return await prisma.note.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error('Database error:', error)
    throw new Error('データベースエラー')
  }
}
```

## Troubleshooting

### Common Issues
1. **Authentication Errors**: Check WorkOS environment variables
2. **Database Connection**: Verify DATABASE_URL and MySQL status
3. **Build Errors**: Ensure all dependencies are installed
4. **Type Errors**: Run `pnpm db:generate` after schema changes

### Debug Commands
```bash
pnpm lint                    # Check for code issues
pnpm test                    # Run tests to verify functionality
pnpm build                   # Verify build process
pnpm db:studio              # Inspect database directly
```

## Contributing

1. Follow the established code patterns
2. Write tests for new functionality
3. Update documentation as needed
4. Use conventional commits with emojis
5. Ensure all tests pass before submitting

## Documentation
Project documentation should be stored in the docs directory. If any documentation is missing, add or update it accordingly. Keep edits to the project's README.md to a minimum.


## Support

For technical questions or issues:
1. Check the documentation in `docs/` folder
2. Review existing code patterns
3. Run tests to verify functionality
4. Check console logs and error messages