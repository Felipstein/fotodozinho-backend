import { APIError } from './APIError';

export class ConflictRequestError extends APIError {

  constructor(message: string) {
    super(409, message);
  }

}
