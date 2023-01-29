import { Request, Response } from 'express';
import { ListAllNotificationsUseCases } from './ListAllNotificationsUseCases';

export class ListAllNotificationsController {

  constructor(
    private listAllNotificationsUseCases: ListAllNotificationsUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const notifications = await this.listAllNotificationsUseCases.execute();

    return res.json(notifications);
  }

}
