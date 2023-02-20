import { currentUsersRepository } from '../../../repositories';
import { SetPasswordController } from './SetPasswordController';
import { SetPasswordUseCase } from './SetPasswordUseCase';

export function setPasswordFactory() {
  const useCases = new SetPasswordUseCase(currentUsersRepository);
  const controller = new SetPasswordController(useCases);

  return { useCases, controller };
}
