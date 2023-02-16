import { IPurchaseOrder } from '../../../entities/purchase-order/IPurchaseOrder';
import { ForbiddenError } from '../../../errors/ForbiddenError';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PaymentMethodNotFoundError } from '../../../errors/PaymentMethodNotFoundError';
import { PurchaseOrderNotFoundError } from '../../../errors/PurchaseOrderNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UnauthorizedError } from '../../../errors/UnauthorizedError';
import { IPaymentMethodsRepository } from '../../../repositories/payment-methods/IPaymentMethodsRepository';
import { IPurchaseOrdersRepository } from '../../../repositories/purchase-order/IPurchaseOrdersRepository';

export class UpdatePurchaseOrderPaymentMethodUseCases {

  constructor(
    private purchaseOrdersRepository: IPurchaseOrdersRepository,
    private paymentMethodsRepository: IPaymentMethodsRepository,
  ) { }

  async execute(id: string, paymentMethodId: string, requestingUserId: string): Promise<IPurchaseOrder> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(!requestingUserId) {
      throw new UnauthorizedError();
    }

    if(!paymentMethodId) {
      throw new RequiredFieldsError('Método de pagamento');
    }

    const purchaseOrderExists = await this.purchaseOrdersRepository.listById(id);
    if(!purchaseOrderExists) {
      throw new PurchaseOrderNotFoundError();
    }

    if(requestingUserId !== purchaseOrderExists.userId) {
      throw new ForbiddenError();
    }

    const paymentMethodExists = await this.paymentMethodsRepository.listById(paymentMethodId);
    if(!paymentMethodExists) {
      throw new PaymentMethodNotFoundError();
    }

    const purchaseOrder = await this.purchaseOrdersRepository.update(id, { paymentMethodId });

    return purchaseOrder;
  }

}
