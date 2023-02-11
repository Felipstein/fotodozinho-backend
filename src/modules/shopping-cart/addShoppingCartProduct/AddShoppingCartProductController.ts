import { Request, Response } from 'express';
import { AddShoppingCartProductUseCases } from './AddShoppingCartProductUseCases';

export class AddShoppingCartProductController {

  constructor(
    private addShoppingCartProductUseCases: AddShoppingCartProductUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req;
    const { productId, quantity } = req.body;

    const product = await this.addShoppingCartProductUseCases.execute(userId, { productId, quantity });

    return res.status(201).json(product);
  }

}
