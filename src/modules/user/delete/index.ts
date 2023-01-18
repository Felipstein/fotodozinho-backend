import { currentRepository } from '../../../repositories';
import { DeleteUserController } from './DeleteUserController';
import { DeleteUserUseCases } from './DeleteUserUseCases';

export function deleteUserFactory() {
  const deleteUserUseCases = new DeleteUserUseCases(currentRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCases);

  return { useCases: deleteUserUseCases, controller: deleteUserController };
}
