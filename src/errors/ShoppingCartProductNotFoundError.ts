import { NotFoundError } from './NotFoundError';

export class ShoppingCartProductNotFoundError extends NotFoundError {

  constructor() {
    super('Produto no carrinho de compras não encontrado');
  }

}
