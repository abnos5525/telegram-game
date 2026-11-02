import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InitDataError, verifyInitData } from './telegram-init-data.js';
import { SessionError, readSession, signSession } from './session-token.js';
import { DbService } from '../db/db.service.js';

export type AuthUser = {
  id: string;
  displayName: string;
  role: 'PLAYER' | 'ADMIN';
};

@Injectable()
export class AuthService {
  constructor(private readonly db: DbService) {}

  async login(initData: string) {
    const now = Math.floor(Date.now() / 1000);
    let verified: ReturnType<typeof verifyInitData>;
    try {
      verified = verifyInitData(initData, requiredEnv('TELEGRAM_BOT_TOKEN'), now);
    } catch (error) {
      if (error instanceof InitDataError) {
        throw new UnauthorizedException();
      }
      throw error;
    }
    const user = await this.db.client.user.upsert({
      where: { telegramId: verified.telegramId },
      create: {
        telegramId: verified.telegramId,
        displayName: verified.displayName,
        role: 'PLAYER',
      },
      update: { displayName: verified.displayName },
      select: { id: true, displayName: true, role: true },
    });
    return {
      token: signSession(user.id, requiredEnv('AUTH_TOKEN_SECRET'), now),
      user,
    };
  }

  async userFromToken(token: string): Promise<AuthUser> {
    let userId: string;
    try {
      userId = readSession(token, requiredEnv('AUTH_TOKEN_SECRET'), Math.floor(Date.now() / 1000)).sub;
    } catch (error) {
      if (error instanceof SessionError) {
        throw new UnauthorizedException();
      }
      throw error;
    }
    const user = await this.db.client.user.findUnique({
      where: { id: userId },
      select: { id: true, displayName: true, role: true },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is required`);
  }
  return value;
}
