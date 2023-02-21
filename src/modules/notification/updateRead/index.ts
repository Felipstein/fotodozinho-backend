import { currentNotificationsRepository } from '../../../repositories';
import { NotificationsService } from '../../../services/notifications';
import { UpdateReadNotificationController } from './UpdateReadNotificationController';
import { UpdateReadNotificationUseCases } from './UpdateReadNotificationUseCases';

export function updateReadNotificationFactory() {
  const updateReadNotificationUseCases = new UpdateReadNotificationUseCases(new NotificationsService(currentNotificationsRepository));
  const updateReadNotificationController = new UpdateReadNotificationController(updateReadNotificationUseCases);

  return { useCases: updateReadNotificationUseCases, controller: updateReadNotificationController };
}
