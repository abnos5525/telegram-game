import { createHmac, timingSafeEqual } from 'node:crypto';

export const SESSION_TTL_SECONDS = 60 * 60;

export class SessionError extends Error {}

export function signSession(userId: string, secret: string, nowSeconds: number): string {
  const body = Buffer.from(JSON.stringify({ sub: userId, exp: nowSeconds + SESSION_TTL_SECONDS })).toString('base64url');
  const signature = createHmac('sha256', secret).update(body).digest('base64url');
  return `${body}.${signature}`;
}

export function readSession(token: string, secret: string, nowSeconds: number): { sub: string } {
  const parts = token.split('.');
  if (parts.length !== 2 || !parts[0] || !parts[1]) {
    throw new SessionError('Token shape is invalid');
  }
  const [body, signature] = parts;
  const expected = createHmac('sha256', secret).update(body).digest('base64url');
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    throw new SessionError('Token signature is invalid');
  }
  let payload: unknown;
  try {
    payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
  } catch {
    throw new SessionError('Token payload is invalid');
  }
  if (!payload || typeof payload !== 'object') {
    throw new SessionError('Token payload is invalid');
  }
  const record = payload as Record<string, unknown>;
  if (typeof record.sub !== 'string' || !record.sub || typeof record.exp !== 'number') {
    throw new SessionError('Token payload is incomplete');
  }
  if (record.exp <= nowSeconds) {
    throw new SessionError('Token is expired');
  }
  return { sub: record.sub };
}
