import { IUserCreation } from '../../../entities/IUserCreation';
import { MockUserRepository } from '../../../repositories/mock/MockUserRepository';
import { CreateUserUseCases } from '../create/CreateUserUseCases';
import { ListUserByIdUseCases } from '../listById/ListUserByIdUseCases';
import { UpdateUserUseCases } from './UpdateUserUseCases';

describe('Update User', () => {

  const usersRepository = new MockUserRepository();
  const createUserUseCases = new CreateUserUseCases(usersRepository);
  const listUserByIdUseCases = new ListUserByIdUseCases(usersRepository);
  const updateUserUseCases = new UpdateUserUseCases(usersRepository);

  beforeEach(() => {
    usersRepository.cleanRepository();
  });

  it('should keep updates user attributes', async () => {
    const user: IUserCreation = {
      name: 'User Test',
      email: 'usertest@hotmail.com',
      phone: '99999999999',
      password: '123456',
      admin: false,
    };

    const { id } = await createUserUseCases.execute(user);

    await updateUserUseCases.execute(id, {
      name: 'John John',
      phone: '44444444444',
      admin: true,
    });

    const userListed = await listUserByIdUseCases.execute(id);

    // está crashando: pode ser que o repositório fake não salva no array as atualizações

    expect(userListed).toEqual({
      id: expect.any(String),
      name: 'John John',
      email: user.email,
      phone: '44444444444',
      admin: true,
    });
  });

});
