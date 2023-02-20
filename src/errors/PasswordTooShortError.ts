import { BadRequestError } from './BadRequestError';

export class PasswordTooShortError extends BadRequestError {

  constructor() {
    super('Senha muito curta. Por favor, escolha uma senha com pelo menos 3 caracteres');
  }

}
