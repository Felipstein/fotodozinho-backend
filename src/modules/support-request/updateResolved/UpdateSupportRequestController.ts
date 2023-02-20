import { Request, Response } from 'express';
import { UpdateSupportRequestResolvedUseCase } from './UpdateSupportRequestUseCase';

export class UpdateSupportRequestController {

  constructor(
    private updateSupportRequestUseCase: UpdateSupportRequestResolvedUseCase,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { resolved } = req.body;

    const supportRequest = await this.updateSupportRequestUseCase.execute(id, { resolved });

    return res.json(supportRequest);
  }

}
