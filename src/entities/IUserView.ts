export interface IUserView {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  createdAt: Date;
  admin: boolean;
}
