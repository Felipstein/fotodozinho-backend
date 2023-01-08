import { APIError } from './APIError';

export class NotFoundError extends APIError {

  constructor(message?: string) {
    super(404, message || 'Não encontrado');
  }

}
