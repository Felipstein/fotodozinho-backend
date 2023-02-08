import { Request, Response } from 'express';
import { ListProductsUseCases } from './ListProductsUseCases';

export class ListProductsController {

  constructor(
    private listProductsUseCases: ListProductsUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const products = await this.listProductsUseCases.execute();

    return res.json(products);
  }

}
