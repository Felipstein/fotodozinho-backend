import { currentPrintOrdersRepository, currentUsersRepository } from '../../../repositories';
import { ListPrintOrdersByUserIdController } from './ListPrintOrdersByUserIdController';
import { ListPrintOrdersByUserIdUseCases } from './ListPrintOrdersByUserIdUseCases';

export function listPrintOrdersByUserIdFactory() {
  const listPrintOrdersByUserIdUseCases = new ListPrintOrdersByUserIdUseCases(currentPrintOrdersRepository, currentUsersRepository);
  const listPrintOrdersByUserIdController = new ListPrintOrdersByUserIdController(listPrintOrdersByUserIdUseCases);

  return { useCases: listPrintOrdersByUserIdUseCases, controller: listPrintOrdersByUserIdController };
}
