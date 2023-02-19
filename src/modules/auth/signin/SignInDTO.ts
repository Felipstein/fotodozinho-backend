import { IUserPublic } from '../../../entities/user/IUserPublic';

export interface SignInRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignInResponse {
  user: IUserPublic;
  token: string;
  refreshToken: string;
}
