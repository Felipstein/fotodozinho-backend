import { INotification } from '../../../entities/notification/INotification';
import { NotificationsService } from '../../../services/notifications';

export class ListAllNotificationsUseCases {

  constructor(
    private notificationsService: NotificationsService,
  ) { }

  async execute(): Promise<INotification[]> {
    const notifications = await this.notificationsService.getAll();

    return notifications;
  }

}
