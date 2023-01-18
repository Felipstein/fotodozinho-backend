import { currentUserRepository } from '../../../repositories';
import { UpdateUserController } from './UpdateUserController';
import { UpdateUserUseCases } from './UpdateUserUseCases';

export function updateUserFactory() {
  const updateUserUseCases = new UpdateUserUseCases(currentUserRepository);
  const updateUserController = new UpdateUserController(updateUserUseCases);

  return { useCases: updateUserUseCases, controller: updateUserController };
}
