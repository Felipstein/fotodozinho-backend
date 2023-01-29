import { NotFoundError } from './NotFoundError';

export class ColorNotFoundError extends NotFoundError {

  constructor() {
    super('Cor/descrição não encontrada');
  }

}
