import { currentPaymentMethodsRepository } from '../../../repositories';
import { ListPaymentMethodsController } from './ListPaymentMethodsController';
import { ListPaymentMethodsUseCases } from './ListPaymentMethodsUseCases';

export function listPaymentMethodsFactory() {
  const useCases = new ListPaymentMethodsUseCases(currentPaymentMethodsRepository);
  const controller = new ListPaymentMethodsController(useCases);

  return { useCases, controller };
}
