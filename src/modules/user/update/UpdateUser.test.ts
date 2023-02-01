import { BadRequestError } from './../../../errors/BadRequestError';
import { UserNotFoundError } from './../../../errors/UserNotFoundError';
import { IUserCreation } from '../../../entities/user/IUserCreation';
import { UpdateUserUseCases } from './UpdateUserUseCases';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';

describe('Update User', () => {

  const usersRepository = new MockUserRepository();
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

    const { id } = await usersRepository.create(user);

    await updateUserUseCases.execute(id, {
      name: 'John John',
      phone: '44444444444',
      admin: true,
      totalPrints: 10,
      totalPrintOrders: 2,
      totalPurchases: 5,
    });

    const userListed = await usersRepository.listById(id);

    expect(userListed).toEqual({
      id: expect.any(String),
      name: 'John John',
      email: user.email,
      phone: '44444444444',
      admin: true,
      totalPrints: 10,
      totalPrintOrders: 2,
      totalPurchases: 5,
      createdAt: expect.any(Date),
    });
  });

  it('should encrypt the password when updating it', async () => {
    const { id } = await usersRepository.create({
      name: 'User Test',
      email: 'emailtest@hotmail.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    const newPassword = 'abcdefg';

    const userUpdated = await updateUserUseCases.execute(id, {
      password: newPassword,
    }, true);

    // @ts-ignore
    expect(userUpdated.password).not.toBe(newPassword);
  });

  it('should throw an error when updating data for a user that doesn\'t exist', async () => {

    expect(updateUserUseCases.execute('fake-user-id', { name: 'John John' })).rejects.toThrow(UserNotFoundError);
  });

  it('should throw an error when updating user with name null', async () => {
    const { id } = await usersRepository.create({
      name: 'User Test',
      email: 'emailtest@hotmail.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    expect(updateUserUseCases.execute(id, { name: null })).rejects.toThrow(BadRequestError);
    expect(updateUserUseCases.execute(id, { name: null })).rejects.toThrow('Nome e senha não podem ter valores em branco');
  });

  it('should throw an error when updating user with password null', async () => {
    const { id } = await usersRepository.create({
      name: 'User Test',
      email: 'emailtest@hotmail.com',
      password: '123456',
      phone: '99999999999',
      admin: false,
    });

    expect(updateUserUseCases.execute(id, { password: null })).rejects.toThrow(BadRequestError);
    expect(updateUserUseCases.execute(id, { password: null })).rejects.toThrow('Nome e senha não podem ter valores em branco');
  });

});
