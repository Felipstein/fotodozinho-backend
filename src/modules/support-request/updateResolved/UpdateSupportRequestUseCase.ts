import { ISupportRequest } from '../../../entities/support-request/ISupportRequest';
import { SupportRequestUpdateResolvedRequest } from '../../../entities/support-request/dtos/SupportRequestUpdateResolvedRequest';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { SupportRequestNotFoundError } from '../../../errors/SupportRequestNotFoundError';
import { ISupportRequestsRepository } from '../../../repositories/support-requests/ISupportRequestsRepository';
import { ValidateService } from '../../../services/validate';

export class UpdateSupportRequestResolvedUseCase {

  constructor(
    private supportRequestsRepository: ISupportRequestsRepository,
  ) { }

  async execute(id: string, { resolved }: SupportRequestUpdateResolvedRequest): Promise<ISupportRequest> {
    if(ValidateService.someIsNullOrUndefined(id, resolved)) {
      throw new RequiredFieldsError('Pedido para o suporte', 'Resolvido');
    }

    const supportRequestExists = await this.supportRequestsRepository.listById(id);
    if(!supportRequestExists) {
      throw new SupportRequestNotFoundError();
    }

    const supportRequest = await this.supportRequestsRepository.updateResolved(id, resolved);

    return supportRequest;
  }

}
