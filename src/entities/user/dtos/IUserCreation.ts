interface IUserCreation {
  name: string;
  email: string;
  phone?: string | null;
  password: string;
  admin?: boolean;
}
