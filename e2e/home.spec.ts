import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should display the home page correctly', async ({ page }) => {
    await page.goto('/')

    // Check if the page title is correct
    await expect(page).toHaveTitle(/Create Next App/)

    // Check if the Next.js logo is visible
    const logo = page.getByAltText('Next.js logo')
    await expect(logo).toBeVisible()

    // Check if the main content is present
    await expect(page.getByText('Get started by editing')).toBeVisible()
    await expect(page.getByText('src/app/page.tsx')).toBeVisible()
    await expect(page.getByText('Save and see your changes instantly')).toBeVisible()

    // Check if the action buttons are present
    const deployButton = page.getByRole('link', { name: /deploy now/i })
    const docsButton = page.getByRole('link', { name: /read our docs/i })

    await expect(deployButton).toBeVisible()
    await expect(docsButton).toBeVisible()

    // Check if the footer links are present
    await expect(page.getByRole('link', { name: /learn/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /examples/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /go to nextjs.org/i })).toBeVisible()
  })

  test('should navigate to external links correctly', async ({ page }) => {
    await page.goto('/')

    // Test Deploy button link
    const deployButton = page.getByRole('link', { name: /deploy now/i })
    await expect(deployButton).toHaveAttribute('href', /vercel\.com/)
    await expect(deployButton).toHaveAttribute('target', '_blank')

    // Test Docs button link
    const docsButton = page.getByRole('link', { name: /read our docs/i })
    await expect(docsButton).toHaveAttribute('href', /nextjs\.org\/docs/)
    await expect(docsButton).toHaveAttribute('target', '_blank')

    // Test footer links
    const learnLink = page.getByRole('link', { name: /learn/i })
    await expect(learnLink).toHaveAttribute('href', /nextjs\.org\/learn/)
    await expect(learnLink).toHaveAttribute('target', '_blank')
  })

  test('should be responsive', async ({ page }) => {
    await page.goto('/')

    // Test desktop layout
    await page.setViewportSize({ width: 1280, height: 720 })
    await expect(page.getByText('Get started by editing')).toBeVisible()

    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.getByText('Get started by editing')).toBeVisible()

    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.getByText('Get started by editing')).toBeVisible()
  })
})
