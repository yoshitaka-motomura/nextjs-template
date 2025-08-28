import { Hono, Context } from 'hono'
import { handle } from 'hono/vercel'
const app = new Hono().basePath('/api')

// health check
app.get('/health', (c: Context) =>
  c.json({ status: 'ok', timestamp: new Date().toISOString(), mode: process.env.NODE_ENV }),
)

export const GET = handle(app)
export const POST = handle(app)

export type AppType = typeof app
