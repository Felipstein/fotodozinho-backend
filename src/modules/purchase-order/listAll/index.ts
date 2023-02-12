import { currentPurchaseOrdersRepository } from '../../../repositories';
import { ListPurchaseOrdersController } from './ListPurchaseOrdersController';
import { ListPurchaseOrdersUseCases } from './ListPurchaseOrdersUseCases';

export function listPurchaseOrdersFactory() {
  const useCases = new ListPurchaseOrdersUseCases(currentPurchaseOrdersRepository);
  const controller = new ListPurchaseOrdersController(useCases);

  return { useCases, controller };
}
