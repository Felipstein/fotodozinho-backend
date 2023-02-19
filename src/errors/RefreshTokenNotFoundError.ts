import { NotFoundError } from './NotFoundError';

export class RefreshTokenNotFoundError extends NotFoundError {

  constructor() {
    super('Refresh Token não encontrado');
  }

}
