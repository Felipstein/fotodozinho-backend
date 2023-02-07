import { currentPaymentMethodsRepository } from '../../../repositories';
import { CreatePaymentMethodController } from './CreatePaymentMethodController';
import { CreatePaymentMethodUseCases } from './CreatePaymentMethodUseCases';

export function createPaymentMethodFactory() {
  const useCases = new CreatePaymentMethodUseCases(currentPaymentMethodsRepository);
  const controller = new CreatePaymentMethodController(useCases);

  return { useCases, controller };
}
