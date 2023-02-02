import { NotFoundError } from './NotFoundError';

export class PrintOrderNotFound extends NotFoundError {

  constructor() {
    super('Pedido de revelação não encontrado');
  }

}
