import { IPurchaseOrder } from '../../../entities/purchase-order/IPurchaseOrder';
import { IPurchaseOrdersRepository } from '../../../repositories/purchase-order/IPurchaseOrdersRepository';

export class ListPurchaseOrdersUseCases {

  constructor(
    private purchaseOrdersRepository: IPurchaseOrdersRepository,
  ) { }

  async execute(): Promise<IPurchaseOrder[]> {
    const purchaseOrders = await this.purchaseOrdersRepository.listAll();

    return purchaseOrders;
  }

}
