import { currentUserRepository } from '../../../repositories';
import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUseCases } from './DeleteUserUseCases';

export function deleteUserFactory() {
  const deleteUserUseCases = new DeleteUserUseCases(currentUserRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCases);

  return { useCases: deleteUserUseCases, controller: deleteUserController };
}
