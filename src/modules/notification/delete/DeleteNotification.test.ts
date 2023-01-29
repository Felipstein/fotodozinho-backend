import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { CreateUserUseCases } from '../../user/create/CreateUserUseCases';
import { CreateNotificationUseCases } from '../create/CreateNotificationUseCases';
import { ListNotificationByIdUseCases } from '../listById/ListNotificationByIdUseCases';
import { MockNotificationsRepository } from '../../../repositories/notifications/MockNotificationsRepository';
import { DeleteNotificationUseCases } from './DeleteNotificationUseCases';
import { NotificationNotFoundError } from '../../../errors/NotificationNotFoundError';

describe('Delete Notification', () => {

  const notificationsRepository = new MockNotificationsRepository();
  const usersRepository = new MockUserRepository();
  const createUserUseCases = new CreateUserUseCases(usersRepository);
  const createNotificationUseCases = new CreateNotificationUseCases(notificationsRepository, usersRepository);
  const deleteNotificationUseCases = new DeleteNotificationUseCases(notificationsRepository);
  const listNotificationByIdUseCases = new ListNotificationByIdUseCases(notificationsRepository);

  afterEach(() => {
    notificationsRepository.cleanRepository();
    usersRepository.cleanRepository();
  });

  it('should delete a notification', async () => {
    const { id: userId } = await createUserUseCases.execute({
      name: 'User Test',
      email: 'test@test.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    const { id } = await createNotificationUseCases.execute({
      title: 'Title Notification',
      message: 'Body Notification',
      userId,
    });

    await deleteNotificationUseCases.execute(id);

    expect(() => listNotificationByIdUseCases.execute(id)).rejects.toThrow(NotificationNotFoundError);
  });

  it('should throw an error when delete a notification that does not exists', async () => {

    expect(() => deleteNotificationUseCases.execute('fake-notification-id')).rejects.toThrow(NotificationNotFoundError);
  });

});
