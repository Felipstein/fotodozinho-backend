import { IUser } from './IUser';

export type IUserView = Omit<IUser, 'password'>;
