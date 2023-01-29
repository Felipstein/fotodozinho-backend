import { Request, Response } from 'express';
import { DeleteColorUseCases } from './DeleteColorUseCases';

export class DeleteColorController {

  constructor(
    private deleteColorUseCases: DeleteColorUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.deleteColorUseCases.execute(id);

    return res.sendStatus(204);
  }

}
