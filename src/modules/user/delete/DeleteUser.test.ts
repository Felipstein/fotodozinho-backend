import { ListUserByIdUseCases } from './../listById/ListUserByIdUseCases';
import { MockUserRepository } from '../../../repositories/mock/MockUserRepository';
import { CreateUserUseCases } from '../create/CreateUserUseCases';
import { DeleteUserUseCases } from './DeleteUserUseCases';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { uuidProvider } from '../../../providers/UUID';

describe('Delete User', () => {

  const usersRepository = new MockUserRepository();
  const createUserUseCases = new CreateUserUseCases(usersRepository);
  const listUserByIdUseCases = new ListUserByIdUseCases(usersRepository);
  const deleteUserUseCases = new DeleteUserUseCases(usersRepository);

  afterEach(() => {
    usersRepository.cleanRepository();
  });

  it('should delete user', async () => {
    const { id } = await createUserUseCases.execute({
      name: 'User Test',
      email: 'usertest3@hotmail.com',
      phone: '99999999999',
      password: '123456',
      admin: false,
    });

    await deleteUserUseCases.execute(id);

    await expect(() => listUserByIdUseCases.execute(id)).rejects.toThrow(UserNotFoundError);
  });

  it('should throw error when deleted user doesn\'t exist', async () => {
    const id = uuidProvider.generateCUID();

    await expect(() => deleteUserUseCases.execute(id)).rejects.toThrow(UserNotFoundError);
  });

});
