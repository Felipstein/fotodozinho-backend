import { NotFoundError } from './NotFoundError';

export class ShoppingCartNotFoundError extends NotFoundError {

  constructor() {
    super('Carrinho de compras não encontrado');
  }

}
