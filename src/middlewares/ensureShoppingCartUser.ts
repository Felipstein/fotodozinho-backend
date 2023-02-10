import { NextFunction, Request, Response } from 'express';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { IUsersRepository } from '../repositories/users/IUsersRepository';

export function ensureShoppingCartUser(usersRepository: IUsersRepository) {
  if(!usersRepository) {
    throw new Error('Users repository is null');
  }

  async function ensure(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    const userExists = await usersRepository.listById(userId);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    req.userId = userId;

    next();
  }

  return ensure;
}
