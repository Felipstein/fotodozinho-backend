import { BadRequestError } from './BadRequestError';

export class RequiredFieldsError extends BadRequestError {

  constructor() {
    super('Os campos nome, e-mail e senha são obrigatórios');
  }

}
