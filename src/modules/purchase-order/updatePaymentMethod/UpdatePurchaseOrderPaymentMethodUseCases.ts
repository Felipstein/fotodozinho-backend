import { IPurchaseOrder } from '../../../entities/purchase-order/IPurchaseOrder';
import { BadRequestError } from '../../../errors/BadRequestError';
import { ForbiddenError } from '../../../errors/ForbiddenError';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PaymentMethodNotFoundError } from '../../../errors/PaymentMethodNotFoundError';
import { PurchaseOrderNotFoundError } from '../../../errors/PurchaseOrderNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UnauthorizedError } from '../../../errors/UnauthorizedError';
import { IPaymentMethodsRepository } from '../../../repositories/payment-methods/IPaymentMethodsRepository';
import { IPurchaseOrdersRepository } from '../../../repositories/purchase-order/IPurchaseOrdersRepository';
import { verifyUserAuth } from '../../../services/verify-user-auth';

export class UpdatePurchaseOrderPaymentMethodUseCases {

  constructor(
    private purchaseOrdersRepository: IPurchaseOrdersRepository,
    private paymentMethodsRepository: IPaymentMethodsRepository,
  ) { }

  async execute(id: string, paymentMethodId: string, requestingUserId: string): Promise<IPurchaseOrder> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(!paymentMethodId) {
      throw new RequiredFieldsError('Método de pagamento');
    }

    const purchaseOrder = await this.purchaseOrdersRepository.listById(id);
    if(!purchaseOrder) {
      throw new PurchaseOrderNotFoundError();
    }

    await verifyUserAuth.ensureSelfAction({ id: requestingUserId }, purchaseOrder.userId);

    if(purchaseOrder.status !== 'WAITING_PAYMENT') {
      throw new BadRequestError('Você não pode mais alterar o método de pagamento desse pedido, o pagamento já foi realizado.');
    }

    const paymentMethodExists = await this.paymentMethodsRepository.listById(paymentMethodId);
    if(!paymentMethodExists) {
      throw new PaymentMethodNotFoundError();
    }

    const purchaseOrderUpdated = await this.purchaseOrdersRepository.update(id, { paymentMethodId });

    return purchaseOrderUpdated;
  }

}
