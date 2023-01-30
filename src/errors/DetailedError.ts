import { APIError } from './APIError';

export class DetailedError extends APIError {

  readonly details: Record<string, unknown>;

  constructor(statusCode: number, details: Record<string, unknown>, message?: string) {
    super(statusCode, message ?? 'Erro');
    this.details = details;
  }

}
