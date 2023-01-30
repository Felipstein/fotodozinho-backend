import { currentNotificationsRepository, currentUsersRepository } from '../../../repositories';
import { ListNotificationsByUserIdController } from './ListNotificationsByUserIdController';
import { ListNotificationsByUserIdUseCases } from './ListNotificationsByUserIdUseCases';

export function listNotificationsByUserIdFactory() {
  const listNotificationsByUserIdUseCases = new ListNotificationsByUserIdUseCases(currentNotificationsRepository, currentUsersRepository);
  const listNotificationsByUserIdController = new ListNotificationsByUserIdController(listNotificationsByUserIdUseCases);

  return { useCases: listNotificationsByUserIdUseCases, controller: listNotificationsByUserIdController };
}
