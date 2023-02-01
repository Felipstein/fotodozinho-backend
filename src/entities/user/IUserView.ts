export interface IUserView {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  createdAt: Date;
  admin: boolean;
  totalPrints: number;
  totalPurchases: number;
}
