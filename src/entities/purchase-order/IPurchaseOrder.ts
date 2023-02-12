import { IPaymentMethod } from '../payment-method/IPaymentMethod';
import { IUserView } from '../user/IUserView';

export type PurchaseOrderStatus = 'WAITING_PAYMENT' | 'IN_TRANSIT' | 'DONE';

export interface IPurchaseOrder {
  id: string;
  number: number;
  status: PurchaseOrderStatus;
  paymentMethod: IPaymentMethod;
  freight: number;
  discount: number;
  user: IUserView;
  createdAt: Date;
}
