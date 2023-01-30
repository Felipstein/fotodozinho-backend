import { NotificationNotFoundError } from '../../../errors/NotificationNotFoundError';
import { MockNotificationsRepository } from '../../../repositories/notifications/MockNotificationsRepository';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { UpdateReadNotificationUseCases } from './UpdateReadNotificationUseCases';

describe('Update Read Notification', () => {

  const notificationsRepository = new MockNotificationsRepository();
  const usersRepository = new MockUserRepository();
  const updateReadNotificationUseCases = new UpdateReadNotificationUseCases(notificationsRepository);

  afterEach(() => {
    notificationsRepository.cleanRepository();
  });

  it('should update read notification', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'User Test',
      email: 'test@test.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    const { id } = await notificationsRepository.create({
      title: 'Title Notification',
      message: 'Body Notification',
      userId,
    });

    const notificationUpdated = await updateReadNotificationUseCases.execute(id, { read: true });

    expect(notificationUpdated.read).toBe(true);
  });

  it('should throw error when update read notification that does not exists', async () => {

    expect(() => updateReadNotificationUseCases.execute('fake-notification-id', { read: true })).rejects.toThrow(NotificationNotFoundError);
  });

});
