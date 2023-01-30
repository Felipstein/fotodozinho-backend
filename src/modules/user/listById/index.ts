import { ListUserByIdController } from './ListUserByIdController';
import { currentUsersRepository } from '../../../repositories';
import { ListUserByIdUseCases } from './ListUserByIdUseCases';

export function listUserByIdFactory() {
  const listUserByIdUseCases = new ListUserByIdUseCases(currentUsersRepository);
  const listUserByIdController = new ListUserByIdController(listUserByIdUseCases);

  return { useCases: listUserByIdUseCases, controller: listUserByIdController };
}
