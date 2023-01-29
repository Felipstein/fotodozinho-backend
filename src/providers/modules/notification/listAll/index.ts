import { currentNotificationsRepository } from '../../../repositories';
import { ListAllNotificationsController } from './ListAllNotificationController';
import { ListAllNotificationsUseCases } from './ListAllNotificationsUseCases';

export function listAllNotificationsFactory() {
  const listAllNotificationsUseCases = new ListAllNotificationsUseCases(currentNotificationsRepository);
  const listAllNotificationsController = new ListAllNotificationsController(listAllNotificationsUseCases);

  return { useCases: listAllNotificationsUseCases, controller: listAllNotificationsController };
}
