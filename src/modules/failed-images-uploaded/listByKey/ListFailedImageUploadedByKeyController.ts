import { Request, Response } from 'express';
import { ListFailedImageUploadedByKeyUseCases } from './ListFailedImageUploadedByKeyUseCases';

export class ListFailedImageUploadedByKeyController {

  constructor(
    private listFailedImageUploadedByKeyUseCases: ListFailedImageUploadedByKeyUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { key } = req.params;

    const failedImageUploaded = await this.listFailedImageUploadedByKeyUseCases.execute(key);

    return res.json(failedImageUploaded);
  }

}
