export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  password: string;
  createdAt: Date;
  admin: boolean;
  totalPrints: number;
  totalPrintOrders: number;
  totalPurchases: number;
}
