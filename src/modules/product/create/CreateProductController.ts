import { Request, Response } from 'express';
import { CreateProductUseCases } from './CreateProductUseCases';

export class CreateProductController {

  constructor(
    private createProductUseCases: CreateProductUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, price, categoryId } = req.body;
    const { originalname: imageName, filename: keyLocal } = req.file;

    const key = keyLocal;

    const imageUrl = '';

    const product = await this.createProductUseCases.execute({ name, description, price, imageName, imageUrl, key, categoryId });

    return res.status(201).json(product);
  }

}
