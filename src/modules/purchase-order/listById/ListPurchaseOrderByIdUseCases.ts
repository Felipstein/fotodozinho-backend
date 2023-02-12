import { IPurchaseOrder } from '../../../entities/purchase-order/IPurchaseOrder';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PurchaseOrderNotFoundError } from '../../../errors/PurchaseOrderNotFoundError';
import { IPurchaseOrdersRepository } from '../../../repositories/purchase-order/IPurchaseOrdersRepository';

export class ListPurchaseOrderByIdUseCases {

  constructor(
    private purchaseOrdersRepository: IPurchaseOrdersRepository,
  ) { }

  async execute(id: string): Promise<IPurchaseOrder> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const purchaseOrder = await this.purchaseOrdersRepository.listById(id);
    if(!purchaseOrder) {
      throw new PurchaseOrderNotFoundError();
    }

    return purchaseOrder;
  }

}
