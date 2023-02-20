import { currentUsersRepository } from '../../../repositories';
import { ValidateRecoveryPasswordTokenController } from './ValidateRecoveryPasswordTokenController';
import { ValidateRecoveryPasswordTokenUseCase } from './ValidateRecoveryPasswordTokenUseCase';

export function validateRecoveryPasswordTokenFactory() {
  const useCases = new ValidateRecoveryPasswordTokenUseCase(currentUsersRepository);
  const controller = new ValidateRecoveryPasswordTokenController(useCases);

  return { useCases, controller };
}
