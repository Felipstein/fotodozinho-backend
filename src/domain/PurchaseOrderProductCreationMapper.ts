import { Prisma, PurchaseOrderProduct } from '@prisma/client';
import { PurchaseOrderProductCreateRequest } from '../entities/purchase-order-product/dtos/PurchaseOrderProductCreateRequest';

type PurchaseOrderProductCreationDomain = PurchaseOrderProductCreateRequest;
type PurchaseOrderProductCreationPersistence = Omit<PurchaseOrderProduct, 'id' | 'purchaseOrderId'>;

class PurchaseOrderProductCreationMapper {

  toPersistence(purchaseOrderProductCreationDomain: PurchaseOrderProductCreationDomain): PurchaseOrderProductCreationPersistence {
    return {
      productId: purchaseOrderProductCreationDomain.productId,
      quantity: new Prisma.Decimal(purchaseOrderProductCreationDomain.quantity),
    };
  }

}

const purchaseOrderProductCreationMapper = new PurchaseOrderProductCreationMapper();

export { purchaseOrderProductCreationMapper };
