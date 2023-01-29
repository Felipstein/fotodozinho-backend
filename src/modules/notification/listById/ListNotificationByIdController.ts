import { Request, Response } from 'express';
import { ListNotificationByIdUseCases } from './ListNotificationByIdUseCases';

export class ListNotificationByIdController {

  constructor(
    private listNotificationByIdUseCases: ListNotificationByIdUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const notification = await this.listNotificationByIdUseCases.execute(id);

    return res.json(notification);
  }

}
