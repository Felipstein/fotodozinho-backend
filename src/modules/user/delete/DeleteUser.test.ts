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

  beforeEach(() => {
    usersRepository.cleanRepository();
  });

  it('should delete user', async () => {
    const { id } = await createUserUseCases.execute({
      name: 'User Test',
      email: 'usertest@hotmail.com',
      phone: '99999999999',
      password: '123456',
      admin: false,
    });

    await deleteUserUseCases.execute(id);

    expect(listUserByIdUseCases.execute(id)).rejects.toThrow(UserNotFoundError);
  });

  it('should not throw error or anything when deleted user doesn\'t exist', async () => {
    const id = uuidProvider.generateCUID();

    expect(deleteUserUseCases.execute(id)).resolves;
  });

});
