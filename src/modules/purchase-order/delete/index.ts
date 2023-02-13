import { currentPurchaseOrdersRepository } from '../../../repositories';
import { DeletePurchaseOrderController } from './DeletePurchaseOrderController';
import { DeletePurchaseOrderUseCases } from './DeletePurchaseOrderUseCases';

export function deletePurchaseOrderFactory() {
  const useCases = new DeletePurchaseOrderUseCases(currentPurchaseOrdersRepository);
  const controller = new DeletePurchaseOrderController(useCases);

  return { useCases, controller };
}
