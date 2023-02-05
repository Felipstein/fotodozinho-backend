import { Request, Response } from 'express';
import { CreateProductCategoryUseCases } from './CreateProductCategoryUseCases';

export class CreateProductCategoryController {

  constructor(
    private createProductCategoryUseCases: CreateProductCategoryUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;

    const productCategory = await this.createProductCategoryUseCases.execute({ name });

    return res.status(201).json(productCategory);
  }

}
