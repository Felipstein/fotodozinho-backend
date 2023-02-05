import { NotFoundError } from './NotFoundError';

export class ProductCategoryNotFoundError extends NotFoundError {

  constructor() {
    super('Categoria de produto não encontrado');
  }

}
