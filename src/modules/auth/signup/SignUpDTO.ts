import { IUserPublic } from '../../../entities/user/IUserPublic';

export interface SignUpRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  notifyServicesByEmail: boolean;
  acceptedTermsAndConditions: boolean;
}

export interface SignUpResponse {
  user: IUserPublic;
  token: string;
  refreshToken: string;
}
