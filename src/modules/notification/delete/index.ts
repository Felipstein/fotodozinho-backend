import { DeleteNotificationController } from './DeleteNotificationController';
import { currentNotificationsRepository } from '../../../repositories';
import { DeleteNotificationUseCases } from './DeleteNotificationUseCases';
import { NotificationsService } from '../../../services/notifications';

export function deleteNotificationFactory() {
  const deleteNotificationUseCases = new DeleteNotificationUseCases(new NotificationsService(currentNotificationsRepository));
  const deleteNotificationController = new DeleteNotificationController(deleteNotificationUseCases);

  return { useCases: deleteNotificationUseCases, controller: deleteNotificationController };
}
