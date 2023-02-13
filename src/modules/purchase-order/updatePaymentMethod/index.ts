import { currentPaymentMethodsRepository, currentPurchaseOrdersRepository } from '../../../repositories';
import { UpdatePurchaseOrderPaymentMethodController } from './UpdatePurchaseOrderPaymentMethodController';
import { UpdatePurchaseOrderPaymentMethodUseCases } from './UpdatePurchaseOrderPaymentMethodUseCases';

export function updatePurchaseOrderPaymentMethodFactory() {
  const useCases = new UpdatePurchaseOrderPaymentMethodUseCases(currentPurchaseOrdersRepository, currentPaymentMethodsRepository);
  const controller = new UpdatePurchaseOrderPaymentMethodController(useCases);

  return { useCases, controller };
}
