import type { PrismaClient } from './generated/prisma/client.js';

export async function seedSampleGame(prisma: PrismaClient) {
  const game = await prisma.game.upsert({
    where: { slug: 'sample-square' },
    update: {
      title: 'میدان نمونه',
      description: 'نمونهٔ قابل بازی در یک میدان عمومی.',
      status: 'PUBLISHED',
      publishedAt: new Date('2026-01-01T00:00:00.000Z'),
    },
    create: {
      slug: 'sample-square',
      title: 'میدان نمونه',
      description: 'نمونهٔ قابل بازی در یک میدان عمومی.',
      status: 'PUBLISHED',
      publishedAt: new Date('2026-01-01T00:00:00.000Z'),
    },
  });

  const gate = await prisma.mission.upsert({
    where: { gameId_code: { gameId: game.id, code: 'gate' } },
    update: { sortOrder: 1, title: 'دروازه', description: 'اولین نشانه را نزدیک دروازه پیدا کن.' },
    create: {
      gameId: game.id,
      code: 'gate',
      sortOrder: 1,
      title: 'دروازه',
      description: 'اولین نشانه را نزدیک دروازه پیدا کن.',
    },
  });

  const square = await prisma.mission.upsert({
    where: { gameId_code: { gameId: game.id, code: 'square' } },
    update: { sortOrder: 2, title: 'میدان', description: 'نشانهٔ دوم داخل میدان است.' },
    create: {
      gameId: game.id,
      code: 'square',
      sortOrder: 2,
      title: 'میدان',
      description: 'نشانهٔ دوم داخل میدان است.',
    },
  });

  await prisma.item.upsert({
    where: { missionId_code: { missionId: gate.id, code: 'arch' } },
    update: {
      title: 'طاق',
      rarity: 'COMMON',
      points: 10,
      latitude: '35.699700',
      longitude: '51.338000',
      radiusMeters: 40,
    },
    create: {
      missionId: gate.id,
      code: 'arch',
      title: 'طاق',
      rarity: 'COMMON',
      points: 10,
      latitude: '35.699700',
      longitude: '51.338000',
      radiusMeters: 40,
    },
  });

  await prisma.item.upsert({
    where: { missionId_code: { missionId: square.id, code: 'fountain' } },
    update: {
      title: 'فواره',
      rarity: 'RARE',
      points: 25,
      latitude: '35.700100',
      longitude: '51.337200',
      radiusMeters: 40,
    },
    create: {
      missionId: square.id,
      code: 'fountain',
      title: 'فواره',
      rarity: 'RARE',
      points: 25,
      latitude: '35.700100',
      longitude: '51.337200',
      radiusMeters: 40,
    },
  });

  await prisma.item.upsert({
    where: { missionId_code: { missionId: square.id, code: 'column' } },
    update: {
      title: 'ستون',
      rarity: 'EPIC',
      points: 50,
      latitude: '35.699200',
      longitude: '51.338400',
      radiusMeters: 40,
    },
    create: {
      missionId: square.id,
      code: 'column',
      title: 'ستون',
      rarity: 'EPIC',
      points: 50,
      latitude: '35.699200',
      longitude: '51.338400',
      radiusMeters: 40,
    },
  });

  await prisma.badge.upsert({
    where: { gameId_code: { gameId: game.id, code: 'explorer' } },
    update: { title: 'کاوشگر', requiredPoints: 35 },
    create: { gameId: game.id, code: 'explorer', title: 'کاوشگر', requiredPoints: 35 },
  });
}
