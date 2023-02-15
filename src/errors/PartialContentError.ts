import { APIError } from './APIError';

export class PartialContentError extends APIError {

  readonly errorOcurred: Error;

  constructor(message: string, errorOcurred: Error) {
    super(206, message);
    this.errorOcurred = errorOcurred;
  }

}
