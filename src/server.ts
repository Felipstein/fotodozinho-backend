import { app } from './app';
import { prisma } from './database';
import { EnvProvider } from './services/env-provider';

async function main() {
  try {
    await prisma.$connect();
    console.info('🔌 Database connected');

    app.listen(EnvProvider.port, () => console.log(`✅ Server started at port ${EnvProvider.port}`));
  } catch (err) {
    console.error('⚠️ Failed to connect to the database', err);
    console.warn('⚠️ Aborting the server');
  }
}

main();
