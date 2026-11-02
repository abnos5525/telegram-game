import 'dotenv/config';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { seedSampleGame } from './sample-seed.js';
import { createPrismaClient } from './prisma.js';

const prisma = createPrismaClient();

describe('sample game data', () => {
  beforeAll(async () => {
    await seedSampleGame(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('seeds one published game with ordered missions, items, and a badge', async () => {
    const game = await prisma.game.findUniqueOrThrow({
      where: { slug: 'sample-square' },
      include: {
        missions: { orderBy: { sortOrder: 'asc' }, include: { items: true } },
        badges: true,
      },
    });

    expect(game.status).toBe('PUBLISHED');
    expect(game.missions.map((mission) => mission.code)).toEqual(['gate', 'square']);
    expect(game.missions[0]?.items).toHaveLength(1);
    expect(game.missions[1]?.items).toHaveLength(2);
    expect(game.badges[0]?.requiredPoints).toBe(35);
  });

  it('rejects a second collection of the same item', async () => {
    const item = await prisma.item.findFirstOrThrow({ where: { code: 'arch' } });

    await expect(
      prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: { telegramId: 'db-spec-user', displayName: 'Spec' },
        });
        const data = { userId: user.id, itemId: item.id, pointsAwarded: item.points };
        await tx.collection.create({ data });
        await tx.collection.create({ data });
      }),
    ).rejects.toMatchObject({ code: 'P2002' });

    const leftover = await prisma.user.findUnique({ where: { telegramId: 'db-spec-user' } });
    expect(leftover).toBeNull();
  });
});
