import { Request, Response } from 'express';
import { ListProductCategoriesUseCases } from './ListProductCategoriesUseCases';

export class ListProductCategoriesController {

  constructor(
    private listProductCategoriesUseCases: ListProductCategoriesUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const productCategories = await this.listProductCategoriesUseCases.execute();

    return res.json(productCategories);
  }

}
