import { ListUserByIdController } from './ListUserByIdController';
import { currentRepository } from '../../../repositories';
import { ListUserByIdUseCases } from './ListUserByIdUseCases';

export function listUserByIdFactory() {
  const listUserByIdUseCases = new ListUserByIdUseCases(currentRepository);
  const listUserByIdController = new ListUserByIdController(listUserByIdUseCases);

  return { useCases: listUserByIdUseCases, controller: listUserByIdController };
}
