import { BadRequestError } from './BadRequestError';

export class PasswordsDoNotMatchError extends BadRequestError {

  constructor() {
    super('A confirmação de senha não corresponde à senha inserida. Por favor, tente novamente');
  }

}
