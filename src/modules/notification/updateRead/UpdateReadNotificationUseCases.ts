import { NotificationUpdateReadRequest } from '../../../entities/notification/dtos/NotificationUpdateReadRequest';
import { INotification } from '../../../entities/notification/INotification';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { NotificationNotFoundError } from '../../../errors/NotificationNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { INotificationsRepository } from './../../../repositories/notifications/INotificationsRepository';
export class UpdateReadNotificationUseCases {

  constructor(
    private notificationsRepository: INotificationsRepository,
  ) { }

  async execute(id: string, { read }: NotificationUpdateReadRequest): Promise<INotification> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(!read) {
      throw new RequiredFieldsError('Lida');
    }

    const notificationExists = await this.notificationsRepository.listById(id);
    if(!notificationExists) {
      throw new NotificationNotFoundError();
    }

    const notification = await this.notificationsRepository.updateRead(id, read);

    return notification;
  }

}
