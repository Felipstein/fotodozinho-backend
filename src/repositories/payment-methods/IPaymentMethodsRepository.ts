import { IPaymentMethod } from '../../entities/payment-method/IPaymentMethod';
import { PaymentMethodCreateRequest } from '../../entities/payment-method/dtos/PaymentMethodCreateRequest';

export interface IPaymentMethodsRepository {

  listAll(): Promise<IPaymentMethod[]>;

  listById(id: string): Promise<IPaymentMethod | null>;

  create({ name }: PaymentMethodCreateRequest): Promise<IPaymentMethod>;

  delete(id: string): Promise<void>;

  cleanRepository(): void;

}
