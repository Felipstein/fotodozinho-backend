import { NodemailerEmailService } from '../../../providers/emails/NodemailerEmailService';
import { currentUsersRepository } from '../../../repositories';
import { RecoveryPasswordController } from './RecoveryPasswordController';
import { RecoveryPasswordUseCase } from './RecoveryPasswordUseCase';

export function recoveryPasswordFactory() {
  const useCases = new RecoveryPasswordUseCase(currentUsersRepository, new NodemailerEmailService());
  const controller = new RecoveryPasswordController(useCases);

  return { useCases, controller };
}
