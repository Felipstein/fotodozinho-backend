import { IUserPublic } from '../../../entities/user/IUserPublic';

export interface ValidateTokenRequest {
  userId: string;
  token: string;
}

export interface ValidateTokenResponse {
  user: IUserPublic;
  token: string;
}
