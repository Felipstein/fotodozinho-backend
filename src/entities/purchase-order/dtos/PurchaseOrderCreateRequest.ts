import { PurchaseOrderProductCreateRequest } from '../../purchase-order-product/dtos/PurchaseOrderProductCreateRequest';

export interface PurchaseOrderCreateRequest {
  number: number;
  paymentMethodId: string;
  products: PurchaseOrderProductCreateRequest[];
  userId: string;
}
