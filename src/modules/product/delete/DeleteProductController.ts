import { Request, Response } from 'express';
import { DeleteProductUseCases } from './DeleteProductUseCases';

export class DeleteProductController {

  constructor(
    private deleteProductUseCases: DeleteProductUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.deleteProductUseCases.execute(id);

    return res.sendStatus(204);
  }

}
