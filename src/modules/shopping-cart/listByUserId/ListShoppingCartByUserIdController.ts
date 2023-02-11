import { Request, Response } from 'express';
import { ListShoppingCartByUserIdUseCases } from './ListShoppingCartByUserIdUseCases';

export class ListShoppingCartByUserIdController {

  constructor(
    private listShoppingCartByUserIdUseCases: ListShoppingCartByUserIdUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    if(req.shoppingCart) {
      return res.json(req.shoppingCart);
    }

    const { userId } = req.params;

    const shoppingCart = await this.listShoppingCartByUserIdUseCases.execute(userId);

    return res.json(shoppingCart);
  }

}
