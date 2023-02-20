export interface UserCreateRequest {
  name: string;
  email: string;
  phone?: string | null;
  password: string;
  admin?: boolean;
  notifyServicesByEmail: boolean;
  verified?: boolean;
}
