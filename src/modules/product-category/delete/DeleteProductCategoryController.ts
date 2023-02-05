import { Request, Response } from 'express';
import { DeleteProductCategoryUseCases } from './DeleteProductCategoryUseCases';

export class DeleteProductCategoryController {

  constructor(
    private deleteProductCategoryUseCases: DeleteProductCategoryUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.deleteProductCategoryUseCases.execute(id);

    return res.sendStatus(204);
  }

}
