import { NotFoundError } from './NotFoundError';

export class FailedImageUploadedNotFoundError extends NotFoundError {

  constructor() {
    super('Imagem não encontrada');
  }

}
