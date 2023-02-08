import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PaymentMethodNotFoundError } from '../../../errors/PaymentMethodNotFoundError';
import { IPaymentMethodsRepository } from '../../../repositories/payment-methods/IPaymentMethodsRepository';

export class DeletePaymentMethodUseCases {

  constructor(
    private paymentMethodsRepository: IPaymentMethodsRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const paymentMethodExists = await this.paymentMethodsRepository.listById(id);
    if(!paymentMethodExists) {
      throw new PaymentMethodNotFoundError();
    }

    await this.paymentMethodsRepository.delete(id);
  }

}
