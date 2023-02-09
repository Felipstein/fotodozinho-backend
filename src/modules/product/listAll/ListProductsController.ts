import { Request, Response } from 'express';
import { ListProductsUseCases } from './ListProductsUseCases';

export class ListProductsController {

  constructor(
    private listProductsUseCases: ListProductsUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const categoryId = req.query.categoryId as string | undefined;

    const products = await this.listProductsUseCases.execute(categoryId);

    return res.json(products);
  }

}
