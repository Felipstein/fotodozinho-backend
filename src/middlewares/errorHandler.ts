import { NextFunction, Request, Response } from 'express';
import { APIError } from '../errors/APIError';
import { DetailedError } from '../errors/DetailedError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if(error instanceof APIError) {

    if(error instanceof DetailedError) {
      return res.status(error.statusCode).json({ message: error.message, details: error.details });
    }

    return res.status(error.statusCode).json({ message: error.message });
  }

  console.warn('#### UNKNOW ERROR ####');
  console.error(error);
  console.warn('#### UNKNOW ERROR ####');

  return res.status(500).json({ message: 'Um erro interno ocorreu dentro dos nossos servidores. Tente novamente mais tarde' });
}
