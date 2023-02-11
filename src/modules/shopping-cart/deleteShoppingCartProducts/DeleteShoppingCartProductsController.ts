import { Request, Response } from 'express';
import { DeleteShoppingCartProductsUseCases } from './DeleteShoppingCartProductsUseCases';

export class DeleteShoppingCartProductsController {

  constructor(
    private deleteShoppingCartProductsUseCases: DeleteShoppingCartProductsUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req;
    const { productsId } = req.body;

    await this.deleteShoppingCartProductsUseCases.execute(userId, productsId);

    return res.sendStatus(204);
  }

}
