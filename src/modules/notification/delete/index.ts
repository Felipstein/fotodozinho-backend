import { DeleteNotificationController } from './DeleteNotificationController';
import { currentNotificationsRepository } from '../../../repositories';
import { DeleteNotificationUseCases } from './DeleteNotificationUseCases';

export function deleteNotificationFactory() {
  const deleteNotificationUseCases = new DeleteNotificationUseCases(currentNotificationsRepository);
  const deleteNotificationController = new DeleteNotificationController(deleteNotificationUseCases);

  return { useCases: deleteNotificationUseCases, controller: deleteNotificationController };
}
