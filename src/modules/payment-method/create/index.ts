import { currentPaymentMethodsRepository } from '../../../repositories';
import { ListPaymentMethodByIdController } from './ListPaymentMethodByIdController';
import { ListPaymentMethodByIdUseCases } from './ListPaymentMethodByIdUseCases';

export function listPaymentMethodByIdFactory() {
  const useCases = new ListPaymentMethodByIdUseCases(currentPaymentMethodsRepository);
  const controller = new ListPaymentMethodByIdController(useCases);

  return { useCases, controller };
}
