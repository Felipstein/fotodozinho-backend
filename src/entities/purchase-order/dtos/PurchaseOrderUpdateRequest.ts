import { PurchaseOrderStatus } from '../IPurchaseOrder';

export interface PurchaseOrderUpdateRequest {
  status?: PurchaseOrderStatus;
  paymentMethodId?: string;
  freight?: number;
  discount?: number;
}
