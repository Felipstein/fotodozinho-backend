import { currentUsersRepository } from '../../../repositories';
import { ListInactiveUsersController } from './ListInactiveUsersController';
import { ListInactiveUsersUseCases } from './ListInactiveUsersUseCases';

export function listInactiveUsersFactory() {
  const useCases = new ListInactiveUsersUseCases(currentUsersRepository);
  const controller = new ListInactiveUsersController(useCases);

  return { useCases, controller };
}
