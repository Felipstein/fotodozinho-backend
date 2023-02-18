import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PurchaseOrderNotFoundError } from '../../../errors/PurchaseOrderNotFoundError';
import { IPurchaseOrdersRepository } from '../../../repositories/purchase-order/IPurchaseOrdersRepository';
import { verifyUserAuth } from '../../../services/verify-user-auth';

export class DeletePurchaseOrderUseCases {

  constructor(
    private purchaseOrdersRepository: IPurchaseOrdersRepository,
  ) { }

  async execute(id: string, requestingUserId: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const purchaseOrder = await this.purchaseOrdersRepository.listById(id);
    if(!purchaseOrder) {
      throw new PurchaseOrderNotFoundError();
    }

    await verifyUserAuth.ensureSelfAction({ id: requestingUserId }, purchaseOrder.userId);

    await this.purchaseOrdersRepository.delete(id);
  }

}
