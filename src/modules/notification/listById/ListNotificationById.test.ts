import { NotificationNotFoundError } from '../../../errors/NotificationNotFoundError';
import { MockNotificationsRepository } from '../../../repositories/notifications/MockNotificationsRepository';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { ListNotificationByIdUseCases } from './ListNotificationByIdUseCases';

describe('List Notification by Id', () => {

  const notificationsRepository = new MockNotificationsRepository();
  const usersRepository = new MockUserRepository();
  const listNotificationByIdUseCases = new ListNotificationByIdUseCases(notificationsRepository);

  afterEach(() => {
    notificationsRepository.cleanRepository();
    usersRepository.cleanRepository();
  });

  it('should list exaclty notification created', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'User Test',
      email: 'test@test.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    const notificationCreated = await notificationsRepository.create({
      title: 'Title Notification',
      message: 'Body Notification',
      userId,
    });

    const notificationListed = await listNotificationByIdUseCases.execute(notificationCreated.id);

    expect(notificationListed).not.toBeNull();
    expect(notificationListed).toEqual(notificationCreated);
  });

  it('should throw an error when list notification that does not exists', async () => {

    expect(() => listNotificationByIdUseCases.execute('fake-notification-id')).rejects.toThrow(NotificationNotFoundError);
  });

});
