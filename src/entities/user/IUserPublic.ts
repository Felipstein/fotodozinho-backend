export interface IUserPublic {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  createdAt: Date;
  admin: boolean;
  verified: boolean;
  totalPrints: number;
  totalPrintOrders: number;
  totalPurchases: number;
  totalPurchaseOrders: number;
}
