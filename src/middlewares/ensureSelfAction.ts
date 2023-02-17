import { NextFunction, Request, Response } from 'express';
import { verifyUserAuth } from '../services/verify-user-auth';

export function ensureSelfAction(locationOfUserId: 'body' | 'params' = 'params') {
  if(!['body', 'params'].includes(locationOfUserId)) {
    throw new Error('Invalid location of userId property: only "body" or "params" options');
  }

  return function middleware(req: Request, res: Response, next: NextFunction) {
    let userIdAction;

    if(locationOfUserId === 'params') {
      userIdAction = req.params.userId;
    } else {
      userIdAction = req.body.userId;
    }

    const { userId: userIdRequesting } = req;

    verifyUserAuth.execute({ id: userIdRequesting }, userIdAction)
      .then(next)
      .catch(next);
  };
}

