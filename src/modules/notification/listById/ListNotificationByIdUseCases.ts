import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { INotification } from '../../../entities/notification/INotification';
import { NotificationNotFoundError } from '../../../errors/NotificationNotFoundError';
import { NotificationsService } from '../../../services/notifications';

export class ListNotificationByIdUseCases {

  constructor(
    private notificationsService: NotificationsService,
  ) { }

  async execute(id: string): Promise<INotification> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const notification = await this.notificationsService.getNotification(id);
    if(!notification) {
      throw new NotificationNotFoundError();
    }

    return notification;
  }

}
