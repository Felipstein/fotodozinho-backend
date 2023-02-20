import ms from 'ms';
import { IPasswordRecoveryToken } from '../entities/password-recovery-token/IPasswordRecoveryToken';
import { BadRequestError } from '../errors/BadRequestError';
import { RequiredFieldsError } from '../errors/RequiredFieldsError';
import { currentPasswordRecoveryTokensRepository, currentUsersRepository } from '../repositories';
import { IPasswordRecoveryTokensRepository } from '../repositories/password-recovery-tokens/IPasswordRecoveryTokensRepository';
import { EnvProvider } from '../services/env-provider';
import { PasswordRecoveryTokenFilter } from '../shared/filters/PasswordRecoveryTokenFilter';
import { IUsersRepository } from '../repositories/users/IUsersRepository';
import { UserNotFoundError } from '../errors/UserNotFoundError';

export class PasswordRecoveryToken {

  readonly expiresIn = EnvProvider.tokensExpirationTime.passwordRecoveryToken;

  constructor(
    private passwordRecoveryTokensRepository: IPasswordRecoveryTokensRepository,
    private usersRepository: IUsersRepository,
  ) { }

  async getPasswordRecoveryToken({ id, userId }: PasswordRecoveryTokenFilter): Promise<IPasswordRecoveryToken> {
    if(!id && !userId) {
      throw new BadRequestError('Os campos ID ou Usuário são obrigatórios');
    }

    const passwordRecoveryToken = await this.passwordRecoveryTokensRepository.listBy({ id, userId });

    return passwordRecoveryToken;
  }

  async generate(userId: string): Promise<IPasswordRecoveryToken> {
    if(!userId) {
      throw new BadRequestError('Usuário é obrigatório');
    }

    const user = await this.usersRepository.listById(userId);
    if(!user) {
      throw new UserNotFoundError();
    }

    const alreadyExists = await this.getPasswordRecoveryToken({ userId });
    if(alreadyExists) {
      await this.delete({ userId });
    }

    const expiresIn = Date.now() + ms(this.expiresIn);

    const passwordRecoveryToken = await this.passwordRecoveryTokensRepository.create({ expiresIn, userId });

    return passwordRecoveryToken;
  }

  isExpired(passwordRecoveryToken: IPasswordRecoveryToken): boolean {
    if(!passwordRecoveryToken) {
      throw new RequiredFieldsError('Token');
    }

    return Date.now() > passwordRecoveryToken.expiresIn;
  }

  async verifyToken({ id, userId }: PasswordRecoveryTokenFilter): Promise<void> {
    if(!id && !userId) {
      throw new BadRequestError('Os campos ID ou Usuário são obrigatórios');
    }


    const passwordRecoveryToken = await this.getPasswordRecoveryToken({ id, userId });
    if(!passwordRecoveryToken) {
      throw new BadRequestError('Token inválido ou expirado');
    }

    if(this.isExpired(passwordRecoveryToken)) {
      throw new BadRequestError('Token inválido ou expirado');
    }

    const user = await this.usersRepository.listById(passwordRecoveryToken.userId);
    if(!user) {
      throw new BadRequestError('Token inválido ou expirado');
    }
  }

  async delete({ id, userId }: PasswordRecoveryTokenFilter): Promise<void> {
    if(!id && !userId) {
      throw new BadRequestError('Os campos ID ou Usuário são obrigatórios');
    }

    const passwordRecoveryTokenExists = this.getPasswordRecoveryToken({ id, userId });
    if(!passwordRecoveryTokenExists) {
      throw new BadRequestError('Token inválido ou já expirado');
    }

    await this.passwordRecoveryTokensRepository.delete({ id, userId });
  }

}

const passwordRecoveryTokenProvider = new PasswordRecoveryToken(currentPasswordRecoveryTokensRepository, currentUsersRepository);

export { passwordRecoveryTokenProvider };
