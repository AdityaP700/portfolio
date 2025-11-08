// src/app/api/visitors/route.ts
import { redis } from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // Get the visitor's IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Hash the IP for privacy (optional but recommended)
    const ipHash = await hashIP(ip);

    // Check if this IP has visited before
    const hasVisited = await redis.get(`visitor:${ipHash}`);

    if (!hasVisited) {
      // New visitor - increment total count and mark this IP as visited
      await redis.incr('visitors:total');
      // Store the IP hash with a long expiration (e.g., 365 days)
      await redis.set(`visitor:${ipHash}`, 'true', { ex: 365 * 24 * 60 * 60 });
    }

    // Get the total visitor count
    const totalVisitors = await redis.get('visitors:total') || 0;

    return NextResponse.json({
      count: totalVisitors,
      isNewVisitor: !hasVisited
    });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    // Return a fallback count if Redis is not configured
    return NextResponse.json({ count: 0, isNewVisitor: false });
  }
}

// Simple hash function for IP addresses
async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
