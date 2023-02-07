import { MockPaymentMethodsRepository } from '../../../repositories/payment-methods/MockPaymentMethodsRepository';
import { ListPaymentMethodsUseCases } from './ListPaymentMethodsUseCases';

describe('List all Payment Methods', () => {

  const paymentMethods = new MockPaymentMethodsRepository();
  const listPaymentMethodsUseCases = new ListPaymentMethodsUseCases(paymentMethods);

  afterEach(() => {
    paymentMethods.cleanRepository();
  });

  it('should list two payment methods', async () => {
    await paymentMethods.create({
      name: 'pix',
    });

    await paymentMethods.create({
      name: 'cartão',
    });

    const paymentMethodsListed = await listPaymentMethodsUseCases.execute();

    expect(paymentMethodsListed).toHaveLength(2);
  });

});
