import { currentUsersRepository } from '../../../repositories';
import { ListDeletedUsersController } from './ListDeletedUsersController';
import { ListDeletedUsersUseCases } from './ListDeletedUsersUseCases';

export function listDeletedUsersFactory() {
  const useCases = new ListDeletedUsersUseCases(currentUsersRepository);
  const controller = new ListDeletedUsersController(useCases);

  return { useCases, controller };
}
