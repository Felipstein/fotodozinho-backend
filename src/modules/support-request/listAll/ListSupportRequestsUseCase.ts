import { ISupportRequest } from '../../../entities/support-request/ISupportRequest';
import { ISupportRequestsRepository } from '../../../repositories/support-requests/ISupportRequestsRepository';

export class ListSupportRequestsUseCase {

  constructor(
    private supportRequestsRepository: ISupportRequestsRepository,
  ) { }

  async execute(): Promise<ISupportRequest[]> {
    const supportRequests = await this.supportRequestsRepository.listAll();

    return supportRequests;
  }

}
