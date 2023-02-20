export interface UserUpdateRequest {
  name?: string;
  phone?: string | null;
  password?: string;
  admin?: boolean;
  verified?: boolean;
  lastLogin?: Date;
  notifyServicesByEmail?: boolean;
  totalPrints?: number;
  totalPrintOrders?: number;
  totalPurchases?: number;
  totalPurchaseOrders?: number;
}
