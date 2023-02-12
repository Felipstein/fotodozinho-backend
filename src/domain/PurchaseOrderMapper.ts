import { PaymentMethod, Product, ProductCategory, PurchaseOrder, PurchaseOrderProduct } from '@prisma/client';
import { IPurchaseOrder } from '../entities/purchase-order/IPurchaseOrder';
import { purchaseOrderProductMapper } from './PurchaseOrderProductMapper';

type OriginalProductWithCategory = Product & { category: ProductCategory }
type PurchaseOrderProductWithOriginalProduct = PurchaseOrderProduct & { product: OriginalProductWithCategory };

type PurchaseOrderDomain = IPurchaseOrder;
type PurchaseOrderPersistence = PurchaseOrder & { paymentMethod: PaymentMethod, PurchaseOrderProduct: PurchaseOrderProductWithOriginalProduct[]};

class PurchaseOrderMapper {

  toDomain(purchaseOrderPersistence: PurchaseOrderPersistence): PurchaseOrderDomain {
    return {
      id: purchaseOrderPersistence.id,
      number: Number(purchaseOrderPersistence.number),
      status: purchaseOrderPersistence.status,
      paymentMethod: purchaseOrderPersistence.paymentMethod,
      products: purchaseOrderPersistence.PurchaseOrderProduct.map(purchaseOrderProduct => purchaseOrderProductMapper.toDomain(purchaseOrderProduct)),
      freight: Number(purchaseOrderPersistence.freight),
      discount: Number(purchaseOrderPersistence.discount),
      createdAt: purchaseOrderPersistence.createdAt,
      userId: purchaseOrderPersistence.userId,
    };
  }

}

const purchaseOrderMapper = new PurchaseOrderMapper();

export { purchaseOrderMapper };
