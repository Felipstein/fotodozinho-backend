import { IUserView } from '../../../entities/user/IUserView';

export interface SignUpRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  user: IUserView;
  token: string;
}
