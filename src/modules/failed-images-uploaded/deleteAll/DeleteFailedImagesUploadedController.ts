import { Request, Response } from 'express';
import { DeleteFailedImagesUploadedUseCases } from './DeleteFailedImagesUploadedUseCases';

export class DeleteFailedImagesUploadedController {

  constructor(
    private deleteFailedImagesUploadedUseCases: DeleteFailedImagesUploadedUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {

    await this.deleteFailedImagesUploadedUseCases.execute();

    return res.sendStatus(204);
  }

}
