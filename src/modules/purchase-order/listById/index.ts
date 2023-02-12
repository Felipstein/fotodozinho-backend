import { currentPurchaseOrdersRepository } from '../../../repositories';
import { ListPurchaseOrderByIdController } from './ListPurchaseOrderByIdController';
import { ListPurchaseOrderByIdUseCases } from './ListPurchaseOrderByIdUseCases';

export function listPurchaseOrderByIdFactory() {
  const useCases = new ListPurchaseOrderByIdUseCases(currentPurchaseOrdersRepository);
  const controller = new ListPurchaseOrderByIdController(useCases);

  return { useCases, controller };
}
