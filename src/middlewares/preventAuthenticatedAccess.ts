import { NextFunction, Request, Response } from 'express';
import { currentUsersRepository } from '../repositories';
import { AlreadyAuthenticatedError } from '../errors/AlreadyAuthenticatedError';
import { accessTokenProvider } from '../providers/AccessToken';

export async function preventAuthenticatedAccess(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  if(!authorization && typeof authorization !== 'string') {
    return next();
  }

  const [bearer, token] = authorization.split(' ');

  if(bearer !== 'Bearer') {
    return next();
  }

  try {
    await accessTokenProvider.verify(token);
  } catch {
    return next();
  }

  const { userId } = accessTokenProvider.decode(token);
  if(!userId) {
    return next();
  }

  const userExists = await currentUsersRepository.listById(userId);
  if(!userExists) {
    return next();
  }

  throw new AlreadyAuthenticatedError();
}
