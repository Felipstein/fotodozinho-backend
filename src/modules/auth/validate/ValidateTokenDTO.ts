import { IUserView } from '../../../entities/user/IUserView';

export interface ValidateTokenRequest {
  userId: string;
  token: string;
}

export interface ValidateTokenResponse {
  user: IUserView;
  token: string;
}
