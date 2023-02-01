export interface UserUpdateRequest {
  name?: string;
  phone?: string | null;
  password?: string;
  admin?: boolean;
  totalPrints?: number;
  totalPrintOrders?: number;
  totalPurchases?: number;
}
