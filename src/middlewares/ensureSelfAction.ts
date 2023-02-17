import { NextFunction, Request, Response } from 'express';
import { verifyUserAuth } from '../services/verify-user-auth';

interface UserIdPropertyOptions {
  fieldUserIdName: string;
}

const userIdPropertyOptionsDefaults: UserIdPropertyOptions = {
  fieldUserIdName: 'userId',
};

export function ensureSelfAction(locationOfUserId: 'body' | 'params' = 'params', userIdPropertyOptions: UserIdPropertyOptions = userIdPropertyOptionsDefaults) {
  if(!['body', 'params'].includes(locationOfUserId)) {
    throw new Error('Invalid location of userId property: only "body" or "params" options');
  }

  return function middleware(req: Request, res: Response, next: NextFunction) {
    let userIdAction;

    const fieldUserIdName = userIdPropertyOptions?.fieldUserIdName || 'userId';

    if(locationOfUserId === 'params') {
      userIdAction = req.params[fieldUserIdName];
    } else {
      userIdAction = req.body[fieldUserIdName];
    }

    const { userId: userIdRequesting } = req;

    verifyUserAuth.execute({ id: userIdRequesting }, userIdAction)
      .then(next)
      .catch(next);
  };
}

