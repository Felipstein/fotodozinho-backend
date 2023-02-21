import { NotificationUpdateReadRequest } from '../../../entities/notification/dtos/NotificationUpdateReadRequest';
import { INotification } from '../../../entities/notification/INotification';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { NotificationNotFoundError } from '../../../errors/NotificationNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { verifyUserAuth } from '../../../services/verify-user-auth';
import { INotificationsRepository } from './../../../repositories/notifications/INotificationsRepository';
export class UpdateReadNotificationUseCases {

  constructor(
    private notificationsRepository: INotificationsRepository,
  ) { }

  async execute(id: string, { read }: NotificationUpdateReadRequest, requestingUserId: string): Promise<INotification> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(!read) {
      throw new RequiredFieldsError('Lida');
    }

    const notification = await this.notificationsRepository.listById(id);
    if(!notification) {
      throw new NotificationNotFoundError();
    }

    await verifyUserAuth.ensureSelfAction({ id: requestingUserId }, notification.userId);

    const notificationUpdated = await this.notificationsRepository.updateRead(id, read);

    return notificationUpdated;
  }

}
