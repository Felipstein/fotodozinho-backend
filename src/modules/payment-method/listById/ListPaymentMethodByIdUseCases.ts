import { IPaymentMethod } from '../../../entities/payment-method/IPaymentMethod';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PaymentMethodNotFoundError } from '../../../errors/PaymentMethodNotFoundError';
import { IPaymentMethodsRepository } from '../../../repositories/payment-methods/IPaymentMethodsRepository';

export class ListPaymentMethodByIdUseCases {

  constructor(
    private paymentMethodsRepository: IPaymentMethodsRepository,
  ) { }

  async execute(id: string): Promise<IPaymentMethod> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const paymentMethod = await this.paymentMethodsRepository.listById(id);
    if(!paymentMethod) {
      throw new PaymentMethodNotFoundError();
    }

    return paymentMethod;
  }

}
