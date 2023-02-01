export interface UpdateUserDTO {
  name?: string;
  phone?: string;
  password?: string;
  admin?: boolean;
  totalPrints?: number;
  totalPrintOrders?: number;
  totalPurchases?: number;
}
