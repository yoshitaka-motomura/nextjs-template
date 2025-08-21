import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse(
    JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        pragma: 'no-cache',
        expires: '0',
        'surrogate-control': 'no-store'
      }
    }
  );
}

export const dynamic = 'force-dynamic';

export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'cache-control': 'no-store'
    }
  });
}
