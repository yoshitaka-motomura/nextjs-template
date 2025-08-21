# E2E Tests

This directory contains End-to-End (E2E) tests using Playwright.

## Running Tests

### Prerequisites

Make sure you have installed Playwright browsers:

```bash
pnpm dlx playwright install
```

### Test Commands

```bash
# Run all E2E tests
pnpm e2e

# Run tests with UI mode (interactive)
pnpm e2e:ui

# Run tests in headed mode (visible browser)
pnpm e2e:headed

# Show test report
pnpm e2e:report
```

### Test Structure

- `home.spec.ts` - Tests for the home page functionality
- `api.spec.ts` - Tests for API endpoints

### Writing Tests

#### Best Practices

1. **Use semantic selectors**: Prefer `getByRole`, `getByText`, `getByLabel` over CSS selectors
2. **Test user behavior**: Focus on what users actually do, not implementation details
3. **Keep tests independent**: Each test should be able to run in isolation
4. **Use data-testid sparingly**: Only when semantic selectors are not sufficient

#### Example Test

```typescript
import { test, expect } from '@playwright/test';

test('should display welcome message', async ({ page }) => {
  await page.goto('/');
  
  // Use semantic selectors
  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
  
  // Test user interactions
  await page.getByRole('button', { name: 'Get Started' }).click();
  await expect(page.getByText('Getting started...')).toBeVisible();
});
```

### Configuration

The Playwright configuration is in `playwright.config.ts` at the project root.

#### Key Configuration Options

- **Base URL**: `http://localhost:3000`
- **Browsers**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
- **Retries**: 2 retries on CI, 0 on local
- **Screenshots**: Only on failure
- **Traces**: On first retry

### CI/CD Integration

Tests are configured to run in CI environments with:
- Automatic retries for flaky tests
- HTML report generation
- Screenshot capture on failures
- Trace collection for debugging

### Debugging

#### Local Debugging

1. **UI Mode**: `pnpm e2e:ui` - Interactive test runner
2. **Headed Mode**: `pnpm e2e:headed` - See browser while tests run
3. **Debug Mode**: `pnpm dlx playwright test --debug` - Step through tests

#### Analyzing Failures

1. **Screenshots**: Check `test-results/` directory
2. **Traces**: Use `pnpm e2e:report` to view detailed traces
3. **Console Logs**: Available in test output and traces

### Mobile Testing

Tests include mobile viewport testing:
- **Mobile Chrome**: Pixel 5 dimensions
- **Mobile Safari**: iPhone 12 dimensions

### Performance Considerations

- Tests run against production build (`pnpm build && pnpm start`)
- Parallel execution for faster test runs
- Browser reuse for efficiency

### Adding New Tests

1. Create new `.spec.ts` file in `e2e/` directory
2. Follow existing naming conventions
3. Include both positive and negative test cases
4. Test responsive behavior when relevant
5. Add API tests for new endpoints

### Common Patterns

#### Page Navigation
```typescript
await page.goto('/dashboard');
await expect(page).toHaveURL('/dashboard');
```

#### Form Interactions
```typescript
await page.getByLabel('Email').fill('user@example.com');
await page.getByRole('button', { name: 'Submit' }).click();
```

#### API Testing
```typescript
const response = await request.get('/api/users');
expect(response.ok()).toBeTruthy();
const data = await response.json();
expect(data).toHaveProperty('users');
```

#### Responsive Testing
```typescript
await page.setViewportSize({ width: 375, height: 667 });
await expect(page.getByRole('button', { name: 'Menu' })).toBeVisible();
```
