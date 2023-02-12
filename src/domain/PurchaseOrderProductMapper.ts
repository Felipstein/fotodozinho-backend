import { Product, ProductCategory, PurchaseOrderProduct } from '@prisma/client';
import { IPurchaseOrderProduct } from '../entities/purchase-order-product/IPurchaseOrderProduct';
import { productMapper } from './ProductMapper';

type ProductWithCategory = Product & { category: ProductCategory };

type PurchaseOrderProductDomain = IPurchaseOrderProduct;
type PurchaseOrderProductPersistence = PurchaseOrderProduct & { product: ProductWithCategory };

class PurchaseOrderProductMapper {

  toDomain(purchaseOrderProductPersistence: PurchaseOrderProductPersistence): PurchaseOrderProductDomain {
    return {
      id: purchaseOrderProductPersistence.id,
      product: productMapper.toDomain(purchaseOrderProductPersistence.product),
      quantity: Number(purchaseOrderProductPersistence.quantity),
      purchaseOrderId: purchaseOrderProductPersistence.purchaseOrderId,
    };
  }

}

const purchaseOrderProductMapper = new PurchaseOrderProductMapper();

export { purchaseOrderProductMapper };
