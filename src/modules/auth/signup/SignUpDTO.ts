import { IUserPublic } from '../../../entities/user/IUserPublic';

export interface SignUpRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  user: IUserPublic;
  token: string;
  refreshToken: string;
}
