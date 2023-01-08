import { ListUsersController } from './ListUsersController';
import { ListUsersUseCases } from './ListUsersUseCases';
import { currentRepository } from '../../../repositories';

export function listUsersFactory() {
  const listUsersUseCases = new ListUsersUseCases(currentRepository);
  const listUsersController = new ListUsersController(listUsersUseCases);

  return { useCases: listUsersUseCases, controller: listUsersController };
}
