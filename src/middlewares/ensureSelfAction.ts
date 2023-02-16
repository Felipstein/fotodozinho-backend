import { NextFunction, Request, Response } from 'express';
import { ForbiddenError } from '../errors/ForbiddenError';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export async function ensureSelfAction(req: Request, res: Response, next: NextFunction) {
  const { userId: userIdOfAction } = req.params;
  const { userId: userIdAuthenticated } = req;

  if(!userIdAuthenticated) {
    throw new UnauthorizedError();
  }

  if(userIdOfAction !== userIdAuthenticated) {
    throw new ForbiddenError();
  }

  next();
}
