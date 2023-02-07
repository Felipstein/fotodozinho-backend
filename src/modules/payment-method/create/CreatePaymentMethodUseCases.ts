import { PaymentMethodCreateRequest } from '../../../entities/payment-method/dtos/PaymentMethodCreateRequest';
import { IPaymentMethod } from '../../../entities/payment-method/IPaymentMethod';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IPaymentMethodsRepository } from '../../../repositories/payment-methods/IPaymentMethodsRepository';

export class CreatePaymentMethodUseCases {

  constructor(
    private paymentMethodsRepository: IPaymentMethodsRepository,
  ) { }

  async execute({ name }: PaymentMethodCreateRequest): Promise<IPaymentMethod> {
    if(!name) {
      throw new RequiredFieldsError('Nome');
    }

    const paymentMethod = await this.paymentMethodsRepository.create({ name });

    return paymentMethod;
  }

}
