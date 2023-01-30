import { Request, Response } from 'express';
import { ListNotificationsByUserIdUseCases } from './ListNotificationsByUserIdUseCases';

export class ListNotificationsByUserIdController {

  constructor(
    private listNotificationsByUserIdUseCases: ListNotificationsByUserIdUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;

    const notifications = await this.listNotificationsByUserIdUseCases.execute(userId);

    return res.json(notifications);
  }

}
