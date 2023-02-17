import { NextFunction, Request, Response } from 'express';
import { verifyUserAuth } from '../services/verify-user-auth';

export function ensureSelfAction(req: Request, res: Response, next: NextFunction) {
  const { userId: userIdAction } = req.params;
  const { userId: userIdRequesting } = req;

  verifyUserAuth.execute({ id: userIdRequesting }, userIdAction)
    .then(next)
    .catch(next);
}
