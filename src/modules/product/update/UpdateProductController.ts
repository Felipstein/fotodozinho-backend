import { Request, Response } from 'express';
import { UpdateProductUseCases } from './UpdateProductUseCases';

export class UpdateProductController {

  constructor(
    private updateProductUseCases: UpdateProductUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description, price, rated, categoryId } = req.body;

    const product = await this.updateProductUseCases.execute(id, { name, description, price, rated, categoryId });

    return res.json(product);
  }

}
