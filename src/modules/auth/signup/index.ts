import { currentUsersRepository } from '../../../repositories';
import { SignUpController } from './SignUpController';
import { SignUpUseCases } from './SignUpUseCases';

export function signUpFactory() {
  const useCases = new SignUpUseCases(currentUsersRepository);
  const controller = new SignUpController(useCases);

  return { useCases, controller };
}
