import { APIError } from './APIError';

export class UnauthorizedError extends APIError {

  constructor(message?: string) {
    super(401, message || 'Você não está autenticado para isso, portanto, acesso não autorizado');
  }

}
