import { Request, Response } from 'express';
import { UpdateReadNotificationUseCases } from './UpdateReadNotificationUseCases';

export class UpdateReadNotificationController {

  constructor(
    private updateReadNotificationUseCases: UpdateReadNotificationUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { read } = req.body;

    const notification = await this.updateReadNotificationUseCases.execute(id, { read });

    return res.json(notification);
  }

}
