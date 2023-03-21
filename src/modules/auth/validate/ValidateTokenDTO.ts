import { IUserPublic } from '../../../entities/user/IUserPublic';

export interface ValidateTokenRequest {
  token: string;
}

export interface ValidateTokenResponse {
  user: IUserPublic;
  token: string;
}
