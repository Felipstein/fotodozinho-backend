import cron from 'node-cron';
import { currentRevokedTokensRepository, currentUsersRepository } from '../repositories';

const task = cron.schedule('*/30 * * * *', async () => {
  try {
    await currentRevokedTokensRepository.deleteExpiredTokens();
  } catch (err: any) {
    console.warn('Fail to delete revoked tokens:', err);
  }

  try {
    await currentUsersRepository.deleteDeactivedUsersForAmonth();
  } catch (err: any) {
    console.warn('Fail to delete deactived users for a month:', err);
  }
});

task.start();
