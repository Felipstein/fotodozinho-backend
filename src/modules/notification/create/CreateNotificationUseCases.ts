import { INotification } from '../../../entities/notification/INotification';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { NotificationCreateRequest } from '../../../entities/notification/dtos/NotificationCreateRequest';
import { ValidateService } from '../../../services/validate';
import { NotificationsService } from '../../../services/notifications';

export class CreateNotificationUseCases {

  constructor(
    private notificationsService: NotificationsService,
    private usersRepository: IUsersRepository,
  ) { }

  async execute({ title, message, userId }: NotificationCreateRequest): Promise<INotification> {
    if(ValidateService.someIsNullOrUndefined(title, message, userId)) {
      throw new RequiredFieldsError('Título', 'Mensagem', 'Usuário');
    }

    const user = await this.usersRepository.listById(userId);
    if(!user) {
      throw new UserNotFoundError();
    }

    const notification = await this.notificationsService.createNotification(title, message, user);

    return notification;
  }

}
