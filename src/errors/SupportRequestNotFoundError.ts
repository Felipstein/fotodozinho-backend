import { NotFoundError } from './NotFoundError';

export class SupportRequestNotFoundError extends NotFoundError {

  constructor() {
    super('Pedido para o suporte não encontrado');
  }

}
