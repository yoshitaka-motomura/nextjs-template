import { test, expect } from '@playwright/test'

test.describe('API Endpoints', () => {
  test('health check endpoint should return ok status', async ({ request }) => {
    // Test GET request
    const getResponse = await request.get('/api/health')

    expect(getResponse.ok()).toBeTruthy()
    expect(getResponse.status()).toBe(200)

    const responseData = await getResponse.json()
    expect(responseData).toHaveProperty('status', 'ok')
    expect(responseData).toHaveProperty('timestamp')

    // Verify timestamp is recent (within last 5 seconds)
    const timestamp = new Date(responseData.timestamp)
    const now = new Date()
    const timeDiff = now.getTime() - timestamp.getTime()
    expect(timeDiff).toBeLessThan(5000) // 5 seconds
  })

  test('health check endpoint should support HEAD request', async ({ request }) => {
    // Test HEAD request
    const headResponse = await request.head('/api/health')

    expect(headResponse.ok()).toBeTruthy()
    expect(headResponse.status()).toBe(200)

    // HEAD request should have headers but no body
    const text = await headResponse.text()
    expect(text).toBe('')
  })

  test('health check endpoint should have correct headers', async ({ request }) => {
    const response = await request.get('/api/health')

    expect(response.ok()).toBeTruthy()

    // Check for no-cache headers
    const headers = response.headers()
    expect(headers['cache-control']).toContain('no-cache')
    expect(headers['cache-control']).toContain('no-store')
    expect(headers['cache-control']).toContain('must-revalidate')

    // Check content type
    expect(headers['content-type']).toContain('application/json')
  })

  test('non-existent API endpoint should return 404', async ({ request }) => {
    const response = await request.get('/api/non-existent')

    expect(response.status()).toBe(404)
  })
})
