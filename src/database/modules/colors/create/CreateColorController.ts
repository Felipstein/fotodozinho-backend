import { Request, Response } from 'express';
import { CreateColorUseCases } from './CreateColorUseCases';

export class CreateColorController {

  constructor(
    private createColorUseCases: CreateColorUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { color } = req.body;

    const colorCreated = await this.createColorUseCases.execute({ color });

    return res.status(201).json(colorCreated);
  }

}
