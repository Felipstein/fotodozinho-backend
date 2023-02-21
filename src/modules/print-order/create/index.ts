import { NodemailerEmailService } from '../../../providers/emails/NodemailerEmailService';
import { currentNotificationsRepository, currentPrintOrdersRepository, currentUsersRepository } from '../../../repositories';
import { NotificationsService } from '../../../services/notifications';
import { CreatePrintOrderController } from './CreatePrintOrderController';
import { CreatePrintOrderUseCases } from './CreatePrintOrderUseCases';

export function createPrintOrderFactory() {
  const createPrintOrderUseCases = new CreatePrintOrderUseCases(
    currentPrintOrdersRepository,
    currentUsersRepository,
    new NotificationsService(currentNotificationsRepository),
    new NodemailerEmailService(),
  );
  const createPrintOrderController = new CreatePrintOrderController(createPrintOrderUseCases);

  return { useCases: createPrintOrderUseCases, controller: createPrintOrderController };
}
