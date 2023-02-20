import { Request, Response } from 'express';
import { ListSupportRequestsUseCase } from './ListSupportRequestsUseCase';

export class ListSupportRequestsController {

  constructor(
    private listSupportRequestsUseCase: ListSupportRequestsUseCase,
  ) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const supportRequests = await this.listSupportRequestsUseCase.execute();

    return res.json(supportRequests);
  }

}
