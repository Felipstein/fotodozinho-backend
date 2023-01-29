import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { INotification } from '../../../entities/notification/INotification';
import { INotificationsRepository } from '../../../repositories/notifications/INotificationsRepository';
import { NotificationNotFoundError } from '../../../errors/NotificationNotFoundError';

export class ListNotificationByIdUseCases {

  constructor(
    private notificationsRepository: INotificationsRepository,
  ) { }

  async execute(id: string): Promise<INotification> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const notification = await this.notificationsRepository.listById(id);
    if(!notification) {
      throw new NotificationNotFoundError();
    }

    return notification;
  }

}
