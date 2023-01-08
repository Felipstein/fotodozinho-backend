import { APIError } from './APIError';

export class BadRequestError extends APIError {

  constructor(message?: string) {
    super(400, message || 'Requisição inválida');
  }

}
