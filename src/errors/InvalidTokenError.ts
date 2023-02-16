import { UnauthorizedError } from './UnauthorizedError';

export class InvalidTokenError extends UnauthorizedError {

  constructor() {
    super('Token inválido');
  }

}
