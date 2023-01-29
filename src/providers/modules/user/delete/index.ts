import { currentNotificationsRepository, currentUsersRepository } from '../../../repositories';
import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUseCases } from './DeleteUserUseCases';

export function deleteUserFactory() {
  const deleteUserUseCases = new DeleteUserUseCases(currentUsersRepository, currentNotificationsRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCases);

  return { useCases: deleteUserUseCases, controller: deleteUserController };
}
