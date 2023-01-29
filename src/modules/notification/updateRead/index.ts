import { currentNotificationsRepository } from '../../../repositories';
import { UpdateReadNotificationController } from './UpdateReadNotificationController';
import { UpdateReadNotificationUseCases } from './UpdateReadNotificationUseCases';

export function updateReadNotificationFactory() {
  const updateReadNotificationUseCases = new UpdateReadNotificationUseCases(currentNotificationsRepository);
  const updateReadNotificationController = new UpdateReadNotificationController(updateReadNotificationUseCases);

  return { useCases: updateReadNotificationUseCases, controller: updateReadNotificationController };
}
