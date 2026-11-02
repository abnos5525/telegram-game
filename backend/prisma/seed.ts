import { pathToFileURL } from 'node:url';
import { createPrismaClient } from '../src/prisma.js';
import { seedSampleGame } from '../src/sample-seed.js';

const isDirectRun =
  process.argv[1] !== undefined &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  const prisma = createPrismaClient();
  seedSampleGame(prisma)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (error: unknown) => {
      console.error(error);
      await prisma.$disconnect();
      process.exit(1);
    });
}
