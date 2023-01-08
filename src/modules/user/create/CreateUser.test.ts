import { IUser } from '../../../entities/IUser';

describe('Create User', () => {

  it('should create new user', async () => {
    const user: Omit<IUser, 'id'> = {
      name: 'User Test',
      email: 'emailtest@hotmail.com',
      phone: '99999999999',
      password: '123456',
    };

    console.log(await prismaMock.user.findMany());
  });

});
