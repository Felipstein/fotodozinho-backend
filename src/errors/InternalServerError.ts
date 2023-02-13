export class InternalServerError extends Error {

  constructor(message?: string) {
    super(message || 'Desculpe, ocorreu um erro inesperado em nosso servidor. Por favor, tente novamente mais tarde');
  }

}
