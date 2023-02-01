import { ListUsersUseCases } from './ListUsersUseCases';
import { cloneDeep } from 'lodash';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';

describe('List all Users', () => {

  const usersRepository = new MockUserRepository();
  const listUsersUseCases = new ListUsersUseCases(usersRepository);

  beforeEach(() => {
    usersRepository.cleanRepository();
  });

  it('should list two users created', async () => {
    await usersRepository.create({
      name: 'User Test 1',
      email: 'emailtest1@hotmail.com',
      phone: '99999999999',
      password: '123456',
    });

    await usersRepository.create({
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

    await usersRepository.create(user1);
    await usersRepository.create(user2);

    const users = await listUsersUseCases.execute();

    expect(users).toContainEqual({
      id: expect.any(String),
      admin: false,
      createdAt: expect.any(Date),
      totalPrints: 0,
      totalPrintOrders: 0,
      totalPurchases: 0,
      ...user1,
      password: undefined,
    });
    expect(users).toContainEqual({
      id: expect.any(String),
      admin: false,
      createdAt: expect.any(Date),
      totalPrints: 0,
      totalPrintOrders: 0,
      totalPurchases: 0,
      ...user2,
      password: undefined
    });
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

    await usersRepository.create(user1);
    await usersRepository.create(user2);

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
