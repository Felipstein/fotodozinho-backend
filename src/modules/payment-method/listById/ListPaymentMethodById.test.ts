import { IPaymentMethod } from '../../../entities/payment-method/IPaymentMethod';
import { PaymentMethodNotFoundError } from '../../../errors/PaymentMethodNotFoundError';
import { MockPaymentMethodsRepository } from '../../../repositories/payment-methods/MockPaymentMethodsRepository';
import { ListPaymentMethodByIdUseCases } from './ListPaymentMethodByIdUseCases';

describe('List Payment Methods by ID', () => {

  const paymentMethods = new MockPaymentMethodsRepository();
  const listPaymentMethodByIdUseCases = new ListPaymentMethodByIdUseCases(paymentMethods);

  afterEach(() => {
    paymentMethods.cleanRepository();
  });

  it('should list exactly payment methods created', async () => {
    const { id } = await paymentMethods.create({
      name: 'pix',
    });

    const paymentMethodListed = await listPaymentMethodByIdUseCases.execute(id);

    expect(paymentMethodListed).toEqual({
      id,
      name: 'pix',
    } as IPaymentMethod);
  });

  it('should throw an error when list payment method that does not exists', async () => {

    expect(() => listPaymentMethodByIdUseCases.execute('fake-payment-method-id')).rejects.toThrow(PaymentMethodNotFoundError);
  });

});
