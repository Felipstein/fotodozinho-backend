import { currentUsersRepository } from '../../../repositories';
import { RecoveryPasswordController } from './RecoveryPasswordController';
import { RecoveryPasswordUseCase } from './RecoveryPasswordUseCase';

export function recoveryPasswordFactory() {
  const useCases = new RecoveryPasswordUseCase(currentUsersRepository);
  const controller = new RecoveryPasswordController(useCases);

  return { useCases, controller };
}
