import { CreateNotificationUseCases } from './CreateNotificationUseCases';
import { currentNotificationsRepository, currentUsersRepository } from '../../../repositories';
import { CreateNotificationController } from './CreateNotificationController';
import { NotificationsService } from '../../../services/notifications';

export function createNotificationFactory() {
  const createNotificationUseCases = new CreateNotificationUseCases(new NotificationsService(currentNotificationsRepository), currentUsersRepository);
  const createNotificationController = new CreateNotificationController(createNotificationUseCases);

  return { useCases: createNotificationUseCases, controller: createNotificationController };
}
