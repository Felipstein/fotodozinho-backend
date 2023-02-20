export interface SetPasswordRequest {
  passwordRecoveryTokenId: string;
  newPassword: string;
  confirmNewPassword: string;
}
