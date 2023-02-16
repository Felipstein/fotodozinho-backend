import { APIError } from './APIError';

export class ForbiddenError extends APIError {

  constructor(message?: string) {
    super(403, message || 'Acesso não autorizado');
  }

}
