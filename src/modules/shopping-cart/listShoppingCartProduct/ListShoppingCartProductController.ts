import { Request, Response } from 'express';
import { ListShoppingCartProductUseCases } from './ListShoppingCartProductUseCases';
import { ShoppingCartProductNotFoundError } from '../../../errors/ShoppingCartProductNotFoundError';

export class ListShoppingCartProductController {

  constructor(
    private listShoppingCartProductUseCases: ListShoppingCartProductUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { userIdOfShoppingCartRequest } = req;
    const { productId } = req.params;

    const product = await this.listShoppingCartProductUseCases.execute(userIdOfShoppingCartRequest, productId, req.userId);
    if(!product) {
      throw new ShoppingCartProductNotFoundError();
    }

    return res.json(product);
  }

}
