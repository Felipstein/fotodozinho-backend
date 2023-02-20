export interface RecoveryPasswordRequest {
  passwordRecoveryTokenId: string;
  newPassword: string;
  confirmNewPassword: string;
}
