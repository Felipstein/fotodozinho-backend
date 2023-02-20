import { ISupportRequest } from '../../../entities/support-request/ISupportRequest';
import { SupportRequestCreateRequest } from '../../../entities/support-request/dtos/SupportRequestCreateRequest';
import { BadRequestError } from '../../../errors/BadRequestError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { EmailService } from '../../../providers/emails/EmailService';
import { ISupportRequestsRepository } from '../../../repositories/support-requests/ISupportRequestsRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';

export class SupportRequestCreateUseCase {

  constructor(
    private supportRequestsRepository: ISupportRequestsRepository,
    private usersRepository: IUsersRepository,
    private emailService: EmailService,
  ) { }

  async execute({ email }: SupportRequestCreateRequest, requestingUserId: string): Promise<ISupportRequest> {
    if(!email) {
      throw new RequiredFieldsError('E-mail');
    }

    const user = await this.usersRepository.listById(requestingUserId);

    if(user.email !== email) {
      throw new BadRequestError('Esse não é seu e-mail');
    }

    const supportRequest = await this.supportRequestsRepository.create({ email });
    await this.emailService.sendSupportEmail(email, user.name);

    return supportRequest;
  }

}
