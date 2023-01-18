import { ListUserByIdController } from './ListUserByIdController';
import { currentUserRepository } from '../../../repositories';
import { ListUserByIdUseCases } from './ListUserByIdUseCases';

export function listUserByIdFactory() {
  const listUserByIdUseCases = new ListUserByIdUseCases(currentUserRepository);
  const listUserByIdController = new ListUserByIdController(listUserByIdUseCases);

  return { useCases: listUserByIdUseCases, controller: listUserByIdController };
}
