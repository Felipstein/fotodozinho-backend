import { ISupportRequest } from '../../../entities/support-request/ISupportRequest';
import { SupportRequestUpdateResolvedRequest } from '../../../entities/support-request/dtos/SupportRequestUpdateResolvedRequest';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { SupportRequestNotFoundError } from '../../../errors/SupportRequestNotFoundError';
import { ISupportRequestsRepository } from '../../../repositories/support-requests/ISupportRequestsRepository';

export class UpdateSupportRequestResolvedUseCase {

  constructor(
    private supportRequestsRepository: ISupportRequestsRepository,
  ) { }

  async execute(id: string, { resolved }: SupportRequestUpdateResolvedRequest): Promise<ISupportRequest> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(!resolved) {
      throw new RequiredFieldsError('Resolvido');
    }

    const supportRequestExists = await this.supportRequestsRepository.listById(id);
    if(!supportRequestExists) {
      throw new SupportRequestNotFoundError();
    }

    const supportRequest = await this.supportRequestsRepository.updateResolved(id, resolved);

    return supportRequest;
  }

}
