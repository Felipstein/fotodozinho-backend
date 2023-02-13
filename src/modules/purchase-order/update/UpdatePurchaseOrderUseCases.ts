import { IPurchaseOrder, isPurchaseOrderStatus } from '../../../entities/purchase-order/IPurchaseOrder';
import { PurchaseOrderUpdateRequest } from '../../../entities/purchase-order/dtos/PurchaseOrderUpdateRequest';
import { BadRequestError } from '../../../errors/BadRequestError';
import { IDNotGivenError } from '../../../errors/IDNotGivenError';
import { NumberValidationError } from '../../../errors/NumberValidationError';
import { PurchaseOrderNotFoundError } from '../../../errors/PurchaseOrderNotFoundError';
import { IPurchaseOrdersRepository } from '../../../repositories/purchase-order/IPurchaseOrdersRepository';
import { someIsNull } from '../../../utils/Validate';

export class UpdatePurchaseOrderUseCases {

  constructor(
    private purchaseOrdersRepository: IPurchaseOrdersRepository,
  ) { }

  async execute(id: string, { status, freight, discount }: Omit<PurchaseOrderUpdateRequest, 'paymentMethodId'>): Promise<IPurchaseOrder> {
    if(!id) {
      throw new IDNotGivenError();
    }

    if(someIsNull(status, freight, discount)) {
      throw new BadRequestError('Os campos status, frete e desconto não podem ter valores em branco');
    }

    if(freight && isNaN(freight)) {
      throw new NumberValidationError('Frete');
    }

    if(discount && isNaN(discount)) {
      throw new NumberValidationError('Desconto');
    }

    if(status && !isPurchaseOrderStatus(status)) {
      throw new BadRequestError('O campo status só pode ter três tipos de valores: "WAITING_PAYMENT", "IN_TRANSIT" ou "DONE".');
    }

    const purchaseOrderExists = await this.purchaseOrdersRepository.listById(id);
    if(!purchaseOrderExists) {
      throw new PurchaseOrderNotFoundError();
    }

    const purchaseOrder = await this.purchaseOrdersRepository.update(id, { status, freight, discount });

    return purchaseOrder;
  }

}
