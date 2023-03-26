import { Request, Response } from 'express';
import { SendNewValidateEmailUseCase } from './SendNewValidateEmailuseCase';

export class SendNewValidateEmailController {

  constructor(
    private sendNewValdiateEmailUseCase: SendNewValidateEmailUseCase,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    await this.sendNewValdiateEmailUseCase.execute(email, req.userId);

    return res.sendStatus(200);
  }

}
