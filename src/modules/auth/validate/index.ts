import { currentUsersRepository } from '../../../repositories';
import { ValidateTokenController } from './ValidateTokenController';
import { ValidateTokenUseCases } from './ValidateTokenUseCases';

export function validateTokenFactory() {
  const useCases = new ValidateTokenUseCases(currentUsersRepository);
  const controller = new ValidateTokenController(useCases);

  return { useCases, controller };
}
