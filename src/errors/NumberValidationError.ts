import { BadRequestError } from './BadRequestError';

export class NumberValidationError extends BadRequestError {

  constructor(field?: string) {
    super(`O valor fornecido para o campo ${field || 'númerico'} é inválido. Por favor, verifique se você está enviando um número válido.`);
  }

}
