import { NotFoundError } from './NotFoundError';

export class ProductNotFoundError extends NotFoundError {

  constructor() {
    super('Produto não encontrado');
  }

}
