import { ForbiddenError } from './ForbiddenError';

export class AlreadyAuthenticatedError extends ForbiddenError {

  constructor() {
    super('Você já está autenticado');
  }

}
