import { currentUsersRepository } from '../../../repositories';
import { SignInController } from './SignInController';
import { SignInUseCases } from './SignInUseCases';

export function signInFactory() {
  const useCases = new SignInUseCases(currentUsersRepository);
  const controller = new SignInController(useCases);

  return { useCases, controller };
}
