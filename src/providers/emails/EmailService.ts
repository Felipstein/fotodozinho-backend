export interface EmailService {

  sendEmail(to: string, subject: string, body: string): Promise<void>;

  sendConfirmEmail(to: string, userName: string, validatorToken: string): Promise<void>;

}
