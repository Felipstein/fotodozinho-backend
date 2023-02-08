import { PaymentMethodNotFoundError } from '../../../errors/PaymentMethodNotFoundError';
import { MockPaymentMethodsRepository } from '../../../repositories/payment-methods/MockPaymentMethodsRepository';
import { DeletePaymentMethodUseCases } from './DeletePaymentMethodUseCaes';

describe('Delete Payment Method', () => {

  const paymentMethodsRepository = new MockPaymentMethodsRepository();
  const deletePaymentMethodUseCases = new DeletePaymentMethodUseCases(paymentMethodsRepository);

  it('should delete payment method', async () => {
    const { id } = await paymentMethodsRepository.create({ name: 'pix' });

    await deletePaymentMethodUseCases.execute(id);

    const paymentMethod = await paymentMethodsRepository.listById(id);

    expect(paymentMethod).toBeUndefined();
  });

  it('should thrown an error when delete payment method that does not exists', async () => {

    expect(() => deletePaymentMethodUseCases.execute('fake-payment-method-id')).rejects.toThrow(PaymentMethodNotFoundError);
  });

});
