import { Request, Response } from 'express';
import { ListShoppingCartsUseCases } from './ListShoppingCartsUseCases';

export class ListShoppingCartsController {

  constructor(
    private listShoppingCartsUseCases: ListShoppingCartsUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const shoppingCarts = await this.listShoppingCartsUseCases.execute();

    return res.json(shoppingCarts);
  }

}
