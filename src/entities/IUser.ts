export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  password: string;
}
