import { Request, Response } from 'express';
import { ListProductByIdUseCases } from './ListProductByIdUseCases';

export class ListProductByIdController {

  constructor(
    private listProductByIdUseCases: ListProductByIdUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const product = await this.listProductByIdUseCases.execute(id);

    return res.json(product);
  }

}
