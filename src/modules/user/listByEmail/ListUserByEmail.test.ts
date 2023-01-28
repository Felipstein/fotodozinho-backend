import { ListUserByEmailUseCases } from './ListUserByEmailUseCases';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { CreateUserUseCases } from './../create/CreateUserUseCases';

describe('List User by Email', () => {

  const usersRepository = new MockUserRepository();
  const createUserUseCases = new CreateUserUseCases(usersRepository);
  const listUserByEmailUseCases = new ListUserByEmailUseCases(usersRepository);

  beforeEach(() => {
    usersRepository.cleanRepository();
  });

  it('should list the user who has the same email and name', async () => {
    const user = {
      name: 'User Test',
      email: 'testemail@hotmail.com',
      phone: '99999999999',
      password: '123456',
    };

    const userCreated = await createUserUseCases.execute(user);

    const { email } = userCreated;
    const userListed = await listUserByEmailUseCases.execute(email);

    delete user.password;

    expect(userListed).toEqual({ id: userCreated.id, admin: false, createdAt: expect.any(Date), ...user });
  });

  it('should not return password', async () => {
    const { email } = await createUserUseCases.execute({
      name: 'User Test',
      email: 'testemail@hotmail.com',
      phone: '99999999999',
      password: '123456',
    });

    const user = await listUserByEmailUseCases.execute(email);

    expect(user).not.toHaveProperty('password');
  });

});
