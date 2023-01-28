import { buildFormalString } from '../utils/buildFormalString';
import { BadRequestError } from './BadRequestError';

export class FieldsMustBeNumericError extends BadRequestError {

  constructor(...fields: string[]) {
    super(`O${fields.length > 1 ? 's' :''} campo${fields.length > 1 ? 's' : ''} ${buildFormalString(fields)} deve${fields.length > 1 ? 'm' : ''} ser de valor númerico`);
  }

}
