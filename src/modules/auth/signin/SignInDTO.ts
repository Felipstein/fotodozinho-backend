import { IUserView } from '../../../entities/user/IUserView';

export interface SignInRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignInResponse {
  user: IUserView;
  token: string;
  refreshToken: string;
}
