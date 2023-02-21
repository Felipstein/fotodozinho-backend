import { currentNotificationsRepository } from '../../../repositories';
import { NotificationsService } from '../../../services/notifications';
import { ListNotificationByIdController } from './ListNotificationByIdController';
import { ListNotificationByIdUseCases } from './ListNotificationByIdUseCases';

export function listNotificationByIdFactory() {
  const listNotificationByIdUseCases = new ListNotificationByIdUseCases(new NotificationsService(currentNotificationsRepository));
  const listNotificationByIdController = new ListNotificationByIdController(listNotificationByIdUseCases);

  return { useCases: listNotificationByIdUseCases, controller: listNotificationByIdController };
}
