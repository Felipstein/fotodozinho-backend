import { PurchaseOrderStatus as PrismaPurchaseOrderStatus } from '@prisma/client';
import { IPaymentMethod } from '../payment-method/IPaymentMethod';
import { IPurchaseOrderProduct } from '../purchase-order-product/IPurchaseOrderProduct';

export type PurchaseOrderStatus = 'WAITING_PAYMENT' | 'IN_TRANSIT' | 'DONE';

export function isPurchaseOrderStatus(value: string) {
  return value.toUpperCase() in PrismaPurchaseOrderStatus;
}

export function convertPurchaseOrderStatus(status: string): PurchaseOrderStatus {
  if(!isPurchaseOrderStatus(status)) {
    throw new TypeError();
  }

  const newStatus = status.toUpperCase().replace(' ', '_');

  // @ts-ignore
  return newStatus;
}
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
