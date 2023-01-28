import { NotFoundError } from './NotFoundError';

export class PrintPriceNotFound extends NotFoundError {

  constructor() {
    super('Tamanho/tipo de revelação não encontrado');
  }

}
