import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createHmac } from 'node:crypto';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { AppModule } from './app.module.js';
import { DbService } from './db/db.service.js';

const botToken = '123456:security-spec';
const now = Math.floor(Date.now() / 1000);

function signedInitData(telegramId: number, firstName: string): string {
  const fields: Record<string, string> = {
    auth_date: String(now),
    user: JSON.stringify({ id: telegramId, first_name: firstName }),
  };
  const entries = Object.entries(fields).sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0));
  const dataCheckString = entries.map(([key, value]) => `${key}=${value}`).join('\n');
  const secretKey = createHmac('sha256', 'WebAppData').update(botToken).digest();
  const hash = createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
  return new URLSearchParams({ ...fields, hash }).toString();
}

describe('telegram auth and ownership', () => {
  let app: INestApplication;
  let db: DbService;

  beforeAll(async () => {
    process.env.TELEGRAM_BOT_TOKEN = botToken;
    process.env.AUTH_TOKEN_SECRET = 'security-spec-secret';
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();
    db = app.get(DbService);
  });

  afterAll(async () => {
    const users = await db.client.user.findMany({
      where: { telegramId: { in: ['9001', '9002'] } },
      select: { id: true },
    });
    const ids = users.map((user) => user.id);
    if (ids.length > 0) {
      await db.client.auditLog.deleteMany({ where: { actorId: { in: ids } } });
      await db.client.user.deleteMany({ where: { id: { in: ids } } });
    }
    await app.close();
  });

  it('rejects a tampered payload and an extra client user id', async () => {
    const server = app.getHttpServer();
    const tampered = signedInitData(9001, 'One').replace(/hash=[^&]+/, `hash=${'cd'.repeat(32)}`);
    expect((await request(server).post('/auth/telegram').send({ initData: tampered })).status).toBe(401);
    const extra = await request(server)
      .post('/auth/telegram')
      .send({ initData: signedInitData(9001, 'One'), telegramId: '9002' });
    expect(extra.status).toBe(400);
  });

  it('lets a player read only their own user, and an admin read another', async () => {
    const server = app.getHttpServer();
    const first = await request(server).post('/auth/telegram').send({ initData: signedInitData(9001, 'One') });
    const second = await request(server).post('/auth/telegram').send({ initData: signedInitData(9002, 'Two') });
    expect(first.status).toBe(201);
    expect(second.status).toBe(201);
    expect(first.body.user.role).toBe('PLAYER');

    const denied = await request(server)
      .get(`/users/${second.body.user.id}`)
      .set('Authorization', `Bearer ${first.body.token}`);
    expect(denied.status).toBe(403);

    await db.client.user.update({ where: { id: second.body.user.id }, data: { role: 'ADMIN' } });
    const allowed = await request(server)
      .get(`/users/${first.body.user.id}`)
      .set('Authorization', `Bearer ${second.body.token}`);
    expect(allowed.status).toBe(200);
    expect(allowed.body).toEqual({ id: first.body.user.id, displayName: 'One', role: 'PLAYER' });

    const audits = await db.client.auditLog.count({
      where: { actorId: second.body.user.id, action: 'user.read', targetId: first.body.user.id },
    });
    expect(audits).toBe(1);
  });

  it('rate limits repeated auth attempts', async () => {
    process.env.AUTH_RATE_LIMIT = '2';
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    const rateApp = moduleRef.createNestApplication();
    await rateApp.init();
    try {
      const server = rateApp.getHttpServer();
      expect((await request(server).post('/auth/telegram').send({ initData: 'bad' })).status).toBe(401);
      expect((await request(server).post('/auth/telegram').send({ initData: 'bad' })).status).toBe(401);
      expect((await request(server).post('/auth/telegram').send({ initData: 'bad' })).status).toBe(429);
    } finally {
      delete process.env.AUTH_RATE_LIMIT;
      await rateApp.close();
    }
  });
});
