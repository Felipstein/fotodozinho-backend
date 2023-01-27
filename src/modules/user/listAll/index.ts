import { currentUsersRepository } from '../../../repositories';
import { ListUsersController } from './ListUsersController';
import { ListUsersUseCases } from './ListUsersUseCases';

export function listUsersFactory() {
  const listUsersUseCases = new ListUsersUseCases(currentUsersRepository);
  const listUsersController = new ListUsersController(listUsersUseCases);

  return { useCases: listUsersUseCases, controller: listUsersController };
}
