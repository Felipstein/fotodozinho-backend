import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../errors/ForbiddenError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { currentUsersRepository } from '../repositories';

export async function ensureSelfAction(req: Request, res: Response, next: NextFunction) {
  const { userId: userIdAction } = req.params;
  const { userId: userIdRequesting } = req;

  if(!userIdRequesting) {
    throw new UnauthorizedError();
  }

  const userRequesting = await currentUsersRepository.listById(userIdRequesting);
  if(!userRequesting) {
    throw new UnauthorizedError();
  }

  if(userRequesting.admin) {
    return next();
  }

  if(userIdRequesting !== userIdAction) {
    throw new ForbiddenError();
  }

  next();
}
