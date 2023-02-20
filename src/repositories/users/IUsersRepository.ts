import { UserCreateRequest } from '../../entities/user/dtos/UserCreateRequest';
import { UserUpdateRequest } from '../../entities/user/dtos/UserUpdateRequest';
import { IUserView } from '../../entities/user/IUserView';

export interface IUsersRepository {

  listAll(): Promise<IUserView[]>;

  listById(id: string, withPassword?: boolean): Promise<(IUserView & { password?: string }) | null>;

  listByEmail(email: string, withPassword?: boolean): Promise<(IUserView & { password?: string }) | null>;

  listInactiveUsers(): Promise<IUserView[]>;

  create({ name, email, phone, password, admin, notifyServicesByEmail, verified }: UserCreateRequest, isTest: boolean): Promise<IUserView>;

  update(id: string, {
    name,
    phone,
    password,
    admin,
    verified,
    notifyServicesByEmail,
    lastLogin,
    totalPrintOrders,
    totalPrints,
    totalPurchaseOrders,
    totalPurchases,
  }: UserUpdateRequest, isTest: boolean): Promise<IUserView | null>;

  delete(id: string): Promise<void>;

  cleanRepository(): void;

}
