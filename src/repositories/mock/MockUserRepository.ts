import { cloneDeep } from 'lodash';
import { IUser } from '../../entities/user/IUser';
import { IUserCreation } from '../../entities/user/IUserCreation';
import { IUserUpdating } from '../../entities/user/IUserUpdating';
import { uuidProvider } from '../../providers/UUID';
import { IUsersRepository } from '../IUsersRepository';
import { IUserView } from './../../entities/user/IUserView';

export class MockUserRepository implements IUsersRepository {

  private users: IUser[] = [];

  async listAll(): Promise<IUserView[]> {
    const users = this.users.map(user => {
      const userWithoutPassword = cloneDeep(user);
      delete userWithoutPassword.password;

      return userWithoutPassword;
    });

    return users;
  }

  async listById(id: string): Promise<IUserView | null> {
    const user = this.users.find(user => user.id === id);
    if(!user) {
      return null;
    }

    const userWithoutPassword = cloneDeep(user);
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  async listByEmail(email: string): Promise<IUserView | null> {
    const user = this.users.find(user => user.email === email);
    if(!user) {
      return null;
    }

    const userWithoutPassword = cloneDeep(user);
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  async create({ name, email, phone, password, admin }: IUserCreation, isTest: boolean): Promise<IUserView> {
    const id = uuidProvider.generateCUID();
    const date = new Date();
    const user = { id, name, email, phone, password, createdAt: date, admin };

    this.users.push(user);

    if(isTest) {
      return user;
    }

    const userWithoutPassword = cloneDeep(user);
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  async update(id: string, { name, phone, password, admin }: IUserUpdating, isTest: boolean): Promise<IUserView | null> {
    const date = new Date();
    const newUser = { id, name, phone, password, createdAt: date, admin };

    let userUpdated: IUser;

    this.users = this.users.map(user => {
      if(user.id === id) {
        return userUpdated = { ...user, ...newUser };
      }

      return user;
    });

    if(isTest) {
      return userUpdated;
    }

    const userWithoutPassword = cloneDeep(userUpdated);
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter(user => user.id !== id);
  }

  cleanRepository() {
    this.users = [];
  }
}
