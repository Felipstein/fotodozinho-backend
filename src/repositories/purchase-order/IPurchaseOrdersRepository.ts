import { IPurchaseOrder } from '../../entities/purchase-order/IPurchaseOrder';
import { PurchaseOrderCreateRequest } from '../../entities/purchase-order/dtos/PurchaseOrderCreateRequest';
import { PurchaseOrderUpdateRequest } from '../../entities/purchase-order/dtos/PurchaseOrderUpdateRequest';
import { PurchaseOrderFilter } from '../../shared/filters/PurchaseOrderFilter';

export interface IPurchaseOrdersRepository {

  listAll(filter?: PurchaseOrderFilter): Promise<IPurchaseOrder[]>;

  listByUserId(userId: string): Promise<IPurchaseOrder[]>;

  listById(id: string): Promise<IPurchaseOrder>;

  create({ number, paymentMethodId, products, userId }: PurchaseOrderCreateRequest): Promise<IPurchaseOrder>;

  update(id: string, { status, paymentMethodId, freight, discount }: PurchaseOrderUpdateRequest): Promise<IPurchaseOrder>;

  delete(id: string): Promise<void>;

}
