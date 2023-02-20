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
    const confirmLink = `${EnvProvider.host}:${EnvProvider.port}/validate-email/${validatorToken}`;

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

}
