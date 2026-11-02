import { createHmac, timingSafeEqual } from 'node:crypto';

export const AUTH_MAX_AGE_SECONDS = 24 * 60 * 60;
const CLOCK_SKEW_SECONDS = 60;

export class InitDataError extends Error {}

export type VerifiedTelegramUser = {
  telegramId: string;
  displayName: string;
};

export function verifyInitData(initData: string, botToken: string, nowSeconds: number): VerifiedTelegramUser {
  if (!botToken) {
    throw new InitDataError('Bot token is missing');
  }
  const params = new URLSearchParams(initData);
  const hash = params.get('hash') ?? '';
  if (!/^[0-9a-f]{64}$/i.test(hash)) {
    throw new InitDataError('Hash is missing');
  }
  const authDate = Number(params.get('auth_date'));
  if (!Number.isInteger(authDate)) {
    throw new InitDataError('auth_date is missing');
  }
  if (authDate > nowSeconds + CLOCK_SKEW_SECONDS || nowSeconds - authDate > AUTH_MAX_AGE_SECONDS) {
    throw new InitDataError('auth_date is not fresh');
  }

  const entries = [...params.entries()].filter(([key]) => key !== 'hash');
  entries.sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0));
  const dataCheckString = entries.map(([key, value]) => `${key}=${value}`).join('\n');
  const secretKey = createHmac('sha256', 'WebAppData').update(botToken).digest();
  const digest = createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
  const actual = Buffer.from(digest, 'hex');
  const expected = Buffer.from(hash, 'hex');
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    throw new InitDataError('Hash does not match');
  }

  const userRaw = params.get('user');
  if (!userRaw) {
    throw new InitDataError('User is missing');
  }
  let user: unknown;
  try {
    user = JSON.parse(userRaw);
  } catch {
    throw new InitDataError('User is not JSON');
  }
  if (!user || typeof user !== 'object') {
    throw new InitDataError('User is not an object');
  }
  const record = user as Record<string, unknown>;
  const id = record.id;
  const telegramId = typeof id === 'number' || typeof id === 'string' ? String(id) : '';
  if (!/^\d+$/.test(telegramId)) {
    throw new InitDataError('User id is missing');
  }
  const firstName = typeof record.first_name === 'string' ? record.first_name : '';
  const lastName = typeof record.last_name === 'string' ? record.last_name : '';
  const username = typeof record.username === 'string' ? record.username : '';
  const displayName = [firstName, lastName].filter(Boolean).join(' ') || username || telegramId;
  return { telegramId, displayName };
}
