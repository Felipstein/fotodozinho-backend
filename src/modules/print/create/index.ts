import { NodemailerEmailService } from '../../../providers/emails/NodemailerEmailService';
import { currentColorsRepository, currentNotificationsRepository, currentPrintOrdersRepository, currentPrintPricesRepository, currentPrintsRepository, currentUsersRepository } from '../../../repositories';
import { NotificationsService } from '../../../services/notifications';
import { CreatePrintController } from './CreatePrintController';
import { CreatePrintUseCases } from './CreatePrintUseCases';

export function createPrintFactory() {
  const useCases = new CreatePrintUseCases(
    currentPrintsRepository,
    currentPrintOrdersRepository,
    currentColorsRepository,
    currentPrintPricesRepository,
    currentUsersRepository,
    new NotificationsService(currentNotificationsRepository),
    new NodemailerEmailService(),
  );
  const controller = new CreatePrintController(useCases);

  return { useCases, controller };
}
