import { currentNotificationsRepository } from '../../../repositories';
import { ListNotificationByIdController } from './ListNotificationByIdController';
import { ListNotificationByIdUseCases } from './ListNotificationByIdUseCases';

export function listNotificationByIdFactory() {
  const listNotificationByIdUseCases = new ListNotificationByIdUseCases(currentNotificationsRepository);
  const listNotificationByIdController = new ListNotificationByIdController(listNotificationByIdUseCases);

  return { useCases: listNotificationByIdUseCases, controller: listNotificationByIdController };
}
