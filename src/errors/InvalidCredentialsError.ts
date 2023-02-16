import { UnauthorizedError } from './UnauthorizedError';

export class InvalidCredentialsError extends UnauthorizedError {

  constructor() {
    super('E-mail ou senha inválidos');
  }

}
