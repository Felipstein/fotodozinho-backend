import { IPaymentMethod } from '../../entities/payment-method/IPaymentMethod';
import { PaymentMethodCreateRequest } from '../../entities/payment-method/dtos/PaymentMethodCreateRequest';
import { uuidProvider } from '../../providers/UUID';
import { IPaymentMethodsRepository } from './IPaymentMethodsRepository';

export class MockPaymentMethodsRepository implements IPaymentMethodsRepository {

  private paymentMethods: IPaymentMethod[] = [];

  async listAll(): Promise<IPaymentMethod[]> {
    return [...this.paymentMethods];
  }

  async listById(id: string): Promise<IPaymentMethod> {
    return this.paymentMethods.find(paymentMethod => paymentMethod.id === id);
  }

  async create({ name }: PaymentMethodCreateRequest): Promise<IPaymentMethod> {
    const id = uuidProvider.generateCUID();

    const paymentMethod: IPaymentMethod = {
      id, name,
    };

    this.paymentMethods.push(paymentMethod);

    return paymentMethod;
  }

  async delete(id: string): Promise<void> {
    this.paymentMethods = this.paymentMethods.filter(paymentMethod => paymentMethod.id !== id);
  }

  cleanRepository(): void {
    this.paymentMethods = [];
  }

}
