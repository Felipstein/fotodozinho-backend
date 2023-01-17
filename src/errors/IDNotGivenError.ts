import { BadRequestError } from './BadRequestError';

export class IDNotGivenError extends BadRequestError {

  constructor() {
    super('ID não informado');
  }

}
