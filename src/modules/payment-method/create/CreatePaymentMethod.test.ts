import { IPaymentMethod } from '../../../entities/payment-method/IPaymentMethod';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { MockPaymentMethodsRepository } from '../../../repositories/payment-methods/MockPaymentMethodsRepository';
import { CreatePaymentMethodUseCases } from './CreatePaymentMethodUseCases';

describe('List Payment Methods by ID', () => {

  const paymentMethods = new MockPaymentMethodsRepository();
  const createPaymentMethodUseCases = new CreatePaymentMethodUseCases(paymentMethods);

  afterEach(() => {
    paymentMethods.cleanRepository();
  });

  it('should create payment method', async () => {
    const paymentMethod = await createPaymentMethodUseCases.execute({ name: 'all' });

    const paymentMethodListed = await paymentMethods.listById(paymentMethod.id);

    expect(paymentMethodListed).not.toBeUndefined();
    expect(paymentMethodListed).toEqual({
      id: paymentMethod.id,
      name: 'all',
    } as IPaymentMethod);
  });

  it('should throw an error when create payment method without name', async () => {

    // @ts-ignore
    expect(() => createPaymentMethodUseCases.execute({})).rejects.toThrow(RequiredFieldsError);
  });

});
