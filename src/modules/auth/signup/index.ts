import { NodemailerEmailService } from '../../../providers/emails/NodemailerEmailService';
import { currentNotificationsRepository, currentShoppingCartsRepository, currentUsersRepository } from '../../../repositories';
import { NotificationsService } from '../../../services/notifications';
import { SignUpController } from './SignUpController';
import { SignUpUseCases } from './SignUpUseCases';

export function signUpFactory() {
  const useCases = new SignUpUseCases(currentUsersRepository, currentShoppingCartsRepository, new NotificationsService(currentNotificationsRepository), new NodemailerEmailService());
  const controller = new SignUpController(useCases);

  return { useCases, controller };
}
