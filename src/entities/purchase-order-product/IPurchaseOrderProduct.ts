import { IProduct } from '../product/IProduct';
import { IPurchaseOrder } from '../purchase-order/IPurchaseOrder';

export interface IPurchaseOrderProduct {
  id: string;
  product: IProduct;
  purchaseOrder: IPurchaseOrder;
  quantity: number;
}
