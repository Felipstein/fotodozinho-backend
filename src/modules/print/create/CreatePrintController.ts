import { Request, Response } from 'express';
import { BadRequestError } from '../../../errors/BadRequestError';
import { EnvProvider } from '../../../services/env-provider';
import { CreatePrintUseCases } from './CreatePrintUseCases';

export class CreatePrintController {

  constructor(
    private createPrintUseCases: CreatePrintUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { border, colorId, printPriceId, quantity, printOrderId } = req.body;

    if(!req.file) {
      throw new BadRequestError('A imagem é obrigatória');
    }

    const { originalname: imageName, filename: keyLocal } = req.file;
    const { key: keyS3, location: imageUrlS3 } = req.file as unknown as { key: string, location: string };

    const key = keyS3 || keyLocal;
    const imageUrl = imageUrlS3 || `${EnvProvider.host}/images/${key}`;

    const print = await this.createPrintUseCases.execute({
      imageName, imageUrl, key, border, colorId, printPriceId, quantity, printOrderId,
    });

    return res.status(201).json(print);
  }

}
