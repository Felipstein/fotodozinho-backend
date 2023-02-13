import { StringHelperService } from '../services/string-helper';
import { BadRequestError } from './BadRequestError';

export class RequiredFieldsError extends BadRequestError {

  constructor(...fields: string[]) {
    super(RequiredFieldsError.buildStringMessage(fields));
  }

  static buildStringMessage(fields?: string[]) {
    if(typeof fields === 'object' && fields instanceof Array && fields.length > 0) {
      return `O${fields.length > 1 ? 's' : ''} campo${fields.length > 1 ? 's' : ''} ${StringHelperService.formatList(fields)} ${fields.length > 1 ? 'são' : 'é'} obrigatório${fields.length > 1 ? 's' : ''}`;
    }

    return 'Preencha todos os campos obrigatórios';
  }

}
