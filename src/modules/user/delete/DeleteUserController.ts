import { Request, Response } from 'express';
import { DeleteUserUseCases } from './DeleteUserUseCases';

export class DeleteUserController {

  constructor(
    private deleteUserUseCases: DeleteUserUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.deleteUserUseCases.execute(id);

    return res.sendStatus(204);
  }

}
