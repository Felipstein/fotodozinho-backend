import { CreateNotificationUseCases } from './CreateNotificationUseCases';
import { currentNotificationsRepository, currentUsersRepository } from '../../../repositories';
import { CreateNotificationController } from './CreateNotificationController';

export function createNotificationFactory() {
  const createNotificationUseCases = new CreateNotificationUseCases(currentNotificationsRepository, currentUsersRepository);
  const createNotificationController = new CreateNotificationController(createNotificationUseCases);

  return { useCases: createNotificationUseCases, controller: createNotificationController };
}
