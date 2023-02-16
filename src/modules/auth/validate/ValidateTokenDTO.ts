import { IUserView } from '../../../entities/user/IUserView';

export interface ValidateTokenRequest {
  token: string;
}

export interface ValidateTokenResponse {
  user: IUserView;
  token: string;
}
