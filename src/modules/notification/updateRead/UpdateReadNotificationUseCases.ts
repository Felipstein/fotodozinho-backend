import { NotificationUpdateReadRequest } from '../../../entities/notification/dtos/NotificationUpdateReadRequest';
import { INotification } from '../../../entities/notification/INotification';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { NotificationNotFoundError } from '../../../errors/NotificationNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { NotificationsService } from '../../../services/notifications';
import { verifyUserAuth } from '../../../services/verify-user-auth';
export class UpdateReadNotificationUseCases {

  constructor(
    private notificationsService: NotificationsService,
  ) { }

  async execute(id: string, { read }: NotificationUpdateReadRequest, requestingUserId: string): Promise<INotification> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(!read) {
      throw new RequiredFieldsError('Lida');
    }

    const notification = await this.notificationsService.getNotification(id);
    if(!notification) {
      throw new NotificationNotFoundError();
    }

    await verifyUserAuth.ensureSelfAction({ id: requestingUserId }, notification.userId);

    const notificationUpdated = await this.notificationsService.updateNotificationRead(id, read);

    return notificationUpdated;
  }

}
