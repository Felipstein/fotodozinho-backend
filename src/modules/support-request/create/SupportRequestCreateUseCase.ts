import { ISupportRequest } from '../../../entities/support-request/ISupportRequest';
import { SupportRequestCreateRequest } from '../../../entities/support-request/dtos/SupportRequestCreateRequest';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { ISupportRequestsRepository } from '../../../repositories/support-requests/ISupportRequestsRepository';

export class SupportRequestCreateUseCase {

  constructor(
    private supportRequestsRepository: ISupportRequestsRepository,
  ) { }

  async execute({ email }: SupportRequestCreateRequest): Promise<ISupportRequest> {
    if(!email) {
      throw new RequiredFieldsError('E-mail');
    }

    const supportRequest = await this.supportRequestsRepository.create({ email });

    return supportRequest;
  }

}
