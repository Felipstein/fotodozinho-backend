import { Request, Response } from 'express';
import { SupportRequestCreateUseCase } from './SupportRequestCreateUseCase';

export class SupportRequestCreateController {

  constructor(
    private supportRequestCreateUseCase: SupportRequestCreateUseCase,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    await this.supportRequestCreateUseCase.execute({ email }, req.userId);

    return res.sendStatus(201);
  }

}
