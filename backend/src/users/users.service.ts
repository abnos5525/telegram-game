import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import type { AuthUser } from '../auth/auth.service.js';
import { DbService } from '../db/db.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly db: DbService) {}

  async getForRequester(requester: AuthUser, targetId: string) {
    if (requester.id !== targetId && requester.role !== 'ADMIN') {
      throw new ForbiddenException();
    }
    const user = await this.db.client.user.findUnique({
      where: { id: targetId },
      select: { id: true, displayName: true, role: true },
    });
    if (!user) {
      throw new NotFoundException();
    }
    if (requester.role === 'ADMIN' && requester.id !== targetId) {
      await this.db.client.auditLog.create({
        data: {
          actorId: requester.id,
          action: 'user.read',
          targetType: 'User',
          targetId,
        },
      });
    }
    return user;
  }
}
