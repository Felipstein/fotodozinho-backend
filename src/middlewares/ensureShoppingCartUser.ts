import { NextFunction, Request, Response } from 'express';
import { UserNotFoundError } from '../errors/UserNotFoundError';
import { IShoppingCartsRepository } from '../repositories/shopping-carts/IShoppingCartsRepository';
import { IUsersRepository } from '../repositories/users/IUsersRepository';

export function ensureShoppingCartUser(shoppingCartsRepository: IShoppingCartsRepository, usersRepository: IUsersRepository) {
  if(!usersRepository || !shoppingCartsRepository) {
    throw new Error('Users or Shopping Carts repository is null');
  }

  async function injectShoppingCart(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;

    const userExists = await usersRepository.listById(userId);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    let shoppingCart = await shoppingCartsRepository.listByUserId(userId);
    if(!shoppingCart) {
      shoppingCart = await shoppingCartsRepository.create(userId);
    }

    req.shoppingCart = shoppingCart;

    next();
  }

  return injectShoppingCart;
}
