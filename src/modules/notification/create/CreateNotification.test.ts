import { NotificationCreateRequest } from '../../../entities/notification/dtos/NotificationCreateRequest';
import { INotification } from '../../../entities/notification/INotification';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { MockNotificationsRepository } from '../../../repositories/notifications/MockNotificationsRepository';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { CreateNotificationUseCases } from './CreateNotificationUseCases';

describe('Create Notification', () => {

  const notificationsRepository = new MockNotificationsRepository();
  const usersRepository = new MockUserRepository();
  const createNotificationUseCases = new CreateNotificationUseCases(notificationsRepository, usersRepository);

  afterEach(() => {
    notificationsRepository.cleanRepository();
    usersRepository.cleanRepository();
  });

  it('should create notification', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'User Test',
      email: 'usertest@hotmail.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    const notification: NotificationCreateRequest = {
      title: 'Title Notification',
      message: 'Body Notification',
      userId
    };

    const notificationCreated = await createNotificationUseCases.execute(notification);

    expect(notificationCreated).not.toBeNull();
    expect(notificationCreated).toEqual({
      id: expect.any(String),
      title: notification.title,
      message: notification.message,
      userId: notification.userId,
      read: false,
      createdAt: expect.any(Date),
    } as INotification);
  });

  it('should throw an error when creating notification with id of user that does not exists', async () => {
    const notification: NotificationCreateRequest = {
      title: 'Title Notification',
      message: 'Body Notification',
      userId: 'fake-user-id',
    };

    expect(() => createNotificationUseCases.execute(notification)).rejects.toThrow(UserNotFoundError);
  });

});
