import { currentPrintOrdersRepository, currentUsersRepository } from '../../../repositories';
import { ListPrintOrdersByUserIdStatusController } from './ListPrintOrdersByUserIdController';
import { ListPrintOrdersByUserIdStatusUseCases } from './ListPrintOrdersByUserIdUseCases';

export function listPrintOrdersByUserIdStatusFactory() {
  const listPrintOrdersByUserIdStatusUseCases = new ListPrintOrdersByUserIdStatusUseCases(currentPrintOrdersRepository, currentUsersRepository);
  const listPrintOrdersByUserIdStatusController = new ListPrintOrdersByUserIdStatusController(listPrintOrdersByUserIdStatusUseCases);

  return { useCases: listPrintOrdersByUserIdStatusUseCases, controller: listPrintOrdersByUserIdStatusController };
}
