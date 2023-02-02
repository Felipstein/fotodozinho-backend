import { INotification } from '../../../entities/notification/INotification';
import { INotificationsRepository } from '../../../repositories/notifications/INotificationsRepository';
import { someIsNullOrUndefined } from '../../../utils/Validate';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { NotificationCreateRequest } from '../../../entities/notification/dtos/NotificationCreateRequest';

export class CreateNotificationUseCases {

  constructor(
    private notificationsRepository: INotificationsRepository,
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ title, message, userId }: NotificationCreateRequest): Promise<INotification> {
    if(someIsNullOrUndefined(title, message, userId)) {
      throw new RequiredFieldsError('Título', 'Mensagem', 'Usuário');
    }

    const user = await this.usersRepository.listById(userId);
    if(!user) {
      throw new UserNotFoundError();
    }

    const notification = await this.notificationsRepository.create({ title, message, userId });

    return notification;
  }

}
