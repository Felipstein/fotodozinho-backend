import { currentPaymentMethodsRepository } from '../../../repositories';
import { DeletePaymentMethodController } from './DeletePaymentMethodController';
import { DeletePaymentMethodUseCases } from './DeletePaymentMethodUseCaes';

export function deletePaymentMethodFactory() {
  const useCases = new DeletePaymentMethodUseCases(currentPaymentMethodsRepository);
  const controller = new DeletePaymentMethodController(useCases);

  return { useCases, controller };
}
