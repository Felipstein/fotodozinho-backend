export interface UserUpdateRequest {
  name?: string;
  phone?: string | null;
  password?: string;
  admin?: boolean;
  verified?: boolean;
  lastLogin?: Date;
  deletedAt?: Date;
  totalPrints?: number;
  totalPrintOrders?: number;
  totalPurchases?: number;
  totalPurchaseOrders?: number;
}
