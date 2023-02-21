import { currentNotificationsRepository } from '../../../repositories';
import { NotificationsService } from '../../../services/notifications';
import { ListAllNotificationsController } from './ListAllNotificationController';
import { ListAllNotificationsUseCases } from './ListAllNotificationsUseCases';

export function listAllNotificationsFactory() {
  const listAllNotificationsUseCases = new ListAllNotificationsUseCases(new NotificationsService(currentNotificationsRepository));
  const listAllNotificationsController = new ListAllNotificationsController(listAllNotificationsUseCases);

  return { useCases: listAllNotificationsUseCases, controller: listAllNotificationsController };
}
