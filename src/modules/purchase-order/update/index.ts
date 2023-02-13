import { currentPurchaseOrdersRepository } from '../../../repositories';
import { UpdatePurchaseOrderController } from './UpdatePurchaseOrderController';
import { UpdatePurchaseOrderUseCases } from './UpdatePurchaseOrderUseCases';

export function updatePurchaseOrderFactory() {
  const useCases = new UpdatePurchaseOrderUseCases(currentPurchaseOrdersRepository);
  const controller = new UpdatePurchaseOrderController(useCases);

  return { useCases, controller };
}
