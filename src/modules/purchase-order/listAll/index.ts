import { currentPurchaseOrdersRepository, currentUsersRepository } from '../../../repositories';
import { ListPurchaseOrdersController } from './ListPurchaseOrdersController';
import { ListPurchaseOrdersUseCases } from './ListPurchaseOrdersUseCases';

export function listPurchaseOrdersFactory() {
  const useCases = new ListPurchaseOrdersUseCases(currentPurchaseOrdersRepository, currentUsersRepository);
  const controller = new ListPurchaseOrdersController(useCases);

  return { useCases, controller };
}
