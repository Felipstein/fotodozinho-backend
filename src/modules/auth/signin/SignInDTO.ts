import { IUserView } from '../../../entities/user/IUserView';

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: IUserView;
  token: string;
}
