import { ForbiddenError } from '../../../errors/ForbiddenError';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PurchaseOrderNotFoundError } from '../../../errors/PurchaseOrderNotFoundError';
import { UnauthorizedError } from '../../../errors/UnauthorizedError';
import { IPurchaseOrdersRepository } from '../../../repositories/purchase-order/IPurchaseOrdersRepository';

export class DeletePurchaseOrderUseCases {

  constructor(
    private purchaseOrdersRepository: IPurchaseOrdersRepository,
  ) { }

  async execute(id: string, requestingUserId: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(!requestingUserId) {
      throw new UnauthorizedError();
    }

    const purchaseOrder = await this.purchaseOrdersRepository.listById(id);
    if(!purchaseOrder) {
      throw new PurchaseOrderNotFoundError();
    }

    if(requestingUserId !== purchaseOrder.userId) {
      throw new ForbiddenError();
    }

    await this.purchaseOrdersRepository.delete(id);
  }

}
