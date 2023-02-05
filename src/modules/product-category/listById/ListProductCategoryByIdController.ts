import { Request, Response } from 'express';
import { ListProductCategoryByIdUseCases } from './ListProductCategoryByIdUseCases';

export class ListProductCategoryByIdController {

  constructor(
    private listProductCategoryByIdUseCases: ListProductCategoryByIdUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const productCategory = await this.listProductCategoryByIdUseCases.execute(id);

    return res.json(productCategory);
  }

}
