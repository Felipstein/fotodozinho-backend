import { currentPaymentMethodsRepository, currentProductsRepository, currentPurchaseOrdersRepository, currentUsersRepository } from '../../../repositories';
import { CreatePurchaseOrderController } from './CreatePurchaseOrderController';
import { CreatePurchaseOrderUseCases } from './CreatePurchaseOrderUseCases';

export function createPurchaseOrderFactory() {
  const useCases = new CreatePurchaseOrderUseCases(
    currentPurchaseOrdersRepository,
    currentPaymentMethodsRepository,
    currentUsersRepository,
    currentProductsRepository,
  );
  const controller = new CreatePurchaseOrderController(useCases);

  return { useCases, controller };
}
