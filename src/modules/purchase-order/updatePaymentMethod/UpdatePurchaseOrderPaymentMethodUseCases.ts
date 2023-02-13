import { IPurchaseOrder } from '../../../entities/purchase-order/IPurchaseOrder';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PaymentMethodNotFoundError } from '../../../errors/PaymentMethodNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IPaymentMethodsRepository } from '../../../repositories/payment-methods/IPaymentMethodsRepository';
import { IPurchaseOrdersRepository } from '../../../repositories/purchase-order/IPurchaseOrdersRepository';

export class UpdatePurchaseOrderPaymentMethodUseCases {

  constructor(
    private purchaseOrdersRepository: IPurchaseOrdersRepository,
    private paymentMethodsRepository: IPaymentMethodsRepository,
  ) { }

  async execute(id: string, paymentMethodId: string): Promise<IPurchaseOrder> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(!paymentMethodId) {
      throw new RequiredFieldsError('Método de pagamento');
    }

    const paymentMethodExists = await this.paymentMethodsRepository.listById(paymentMethodId);
    if(!paymentMethodExists) {
      throw new PaymentMethodNotFoundError();
    }

    const purchaseOrder = await this.purchaseOrdersRepository.update(id, { paymentMethodId });

    return purchaseOrder;
  }

}
