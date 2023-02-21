import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { NotificationNotFoundError } from '../../../errors/NotificationNotFoundError';
import { NotificationsService } from '../../../services/notifications';
import { verifyUserAuth } from '../../../services/verify-user-auth';

export class DeleteNotificationUseCases {

  constructor(
    private notificationsService: NotificationsService,
  ) { }

  async execute(id: string, requestingUserId: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const notification = await this.notificationsService.getNotification(id);
    if(!notification) {
      throw new NotificationNotFoundError();
    }

    await verifyUserAuth.ensureSelfAction({ id: requestingUserId }, notification.userId);

    await this.notificationsService.deleteNotification(id);
  }

}
