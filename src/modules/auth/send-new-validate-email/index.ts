import { NodemailerEmailService } from '../../../providers/emails/NodemailerEmailService';
import { currentUsersRepository } from '../../../repositories';
import { SendNewValidateEmailController } from './SendNewValidateEmailController';
import { SendNewValidateEmailUseCase } from './SendNewValidateEmailuseCase';

export function sendNewValidateEmailFactory() {
  const useCase = new SendNewValidateEmailUseCase(currentUsersRepository, new NodemailerEmailService());
  const controller = new SendNewValidateEmailController(useCase);

  return { useCase, controller };
}
