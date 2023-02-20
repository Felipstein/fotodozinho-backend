import { ValidateRecoveryPasswordTokenController } from './ValidateRecoveryPasswordTokenController';
import { ValidateRecoveryPasswordTokenUseCase } from './ValidateRecoveryPasswordTokenUseCase';

export function validateRecoveryPasswordTokenFactory() {
  const useCases = new ValidateRecoveryPasswordTokenUseCase();
  const controller = new ValidateRecoveryPasswordTokenController(useCases);

  return { useCases, controller };
}
