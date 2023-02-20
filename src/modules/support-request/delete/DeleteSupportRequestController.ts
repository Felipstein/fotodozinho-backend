import { Request, Response } from 'express';
import { DeleteSupportRequestUseCase } from './DeleteSupportRequestUseCase';

export class DeleteSupportRequestController {

  constructor(
    private deleteSupportRequestUseCase: DeleteSupportRequestUseCase,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.deleteSupportRequestUseCase.execute(id);

    return res.sendStatus(204);
  }

}
