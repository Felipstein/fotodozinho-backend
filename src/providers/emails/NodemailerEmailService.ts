import nodemailer from 'nodemailer';

import { EmailService } from './EmailService';
import { EnvProvider } from '../../services/env-provider';

export class NodemailerEmailService implements EmailService {

  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: EnvProvider.smtp.host,
      port: 587,
      secure: false,
      auth: {
        user: EnvProvider.smtp.user,
        pass: EnvProvider.smtp.pass,
      }
    });
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    await this.transporter.sendMail({
      from: EnvProvider.smtp.email,
      to,
      subject,
      html: body,
    });
  }

}
