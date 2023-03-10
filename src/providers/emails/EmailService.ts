export interface EmailService {

  sendEmail(to: string, subject: string, body: string): Promise<void>;

  sendConfirmEmail(to: string, userName: string, validatorToken: string): Promise<void>;

  sendRecoveryPasswordEmail(to: string, userName: string, passwordRecoveryToken: string): Promise<void>;

  sendSupportEmail(to: string, userName: string): Promise<void>;

  sendPrintOrderReleasedEmail(to: string, userName: string): Promise<void>;

  sendPrintOrderInProductionEmail(to: string, userName: string): Promise<void>;

  sendPrintOrderFinishedEmail(to: string, userName: string, date: string, time: string): Promise<void>;

  sendPurchaseOrderReleasedEmail(to: string, userName: string): Promise<void>;

}
