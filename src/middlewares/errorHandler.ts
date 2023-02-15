import { NextFunction, Request, Response } from 'express';
import { APIError } from '../errors/APIError';
import { DetailedError } from '../errors/DetailedError';
import { InternalServerError } from '../errors/InternalServerError';
import { PartialContentError } from '../errors/PartialContentError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if(error instanceof APIError) {

    if(error instanceof DetailedError) {
      return res.status(error.statusCode).json({ message: error.message, details: error.details });
    }

    if(error instanceof PartialContentError) {
      console.warn('#### UNKNOW ERROR ####');
      console.error(error.errorOcurred);
      console.warn('#### UNKNOW ERROR ####');
    }

    return res.status(error.statusCode).json({ message: error.message });
  }

  console.warn('#### UNKNOW ERROR ####');
  console.error(error);
  console.warn('#### UNKNOW ERROR ####');

  const message = error instanceof InternalServerError ?
    error.message :
    'Desculpe, ocorreu um erro inesperado em nosso servidor. Por favor, tente novamente mais tarde';

  return res.status(500).json({ message });
}
