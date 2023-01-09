import { CreateUserUseCases } from './../create/CreateUserUseCases';
import { ListUsersUseCases } from './ListUsersUseCases';
import { MockUserRepository } from '../../../repositories/mock/MockUserRepository';
import { cloneDeep } from 'lodash';

describe('List all Users', () => {

  const usersRepository = new MockUserRepository();
  const createUserUseCases = new CreateUserUseCases(usersRepository);
  const listUsersUseCases = new ListUsersUseCases(usersRepository);

  beforeEach(() => {
    usersRepository.cleanRepository();
  });

  it('should list two users created', async () => {
    await createUserUseCases.execute({
      name: 'User Test 1',
      email: 'emailtest1@hotmail.com',
      phone: '99999999999',
      password: '123456',
    });

    await createUserUseCases.execute({
      name: 'User Test 2',
      email: 'emailtest2@hotmail.com',
      phone: '99999999999',
      password: '123456',
    });

    const users = await listUsersUseCases.execute();

    expect(users).toHaveLength(2);
  });

  it('should list two users missing password and with ID generated', async () => {
    const user1 = {
      name: 'User Test 1',
      email: 'emailtest1@hotmail.com',
      phone: '99999999999',
      password: '123456',
    };
    const user2 = {
      name: 'User Test 2',
      email: 'emailtest2@hotmail.com',
      phone: '99999999999',
      password: '123456',
    };

    await createUserUseCases.execute(user1);
    await createUserUseCases.execute(user2);

    const users = await listUsersUseCases.execute();

    expect(users).toContainEqual({ id: expect.any(String), ...user1, password: undefined });
    expect(users).toContainEqual({ id: expect.any(String), ...user2, password: undefined });
  });

  it('should return the exact array object with created users', async () => {
    const user1 = {
      name: 'User Test 1',
      email: 'emailtest1@hotmail.com',
      phone: '99999999999',
      password: '123456',
    };
    const user2 = {
      name: 'User Test 2',
      email: 'emailtest2@hotmail.com',
      phone: '99999999999',
      password: '123456',
    };

    await createUserUseCases.execute(user1);
    await createUserUseCases.execute(user2);

    const users = await listUsersUseCases.execute();

    const user1WithoutPassword = cloneDeep(user1);
    delete user1WithoutPassword.password;
    const user2WithoutPassword = cloneDeep(user2);
    delete user2WithoutPassword.password;

    const usersArray = [
      { id: expect.any(String), ...user1WithoutPassword },
      { id: expect.any(String), ...user2WithoutPassword },
    ];

    expect(users).toMatchObject(usersArray);
  });

});
