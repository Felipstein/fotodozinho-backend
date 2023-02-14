import { Request, Response } from 'express';
import { DeleteFailedImageUploadedByKeyUseCases } from './DeleteFailedImageUploadedByKeyUseCases';

export class DeleteFailedImageUploadedByKeyController {

  constructor(
    private deleteFailedImageUplaodedByKeyUseCases: DeleteFailedImageUploadedByKeyUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { key } = req.params;

    await this.deleteFailedImageUplaodedByKeyUseCases.execute(key);

    return res.sendStatus(204);
  }

}
