import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { verifyInitData } from './telegram-init-data.js';

const botToken = '123456:test-token';
const now = 1_700_000_000;

function signedInitData(fields: Record<string, string>, token = botToken): string {
  const entries = Object.entries(fields).sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0));
  const dataCheckString = entries.map(([key, value]) => `${key}=${value}`).join('\n');
  const secretKey = createHmac('sha256', 'WebAppData').update(token).digest();
  const hash = createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
  return new URLSearchParams({ ...fields, hash }).toString();
}

describe('verifyInitData', () => {
  it('accepts a fresh signed payload and ignores nothing outside it', () => {
    const initData = signedInitData({
      auth_date: String(now),
      user: JSON.stringify({ id: 42, first_name: 'Ada' }),
    });
    expect(verifyInitData(initData, botToken, now)).toEqual({
      telegramId: '42',
      displayName: 'Ada',
    });
  });

  it('rejects a bad hash, a stale auth date, and a missing user', () => {
    const fresh = signedInitData({
      auth_date: String(now),
      user: JSON.stringify({ id: 42, first_name: 'Ada' }),
    });
    expect(() => verifyInitData(fresh.replace(/hash=[^&]+/, 'hash=' + 'ab'.repeat(32)), botToken, now)).toThrow();
    const stale = signedInitData({
      auth_date: String(now - 24 * 60 * 60 - 1),
      user: JSON.stringify({ id: 42, first_name: 'Ada' }),
    });
    expect(() => verifyInitData(stale, botToken, now)).toThrow();
    expect(() => verifyInitData(signedInitData({ auth_date: String(now) }), botToken, now)).toThrow();
  });
});
