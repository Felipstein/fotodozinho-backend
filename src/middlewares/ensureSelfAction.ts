import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../errors/ForbiddenError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { currentUsersRepository } from '../repositories';

export async function ensureSelfAction(req: Request, res: Response, next: NextFunction) {
  const { userId: userIdRequesting } = req.params;
  const { userId: userIdAuthenticated } = req;

  if(!userIdAuthenticated) {
    throw new UnauthorizedError();
  }

  const userRequesting = await currentUsersRepository.listById(userIdRequesting);
  if(!userIdRequesting) {
    throw new UnauthorizedError();
  }

  if(userRequesting.admin) {
    return next();
  }

  if(userIdRequesting !== userIdAuthenticated) {
    throw new ForbiddenError();
  }

  next();
}
