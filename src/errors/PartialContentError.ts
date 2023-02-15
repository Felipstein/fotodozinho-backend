import { APIError } from './APIError';

export class PartialContentError extends APIError {

  constructor(message: string) {
    super(206, message);
  }

}
