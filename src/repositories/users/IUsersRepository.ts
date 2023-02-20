import { UserCreateRequest } from '../../entities/user/dtos/UserCreateRequest';
import { UserUpdateRequest } from '../../entities/user/dtos/UserUpdateRequest';
import { IUserView } from '../../entities/user/IUserView';

export interface IUsersRepository {

  listAll(includeDeletedUsers?: boolean): Promise<IUserView[]>;

  listById(id: string): Promise<IUserView | null>;

  listByEmail(email: string, withPassword?: boolean): Promise<(IUserView & { password?: string }) | null>;

  listInactiveUsers(): Promise<IUserView[]>;

  listDeletedUsers(when?: Date): Promise<IUserView[]>;

  create({ name, email, phone, password, admin, verified }: UserCreateRequest, isTest: boolean): Promise<IUserView>;

  update(id: string, {
    name,
    phone,
    password,
    admin,
    verified,
    lastLogin,
    deletedAt,
    totalPrintOrders,
    totalPrints,
    totalPurchaseOrders,
    totalPurchases,
  }: UserUpdateRequest, isTest: boolean): Promise<IUserView | null>;

  delete(id: string): Promise<void>;

  deleteDeactivedUsersForAmonth(): Promise<void>;

  cleanRepository(): void;

}
