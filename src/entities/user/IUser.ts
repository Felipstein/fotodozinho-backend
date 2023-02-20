export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  password: string;
  createdAt: Date;
  lastLogin: Date;
  deletedAt: Date;
  admin: boolean;
  verified: boolean;
  totalPrints: number;
  totalPrintOrders: number;
  totalPurchases: number;
  totalPurchaseOrders: number;
}
