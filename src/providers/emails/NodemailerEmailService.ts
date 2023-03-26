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

  async sendConfirmEmail(to: string, userName: string, validatorToken: string): Promise<void> {
    const confirmLink = `${EnvProvider.origin}/validateemail/${validatorToken}`;

    await this.sendEmail(
      to,
      'Bem-vindo ao Foto do Zinho - Confirme seu cadastro para começar a usar a plataforma',
      `
        <h2>Olá, ${userName}!</h2>
        <p>Bem vindo aos nossos serviços Foto do Zinho! Nós estamos animados para ter você como um novo cliente e estamos ansiosos para ajudá-lo a obter a melhor qualidade e atendimento possível.</>
        <br>
        <p>Antes de começarmos, precisamos que você confirme para nós seu e-mail, é simples rápdio e fácil! Basta apenas clicar no link abaixo e todos nossos serviços estarão disponíveis para você no nosso site.</p>
        <a href="${confirmLink}" target="_blank">
          ${confirmLink}
        </a>
        <br>
        <p>Feito isso, aqui vai um guia rápido para começar, caso você veio para revelar algumas fotinhas:</p>
        <ol>
          <li>Faça o upload das suas fotos na parte Revelação da plataforma.</li>
          <li>Selecione o tamanho e outras propriedades que você deseja usar para cada foto.</li>
          <li>Envie seu pedido para impressão e aguarde o nosso contato.</li>
        </ol>
        <br>
        <p>Se você tiver alguma dúvida ou precisar de ajuda para navegar em nosso site, por favor, não hesite em entrar em contato conosco na parte suporte da plataforma.</p>
        <br>
        <p>Obrigado por escolher o Foto do Zinho e esperamos que você aproveite nossos serviços!</p>
        <br>
        <p><strong>Sempre registrando sua história</strong></p>
        <br>
        <p>Atenciosamente,</p>
        <p>Equipe Foto do Zinho</p>
      `,
    );
  }

  async sendRecoveryPasswordEmail(to: string, userName: string, passwordRecoveryToken: string): Promise<void> {
    const recoveryLink = `${EnvProvider.origin}/reset-password?token=${passwordRecoveryToken}`;

    await this.sendEmail(
      to,
      'Recuperação de Senha - Foto do Zinho',
      `
        <p><strong>Olá, ${userName}! Sentimos muito por isso :(</strong></p>
        <br>
        <p>Recebemos uma solicitação para redefinir a senha da sua conta em Foto do Zinho.</p>
        <p>Para prosseguir com a recuperação da sua senha, clique no link abaixo:</p>
        <p>
          <a href="${recoveryLink}" target="_blank">
            ${recoveryLink}
          </a>
        </p>
        <br>
        <p>Se você não solicitou a recuperação da senha, por favor ignore este e-mail.</p>
        <br>
        <p>Atenciosamente,</p>
        <p>Equipe Foto do Zinho</p>
      `,
    );
  }

  async sendSupportEmail(to: string, userName: string): Promise<void> {
    await this.sendEmail(
      to,
      'Suporte - Foto do Zinho',
      `
        <p><strong>Olá, ${userName}!</strong></p>
        <p>Recebemos sua mensagem e estamos trabalhando para ajudá-lo a resolver seus problemas. Nossa equipe de suporte entrará em contato com você o mais breve possível para ajudá-lo com o problema que você está enfrentando.</p>
        <br>
        <p>Enquanto isso, se você tiver alguma outra dúvida ou preocupação, não hesite em entrar em contato conosco.</p>
        <br>
        <p>Atenciosamente,</p>
        <p>A equipe de suporte da Foto do Zinho</p>
      `,
    );
  }

  async sendPrintOrderReleasedEmail(to: string, userName: string): Promise<void> {
    await this.sendEmail(
      to,
      'Pedido de Revelação de Fotos - Foto do Zinho',
      `
        <p><strong>Olá, ${userName}!</strong></p>
        <p>Seu pedido de revelação de fotos foi enviado para nós com êxito, e já já vamos começar!</p>
        <p>Assim que o status for atualizado, entraremos em contato com você.</p>
        <br>
        <p>Enquanto isso, se você tiver alguma outra dúvida ou preocupação, não hesite em entrar em contato conosco.</p>
        <br>
        <p>Atenciosamente,</p>
        <p>A equipe de suporte da Foto do Zinho</p>
      `,
    );
  }

  async sendPrintOrderInProductionEmail(to: string, userName: string): Promise<void> {
    await this.sendEmail(
      to,
      'Pedido de Revelação de Fotos - Foto do Zinho',
      `
        <p><strong>Olá, ${userName}!</strong></p>
        <p>Seu pedido de revelação de fotos já entrou para revelação!</p>
        <p>Assim que for finalizado, entraremos em contato com você.</p>
        <br>
        <p>Enquanto isso, se você tiver alguma outra dúvida ou preocupação, não hesite em entrar em contato conosco.</p>
        <br>
        <p>Atenciosamente,</p>
        <p>A equipe de suporte da Foto do Zinho</p>
      `,
    );
  }

  async sendPrintOrderFinishedEmail(to: string, userName: string, date: string, time: string): Promise<void> {
    await this.sendEmail(
      to,
      'Pedido de Revelação de Fotos - Foto do Zinho',
      `
        <p><strong>Olá, ${userName}!</strong></p>
        <p>Suas fotos para revelar do dia ${date} às ${time} já estão prontas!</p>
        <p>Você já pode vir na loja para retira-las.</p>
        <br>
        <p>Atenciosamente,</p>
        <p>A equipe de suporte da Foto do Zinho</p>
      `,
    );
  }

  async sendPurchaseOrderReleasedEmail(to: string, userName: string): Promise<void> {
    await this.sendEmail(
      to,
      'Pedido de compras - Foto do Zinho',
      `
        <p><strong>Olá, ${userName}!</strong></p>
        <p>Seu pedido de compras já está quase pronto, basta apenas escolher o método de pagamento!</p>
        <br>
        <p>Enquanto isso, se você tiver alguma outra dúvida ou preocupação, não hesite em entrar em contato conosco.</p>
        <br>
        <p>Atenciosamente,</p>
        <p>A equipe de suporte da Foto do Zinho</p>
      `,
    );
  }

}
