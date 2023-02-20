import { currentUsersRepository } from '../../../repositories';
import { ValidateEmailController } from './ValidateEmailController';
import { ValidateEmailUseCase } from './ValidateEmailUseCase';

export function validateEmailFactory() {
  const useCases = new ValidateEmailUseCase(currentUsersRepository);
  const controller = new ValidateEmailController(useCases);

  return { useCases, controller };
}
