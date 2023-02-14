import { Request, Response } from 'express';
import { ListFailedImagesUploadedUseCases } from './ListFailedImagesUploadedUseCases';

export class ListFailedImagesUploadedController {

  constructor(
    private listFailedImagesUploadedUseCases: ListFailedImagesUploadedUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const failedImagesUploaded = await this.listFailedImagesUploadedUseCases.execute();

    return res.json(failedImagesUploaded);
  }

}
