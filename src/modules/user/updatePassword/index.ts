import { currentUsersRepository } from '../../../repositories';
import { UpdateUserPasswordController } from './UpdateUserPasswordController';
import { UpdateUserPasswordUseCases } from './UpdateUserPasswordUseCases';

export function updateUserPasswordFactory() {
  const useCases = new UpdateUserPasswordUseCases(currentUsersRepository);
  const controller = new UpdateUserPasswordController(useCases);

  return { useCases, controller };
}
