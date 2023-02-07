import { IPaymentMethod } from '../../../entities/payment-method/IPaymentMethod';
import { IPaymentMethodsRepository } from '../../../repositories/payment-methods/IPaymentMethodsRepository';

export class ListPaymentMethodsUseCases {

  constructor(
    private paymentMethodsRepository: IPaymentMethodsRepository,
  ) { }

  async execute(): Promise<IPaymentMethod[]> {
    const paymentMethods = await this.paymentMethodsRepository.listAll();

    return paymentMethods;
  }

}
