import { buildFormalString } from '../utils/buildFormalString';
import { BadRequestError } from './BadRequestError';

export class RequiredFieldsError extends BadRequestError {

  constructor(...fields: string[]) {
    super(fields.length > 0 ? (
      `O${fields.length > 1 ? 's' : ''} campo${fields.length > 1 ? 's' : ''} ${buildFormalString(fields)} ${fields.length > 1 ? 'são' : 'é'} obrigatório${fields.length > 1 ? 's' : ''}`
    ) : (
      'Preencha todos os campos obrigatórios'
    ));
  }

}
