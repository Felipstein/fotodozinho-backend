import cron from 'node-cron';
import { currentPasswordRecoveryTokensRepository, currentRevokedTokensRepository, currentValidatorTokensRepository } from '../repositories';

const task = cron.schedule('*/30 * * * *', async () => {
  try {
    await currentRevokedTokensRepository.deleteExpiredTokens();
  } catch (err: any) {
    console.warn('Fail to delete revoked tokens:', err);
  }

  try {
    await currentValidatorTokensRepository.deleteExpiredTokens();
  } catch (err: any) {
    console.warn('Fail to delete revoked tokens:', err);
  }

  try {
    await currentPasswordRecoveryTokensRepository.deleteExpiredTokens();
  } catch (err: any) {
    console.warn('Fail to delete revoked tokens:', err);
  }
});

task.start();
