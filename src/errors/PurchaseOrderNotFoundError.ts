import { NotFoundError } from './NotFoundError';

export class PurchaseOrderNotFoundError extends NotFoundError {

  constructor() {
    super('Pedido de compras não encontrado');
  }

}
