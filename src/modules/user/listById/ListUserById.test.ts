import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { ListUserByIdUseCases } from './ListUserByIdUseCases';

describe('List User by ID', () => {

  const usersRepository = new MockUserRepository();
  const listUserByIdUseCases = new ListUserByIdUseCases(usersRepository);

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

    const userCreated = await usersRepository.create(user);

    const { id } = userCreated;
    const userListed = await listUserByIdUseCases.execute(id);

    delete user.password;

    expect(userListed).toEqual({
      id: userCreated.id,
      admin: false,
      createdAt: expect.any(Date),
      totalPrints: 0,
      totalPurchases: 0,
      ...user,
    });
  });

  it('should not return password', async () => {
    const { id } = await usersRepository.create({
      name: 'User Test',
      email: 'testemail@hotmail.com',
      phone: '99999999999',
      password: '123456',
    });

    const user = await listUserByIdUseCases.execute(id);

    expect(user).not.toHaveProperty('password');
  });

});
