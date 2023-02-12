import { IProduct } from '../product/IProduct';

export interface IPurchaseOrderProduct {
  id: string;
  product: IProduct;
  purchaseOrderId: string;
  quantity: number;
}
