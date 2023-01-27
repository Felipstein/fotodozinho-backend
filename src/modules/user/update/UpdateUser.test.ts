import { BadRequestError } from './../../../errors/BadRequestError';
import { UserNotFoundError } from './../../../errors/UserNotFoundError';
import { IUserCreation } from '../../../entities/user/IUserCreation';
import { uuidProvider } from '../../../providers/UUID';
import { CreateUserUseCases } from '../create/CreateUserUseCases';
import { ListUserByIdUseCases } from '../listById/ListUserByIdUseCases';
import { UpdateUserUseCases } from './UpdateUserUseCases';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';

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

    expect(userListed).toEqual({
      id: expect.any(String),
      name: 'John John',
      email: user.email,
      phone: '44444444444',
      admin: true,
      createdAt: expect.any(Date),
    });
  });

  it('should encrypt the password when updating it', async () => {
    const { id } = await createUserUseCases.execute({
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

    expect(userUpdated.password).not.toBe(newPassword);
  });

  it('should throw an error when updating data for a user that doesn\'t exist', async () => {
    const id = uuidProvider.generateCUID();

    expect(updateUserUseCases.execute(id, { name: 'John John' })).rejects.toThrow(UserNotFoundError);
  });

  it('should throw an error when updating user with name null', async () => {
    const { id } = await createUserUseCases.execute({
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
    const { id } = await createUserUseCases.execute({
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
