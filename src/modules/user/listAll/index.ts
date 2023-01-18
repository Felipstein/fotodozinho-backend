import { ListUsersController } from './ListUsersController';
import { ListUsersUseCases } from './ListUsersUseCases';
import { currentUserRepository } from '../../../repositories';

export function listUsersFactory() {
  const listUsersUseCases = new ListUsersUseCases(currentUserRepository);
  const listUsersController = new ListUsersController(listUsersUseCases);

  return { useCases: listUsersUseCases, controller: listUsersController };
}
