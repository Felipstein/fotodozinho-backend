import { Request, Response } from 'express';
import { CreateNotificationUseCases } from './CreateNotificationUseCases';

export class CreateNotificationController {

  constructor(
    private createNotificationUseCases: CreateNotificationUseCases,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { title, message, userId } = req.body;

    const notification = await this.createNotificationUseCases.execute({ title, message, userId });

    return res.json(notification);
  }

}
