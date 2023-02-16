import { UnauthorizedError } from './UnauthorizedError';

export class RevokedTokenError extends UnauthorizedError {

  constructor() {
    super('Sessão expirada. Faça login novamente para continuar');
  }

}
