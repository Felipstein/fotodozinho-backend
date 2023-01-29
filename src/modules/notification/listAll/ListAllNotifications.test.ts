import { MockNotificationsRepository } from '../../../repositories/notifications/MockNotificationsRepository';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { ListAllNotificationsUseCases } from './ListAllNotificationsUseCases';

describe('List All Notifications', () => {

  const notificationsRepository = new MockNotificationsRepository();
  const usersRepository = new MockUserRepository();
  const listAllNotificationsUseCases = new ListAllNotificationsUseCases(notificationsRepository);

  afterEach(() => {
    notificationsRepository.cleanRepository();
    usersRepository.cleanRepository();
  });

  it('should list two notifications created', async () => {
    const { id: userId } = await usersRepository.create({
      name: 'User Test',
      email: 'emailtest@hotmail.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    await notificationsRepository.create({
      title: 'Title Notification',
      message: 'Body Notification',
      userId,
    });

    await notificationsRepository.create({
      title: 'Title Notification',
      message: 'Body Notification',
      userId,
    });

    const notificationsListed = await listAllNotificationsUseCases.execute();

    expect(notificationsListed).toHaveLength(2);
  });

});
