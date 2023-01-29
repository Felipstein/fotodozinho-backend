import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { MockNotificationsRepository } from '../../../repositories/notifications/MockNotificationsRepository';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { CreateUserUseCases } from '../../user/create/CreateUserUseCases';
import { CreateNotificationUseCases } from '../create/CreateNotificationUseCases';
import { ListNotificationsByUserIdUseCases } from './ListNotificationsByUserIdUseCases';

describe('List Notifications by User Id', () => {

  const notificationsRepository = new MockNotificationsRepository();
  const usersRepository = new MockUserRepository();
  const createUserUseCases = new CreateUserUseCases(usersRepository);
  const createNotificationUseCases = new CreateNotificationUseCases(notificationsRepository, usersRepository);
  const listNotificationsByUserIdUseCases = new ListNotificationsByUserIdUseCases(notificationsRepository, usersRepository);

  afterEach(() => {
    notificationsRepository.cleanRepository();
    usersRepository.cleanRepository();
  });

  it('should list exaclty notifications of user created', async () => {
    const { id: userId } = await createUserUseCases.execute({
      name: 'User Test',
      email: 'test@test.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    const notificationCreated1 = await createNotificationUseCases.execute({
      title: 'Title Notification',
      message: 'Body Notification',
      userId,
    });

    const notificationCreated2 = await createNotificationUseCases.execute({
      title: 'Title Notification 2',
      message: 'Body Notification 2',
      userId,
    });

    const notificationsListed = await listNotificationsByUserIdUseCases.execute(userId);

    expect(notificationsListed).toHaveLength(2);
    expect(notificationsListed).toContain(notificationCreated1);
    expect(notificationsListed).toContain(notificationCreated2);
  });

  it('should list zero notifications of user that does not contain notifications', async () => {
    const { id: userId } = await createUserUseCases.execute({
      name: 'User Test',
      email: 'test@test.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    const notificationsListed = await listNotificationsByUserIdUseCases.execute(userId);

    expect(notificationsListed).toHaveLength(0);
  });

  it('should throw an error when list notifications that does user not exists', async () => {

    expect(() => listNotificationsByUserIdUseCases.execute('fake-user-id')).rejects.toThrow(UserNotFoundError);
  });

});
