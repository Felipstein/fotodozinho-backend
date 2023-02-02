import { currentUsersRepository } from '../../../repositories';
import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUseCases } from './DeleteUserUseCases';

export function deleteUserFactory() {
  const deleteUserUseCases = new DeleteUserUseCases(currentUsersRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCases);

  return { useCases: deleteUserUseCases, controller: deleteUserController };
}
