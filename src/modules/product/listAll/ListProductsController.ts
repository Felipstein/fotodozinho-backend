import { Request, Response } from 'express';
import { BadRequestError } from '../../../errors/BadRequestError';
import { ListProductsUseCases } from './ListProductsUseCases';

export class ListProductsController {

  constructor(
    private listProductsUseCases: ListProductsUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.query;

    if(typeof categoryId !== 'string') {
      throw new BadRequestError('Tipo de categoria inválido');
    }

    const products = await this.listProductsUseCases.execute(categoryId);

    return res.json(products);
  }

}
