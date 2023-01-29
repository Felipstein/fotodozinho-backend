import { currentUsersRepository } from '../../../repositories';
import { UpdateUserController } from './UpdateUserController';
import { UpdateUserUseCases } from './UpdateUserUseCases';

export function updateUserFactory() {
  const updateUserUseCases = new UpdateUserUseCases(currentUsersRepository);
  const updateUserController = new UpdateUserController(updateUserUseCases);

  return { useCases: updateUserUseCases, controller: updateUserController };
}
