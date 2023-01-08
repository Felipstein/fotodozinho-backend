import { cloneDeep } from 'lodash';
import { IUser } from '../../entities/IUser';
import { uuidProvider } from '../../providers/UUID';
import { IUsersRepository } from '../IUsersRepository';
import { IUserView } from './../../entities/IUserView';

export class MockUserRepository implements IUsersRepository {

  private users: IUser[];

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

  async create({ name, email, phone, password }: Omit<IUser, 'id'>): Promise<IUserView> {
    const id = uuidProvider.generateCUID();
    const user = { id, name, email, phone, password };

    this.users.push(user);

    const userWithoutPassword = cloneDeep(user);
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  async update(id: string, { name, email, phone, password }: Omit<IUser, 'id'>): Promise<IUserView | null> {
    const newUser = { id, name, email, phone, password};

    this.users = this.users.map(user => {
      if(user.id === id) {
        return newUser;
      }

      return user;
    });

    const userWithoutPassword = cloneDeep(newUser);
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }

  delete(id: string): void {
    this.users = this.users.filter(user => user.id !== id);
  }

  cleanRepository() {
    this.users = [];
  }
}
