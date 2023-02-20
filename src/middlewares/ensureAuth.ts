import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { InvalidTokenError } from '../errors/InvalidTokenError';
import { currentUsersRepository } from '../repositories';
import { accessTokenProvider } from '../providers/AccessToken';

export async function ensureAuth(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  if(!authorization) {
    throw new UnauthorizedError();
  }

  if(typeof authorization !== 'string') {
    throw new UnauthorizedError();
  }

  const [bearer, token] = authorization.split(' ');

  if(bearer !== 'Bearer') {
    throw new InvalidTokenError();
  }

  await accessTokenProvider.verify(token);

  const { userId } = accessTokenProvider.decode(token);
  if(!userId) {
    throw new InvalidTokenError();
  }

  const userExists = await currentUsersRepository.listById(userId);
  if(!userExists) {
    throw new InvalidTokenError();
  }

  req.userId = userId;
  req.tokenRequesting = token;
  req.userIsAdmin = userExists.admin;

  next();
}
