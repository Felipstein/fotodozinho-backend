import { UserCreateRequest } from '../../../entities/user/dtos/UserCreateRequest';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { MockShoppingCartsRepository } from '../../../repositories/shopping-carts/MockShoppingCartsRepository';
import { MockUserRepository } from '../../../repositories/users/MockUserRepository';
import { BadRequestError } from './../../../errors/BadRequestError';
import { CreateUserUseCases } from './CreateUserUseCases';

describe('Create User', () => {

  const usersRepository = new MockUserRepository();
  const shoppingCartsRepository = new MockShoppingCartsRepository();
  const createUserUseCases = new CreateUserUseCases(usersRepository, shoppingCartsRepository);

  afterEach(() => {
    usersRepository.cleanRepository();
  });

  it('should create new user', async () => {
    const user: UserCreateRequest = {
      name: 'User Test',
      email: 'emailtest@hotmail.com',
      phone: '99999999999',
      password: '123456',
      admin: true,
    };

    const userCreated = await createUserUseCases.execute(user);

    expect(userCreated).not.toBeNull();
    expect(userCreated).toEqual({
      id: expect.any(String),
      name: user.name,
      email: user.email,
      phone: user.phone,
      admin: user.admin,
      totalPrints: 0,
      totalPrintOrders: 0,
      totalPurchases: 0,
      createdAt: expect.any(Date),
    });
  });

  it('should return creation date when creating a new user', async () => {
    const userCreated = await createUserUseCases.execute({
      name: 'User Test',
      email: 'emailtest@hotmail.com',
      phone: '99999999999',
      password: '123456',
      admin: false,
    });

    expect(userCreated).toHaveProperty('createdAt');
    expect(userCreated.createdAt).toEqual(expect.any(Date));
  });

  it('should not return the password when creating a new user', async () => {
    const user: UserCreateRequest = {
      name: 'User Test',
      email: 'emailtest@hotmail.com',
      phone: '99999999999',
      password: '123456',
      admin: false,
    };

    const userCreated = await createUserUseCases.execute(user);

    expect(userCreated).not.toContain('password');
  });

  it('should create new user with a generated/random ID', async () => {
    const user1Created = await createUserUseCases.execute({
      name: 'User Test 1',
      email: 'emailtest1@hotmail.com',
      phone: '99999999999',
      password: '123456',
      admin: false,
    });

    const user2Created = await createUserUseCases.execute({
      name: 'User Test 2',
      email: 'emailtest2@hotmail.com',
      phone: '99999999999',
      password: '123456',
      admin: false,
    });

    expect(user1Created.id).not.toBe(user2Created.id);
  });

  it('should create user without phone', async () => {
    const userCreated = await createUserUseCases.execute({
      name: 'User Test',
      email: 'emailtest@hotmail.com',
      password: '123456',
      admin: false,
    });

    expect(userCreated).not.toContain('phone');
  });

  it('should create user without admin, but return admin with false value', async () => {
    const userCreated = await createUserUseCases.execute({
      name: 'User Test',
      email: 'emailtest@hotmail.com',
      password: '123456',
    });

    expect(userCreated).toHaveProperty('admin');
    expect(userCreated.admin).toBe(false);
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

  it('should create user with total 0 prints, 0 print orders and 0 purchases', async () => {
    const user: UserCreateRequest = {
      name: 'User Test',
      email: 'emailtest@hotmail.com',
      phone: '99999999999',
      password: '123456',
    };

    const userCreated = await createUserUseCases.execute(user);

    expect(userCreated.totalPrints).toBe(0);
    expect(userCreated.totalPrintOrders).toBe(0);
    expect(userCreated.totalPurchases).toBe(0);
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

    await expect(createUserWithoutName).rejects.toThrow(RequiredFieldsError);
    await expect(createUserWithoutEmail).rejects.toThrow(RequiredFieldsError);
    await expect(createUserWithoutPassword).rejects.toThrow(RequiredFieldsError);
  });
});
