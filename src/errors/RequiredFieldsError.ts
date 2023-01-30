import { buildFormalString } from '../utils/buildFormalString';
import { BadRequestError } from './BadRequestError';

export class RequiredFieldsError extends BadRequestError {

  constructor(...fields: string[]) {
    super(RequiredFieldsError.buildStringMessage(fields));
  }

  static buildStringMessage(fields?: string[]) {
    if(typeof fields === 'object' && fields instanceof Array && fields.length > 0) {
      return `O${fields.length > 1 ? 's' : ''} campo${fields.length > 1 ? 's' : ''} ${buildFormalString(fields)} ${fields.length > 1 ? 'são' : 'é'} obrigatório${fields.length > 1 ? 's' : ''}`;
    }

    return 'Preencha todos os campos obrigatórios';
  }

}
