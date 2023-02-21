import { NodemailerEmailService } from '../../../providers/emails/NodemailerEmailService';
import { currentNotificationsRepository, currentPrintOrdersRepository, currentUsersRepository } from '../../../repositories';
import { NotificationsService } from '../../../services/notifications';
import { UpdatePrintOrderStatusController } from './UpdatePrintOrderStatusController';
import { UpdatePrintOrderStatusUseCases } from './UpdatePrintOrderStatusUseCases';

export function updatePrintOrderStatusFactory() {
  const updatePrintOrderStatusUseCases = new UpdatePrintOrderStatusUseCases(
    currentPrintOrdersRepository,
    currentUsersRepository,
    new NotificationsService(currentNotificationsRepository),
    new NodemailerEmailService(),
  );
  const updatePrintOrderStatusController = new UpdatePrintOrderStatusController(updatePrintOrderStatusUseCases);

  return { useCases: updatePrintOrderStatusUseCases, controller: updatePrintOrderStatusController };
}
