import { DeleteUserUseCases } from './DeleteUserUseCases';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { uuidProvider } from '../../../providers/UUID';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';

describe('Delete User', () => {

  const usersRepository = new MockUserRepository();
  const deleteUserUseCases = new DeleteUserUseCases(usersRepository);

  afterEach(() => {
    usersRepository.cleanRepository();
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

  it('should throw error when deleted user doesn\'t exist', async () => {
    const id = uuidProvider.generateCUID();

    await expect(() => deleteUserUseCases.execute(id)).rejects.toThrow(UserNotFoundError);
  });

});
