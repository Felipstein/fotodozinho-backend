import { UnauthorizedError } from './UnauthorizedError';

export class TokenExpiredError extends UnauthorizedError {

  constructor() {
    super('Sessão expirada. Faça login novamente para continuar');
  }

}
