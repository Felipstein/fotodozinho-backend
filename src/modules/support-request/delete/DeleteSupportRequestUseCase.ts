import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { SupportRequestNotFoundError } from '../../../errors/SupportRequestNotFoundError';
import { ISupportRequestsRepository } from '../../../repositories/support-requests/ISupportRequestsRepository';

export class DeleteSupportRequestUseCase {

  constructor(
    private supportRequestsRepository: ISupportRequestsRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const supportRequestExists = await this.supportRequestsRepository.listById(id);
    if(!supportRequestExists) {
      throw new SupportRequestNotFoundError();
    }

    await this.supportRequestsRepository.delete(id);
  }

}
