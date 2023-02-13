import { Request, Response } from 'express';
import { CreateProductUseCases } from './CreateProductUseCases';
import EnvProvider from '../../../utils/EnvProvider';
import { BadRequestError } from '../../../errors/BadRequestError';

export class CreateProductController {

  constructor(
    private createProductUseCases: CreateProductUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, price, categoryId } = req.body;

    if(!req.file) {
      throw new BadRequestError('A imagem é obrigatória');
    }

    const { originalname: imageName, filename: keyLocal } = req.file;
    const { key: keyS3, location: imageUrlS3 } = req.file as unknown as { key: string, location: string };

    const key = keyS3 || keyLocal;
    const imageUrl = imageUrlS3 || `${EnvProvider.host}/images/${key}`;

    const product = await this.createProductUseCases.execute({ name, description, price, imageName, imageUrl, key, categoryId });

    return res.status(201).json(product);
  }

}
