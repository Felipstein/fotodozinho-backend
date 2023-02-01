export interface IUserUpdating {
  name?: string;
  phone?: string | null;
  password?: string;
  admin?: boolean;
  totalPrints?: number;
  totalPrintOrders?: number;
  totalPurchases?: number;
}
