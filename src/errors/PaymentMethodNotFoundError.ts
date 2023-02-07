import { NotFoundError } from './NotFoundError';

export class PaymentMethodNotFoundError extends NotFoundError {

  constructor() {
    super('Método de pagamento não encontrado');
  }

}
