import { Request, Response } from 'express';
import { EnvProvider } from '../../../services/env-provider';
import { UpdateProductUseCases } from './UpdateProductUseCases';

export class UpdateProductController {

  constructor(
    private updateProductUseCases: UpdateProductUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, description, price, rated, categoryId } = req.body;

    let product;

    if(req.file) {
      const { originalname: imageName, filename: keyLocal } = req.file;
      const { key: keyS3, location: imageUrlS3 } = req.file as unknown as { key: string, location: string };

      const key = keyS3 || keyLocal;
      const imageUrl = imageUrlS3 || `${EnvProvider.host}/images/${key}`;

      product = await this.updateProductUseCases.execute(id, { name, description, price, rated, imageName, imageUrl, key, categoryId });

      return res.json(product);
    }

    product = await this.updateProductUseCases.execute(id, { name, description, price, rated, categoryId });

    return res.json(product);

  }

}
