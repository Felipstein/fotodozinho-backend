import { currentNotificationsRepository, currentUsersRepository } from '../../../repositories';
import { NotificationsService } from '../../../services/notifications';
import { ListNotificationsByUserIdController } from './ListNotificationsByUserIdController';
import { ListNotificationsByUserIdUseCases } from './ListNotificationsByUserIdUseCases';

export function listNotificationsByUserIdFactory() {
  const listNotificationsByUserIdUseCases = new ListNotificationsByUserIdUseCases(new NotificationsService(currentNotificationsRepository), currentUsersRepository);
  const listNotificationsByUserIdController = new ListNotificationsByUserIdController(listNotificationsByUserIdUseCases);

  return { useCases: listNotificationsByUserIdUseCases, controller: listNotificationsByUserIdController };
}
