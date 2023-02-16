import cron from 'node-cron';
import { currentRevokedTokensRepository } from '../repositories';

const task = cron.schedule('*/30 * * * *', async () => {
  try {
    await currentRevokedTokensRepository.deleteExpiredTokens();
  } catch (err: any) {
    console.warn('Fail to delete revoked tokens:', err);
  }
});

task.start();
