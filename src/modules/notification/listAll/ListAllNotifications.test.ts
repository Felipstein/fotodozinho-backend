import { MockNotificationsRepository } from '../../../repositories/notifications/MockNotificationsRepository';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { CreateUserUseCases } from '../../user/create/CreateUserUseCases';
import { CreateNotificationUseCases } from '../create/CreateNotificationUseCases';
import { ListAllNotificationsUseCases } from './ListAllNotificationsUseCases';

describe('List All Notifications', () => {

  const notificationsRepository = new MockNotificationsRepository();
  const usersRepository = new MockUserRepository();
  const createUserUseCases = new CreateUserUseCases(usersRepository);
  const createNotificationUseCases = new CreateNotificationUseCases(notificationsRepository, usersRepository);
  const listAllNotificationsUseCases = new ListAllNotificationsUseCases(notificationsRepository);

  afterEach(() => {
    notificationsRepository.cleanRepository();
    usersRepository.cleanRepository();
  });

  it('should list two notifications created', async () => {
    const { id: userId } = await createUserUseCases.execute({
      name: 'User Test',
      email: 'emailtest@hotmail.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    await createNotificationUseCases.execute({
      title: 'Title Notification',
      message: 'Body Notification',
      userId,
    });

    await createNotificationUseCases.execute({
      title: 'Title Notification',
      message: 'Body Notification',
      userId,
    });

    const notificationsListed = await listAllNotificationsUseCases.execute();

    expect(notificationsListed).toHaveLength(2);
  });

});
