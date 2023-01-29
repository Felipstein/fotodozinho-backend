import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { MockNotificationsRepository } from '../../../repositories/notifications/MockNotificationsRepository';
import { DeleteNotificationUseCases } from './DeleteNotificationUseCases';
import { NotificationNotFoundError } from '../../../errors/NotificationNotFoundError';

describe('Delete Notification', () => {

  const notificationsRepository = new MockNotificationsRepository();
  const usersRepository = new MockUserRepository();
  const deleteNotificationUseCases = new DeleteNotificationUseCases(notificationsRepository);

  afterEach(() => {
    notificationsRepository.cleanRepository();
    usersRepository.cleanRepository();
  });

  it('should delete a notification', async () => {
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

    await deleteNotificationUseCases.execute(id);

    const result = await notificationsRepository.listById(id);

    expect(result).toBeFalsy();
  });

  it('should throw an error when delete a notification that does not exists', async () => {

    expect(() => deleteNotificationUseCases.execute('fake-notification-id')).rejects.toThrow(NotificationNotFoundError);
  });

});
