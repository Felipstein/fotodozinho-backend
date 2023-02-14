import { Request, Response } from 'express';
import { CreateFailedImageUploadedUseCases } from './CreateFailedImageUploadedUseCases';

export class CreateFailedImageUploadedController {

  constructor(
    private createFailedImageUploadedUseCases: CreateFailedImageUploadedUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { key } = req.body;

    const failedImageUploaded = await this.createFailedImageUploadedUseCases.execute({ key });

    return res.status(201).json(failedImageUploaded);
  }

}
