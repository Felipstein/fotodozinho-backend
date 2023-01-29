import { DeleteUserUseCases } from './DeleteUserUseCases';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { uuidProvider } from '../../../providers/UUID';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { MockNotificationsRepository } from '../../../repositories/notifications/MockNotificationsRepository';

describe('Delete User', () => {

  const usersRepository = new MockUserRepository();
  const notificationsRepository = new MockNotificationsRepository();
  const deleteUserUseCases = new DeleteUserUseCases(usersRepository, notificationsRepository);

  afterEach(() => {
    usersRepository.cleanRepository();
    notificationsRepository.cleanRepository();
  });

  it('should delete user', async () => {
    const { id } = await usersRepository.create({
      name: 'User Test',
      email: 'usertest3@hotmail.com',
      phone: '99999999999',
      password: '123456',
      admin: false,
    });

    await deleteUserUseCases.execute(id);

    expect(usersRepository.listById(id)).resolves.toBeNull();
  });

  it('should also delete all notifications related to the user', async () => {
    const { id } = await usersRepository.create({
      name: 'User Test',
      email: 'usertest@hotmail',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    await notificationsRepository.create({
      title: 'Title Notification',
      message: 'Body Notification',
      userId: id,
    });

    await notificationsRepository.create({
      title: 'Title Notification 2',
      message: 'Body Notification 2',
      userId: id,
    });

    await deleteUserUseCases.execute(id);

    const notifications = await notificationsRepository.listByUserId(id);

    expect(notifications).toHaveLength(0);
  });

  it('should throw error when deleted user doesn\'t exist', async () => {
    const id = uuidProvider.generateCUID();

    await expect(() => deleteUserUseCases.execute(id)).rejects.toThrow(UserNotFoundError);
  });

});
