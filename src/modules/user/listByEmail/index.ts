import { currentUsersRepository } from '../../../repositories';
import { ListUserByEmailController } from './ListUserByEmailController';
import { ListUserByEmailUseCases } from './ListUserByEmailUseCases';

export function listUserByEmailFactory() {
  const listUserByEmailUseCases = new ListUserByEmailUseCases(currentUsersRepository);
  const listUserByEmailController = new ListUserByEmailController(listUserByEmailUseCases);

  return { useCases: listUserByEmailUseCases, controller: listUserByEmailController };
}
