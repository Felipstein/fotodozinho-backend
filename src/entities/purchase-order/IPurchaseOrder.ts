import { IPaymentMethod } from '../payment-method/IPaymentMethod';
import { IPurchaseOrderProduct } from '../purchase-order-product/IPurchaseOrderProduct';

export type PurchaseOrderStatus = 'WAITING_PAYMENT' | 'IN_TRANSIT' | 'DONE';

export interface IPurchaseOrder {
  id: string;
  number: number;
  status: PurchaseOrderStatus;
  paymentMethod: IPaymentMethod;
  products: IPurchaseOrderProduct[];
  freight: number;
  discount: number;
  userId: string;
  createdAt: Date;
}
