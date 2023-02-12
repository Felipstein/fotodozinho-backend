import { ListPurchaseOrdersController } from './ListPurchaseOrdersController';
import { ListPurchaseOrdersUseCases } from './ListPurchaseOrdersUseCases';

export function listPurchaseOrdersFactory() {
  const useCases = new ListPurchaseOrdersUseCases();
  const controller = new ListPurchaseOrdersController(useCases);

  return { useCases, controller };
}
