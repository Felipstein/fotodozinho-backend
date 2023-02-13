import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { PurchaseOrderNotFoundError } from '../../../errors/PurchaseOrderNotFoundError';
import { IPurchaseOrdersRepository } from '../../../repositories/purchase-order/IPurchaseOrdersRepository';

export class DeletePurchaseOrderUseCases {

  constructor(
    private purchaseOrdersRepository: IPurchaseOrdersRepository,
  ) { }

  async execute(id: string): Promise<void> {
    if(!id) {
      throw new IDNotGivenError();
    }

    const purchaseOrderExists = await this.purchaseOrdersRepository.listById(id);
    if(!purchaseOrderExists) {
      throw new PurchaseOrderNotFoundError();
    }

    await this.purchaseOrdersRepository.delete(id);
  }

}
