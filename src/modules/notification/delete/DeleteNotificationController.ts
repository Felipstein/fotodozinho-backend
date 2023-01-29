import { Request, Response } from 'express';
import { DeleteNotificationUseCases } from './DeleteNotificationUseCases';

export class DeleteNotificationController {

  constructor(
    private deleteNotificationUseCases: DeleteNotificationUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.deleteNotificationUseCases.execute(id);

    return res.sendStatus(204);
  }

}
