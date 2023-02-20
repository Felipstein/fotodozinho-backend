import { BadRequestError } from './BadRequestError';

export class SamePasswordsError extends BadRequestError {

  constructor() {
    super('A nova senha não pode ser igual à sua atual');
  }

}
