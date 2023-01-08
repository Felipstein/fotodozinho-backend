/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BadRequestError } from './../../../errors/BadRequestError';
import { CreateUserUseCases } from './CreateUserUseCases';
import { IUser } from '../../../entities/IUser';
import { MockUserRepository } from '../../../repositories/mock/MockUserRepository';

describe('Create User', () => {

  const usersRepository = new MockUserRepository();
  const createUserUseCases = new CreateUserUseCases(usersRepository);

  afterEach(() => {
    usersRepository.cleanRepository();
  });

  it('should create new user and do not return password', async () => {
    const user: Omit<IUser, 'id'> = {
      name: 'User Test',
      email: 'emailtest@hotmail.com',
      phone: '99999999999',
      password: '123456',
    };

    const userCreated = await createUserUseCases.execute(user);

    expect(userCreated).toEqual({
      id: expect.any(String),
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
    expect(userCreated).not.toContain('password');
  });

  it('should create new user with a generated/random ID', async () => {
    const user1Created = await createUserUseCases.execute({
      name: 'User Test 1',
      email: 'emailtest1@hotmail.com',
      phone: '99999999999',
      password: '123456',
    });

    const user2Created = await createUserUseCases.execute({
      name: 'User Test 2',
      email: 'emailtest2@hotmail.com',
      phone: '99999999999',
      password: '123456',
    });

    expect(user1Created.id).not.toBe(user2Created.id);
  });

  it('should create user without phone', async () => {
    const userCreated = await createUserUseCases.execute({
      name: 'User Test',
      email: 'emailtest@hotmail.com',
      password: '123456',
    });

    expect(userCreated).not.toContain('phone');
  });

  it('should create user with password encrypted', async () => {
    const user = {
      name: 'User Test',
      email: 'emailtest@hotmail.com',
      phone: '99999999999',
      password: '123456',
    };

    const userCreated = await createUserUseCases.execute(user, true);

    //@ts-ignore
    expect(userCreated.password).not.toBe(user.password);
  });

  it('should throw an error when try create more users with same e-mail', async () => {
    await createUserUseCases.execute({
      name: 'User Test 1',
      email: 'emailtest@hotmail.com',
      phone: '99999999999',
      password: '123456',
    });

    const createUser = () => (
      createUserUseCases.execute({
        name: 'User Test 2',
        email: 'emailtest@hotmail.com',
        phone: '99999999999',
        password: '123456',
      })
    );

    await expect(createUser).rejects.toThrow(BadRequestError);
    await expect(createUser).rejects.toThrow('E-mail já em uso');
  });

  it('should throw an error when trying to create a user with any of the mandatory properties missing', async () => {
    const createUserWithoutName = () => (
      // @ts-ignore
      createUserUseCases.execute({
        email: 'emailtest@hotmail.com',
        phone: '99999999999',
        password: '123456',
      })
    );

    const createUserWithoutEmail = () => (
      // @ts-ignore
      createUserUseCases.execute({
        name: 'User Test',
        phone: '99999999999',
        password: '123456',
      })
    );

    const createUserWithoutPassword = () => (
      // @ts-ignore
      createUserUseCases.execute({
        name: 'User Test',
        email: 'emailtest@hotmail.com',
        phone: '99999999999',
      })
    );

    await expect(createUserWithoutName).rejects.toThrow(BadRequestError);
    await expect(createUserWithoutName).rejects.toThrow('Os campos nome, e-mail e senha são obrigatórios');

    await expect(createUserWithoutEmail).rejects.toThrow(BadRequestError);
    await expect(createUserWithoutEmail).rejects.toThrow('Os campos nome, e-mail e senha são obrigatórios');

    await expect(createUserWithoutPassword).rejects.toThrow(BadRequestError);
    await expect(createUserWithoutPassword).rejects.toThrow('Os campos nome, e-mail e senha são obrigatórios');
  });
});
