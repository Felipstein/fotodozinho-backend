import ms from 'ms';
import { IValidatorToken } from '../entities/validator-token/IValidatorToken';
import { currentValidatorTokensRepository } from '../repositories';
import { IValidatorTokensRepository } from '../repositories/validator-tokens/IValidatorTokensRepository';
import { EnvProvider } from '../services/env-provider';
import { RequiredFieldsError } from '../errors/RequiredFieldsError';
import { BadRequestError } from '../errors/BadRequestError';
import { NotFoundError } from '../errors/NotFoundError';

class ValidatorToken {

  readonly expiresIn = EnvProvider.tokensExpirationTime.validateToken;

  constructor(
    private validatorTokensRepository: IValidatorTokensRepository,
  ) { }

  async getValidatorToken(email: string): Promise<IValidatorToken> {
    if(!email) {
      throw new RequiredFieldsError('E-mail');
    }

    const validatorToken = await this.validatorTokensRepository.listByEmail(email);

    return validatorToken;
  }

  async generate(email: string): Promise<IValidatorToken> {
    if(!email) {
      throw new RequiredFieldsError('E-mail');
    }

    const alreadyExists = await this.validatorTokensRepository.listByEmail(email);
    if(alreadyExists) {
      throw new BadRequestError('Esse e-mail já está aguardando verificação');
    }

    const expiresIn = Date.now() + ms(this.expiresIn);

    const validatorToken = await this.validatorTokensRepository.create({
      email, expiresIn,
    });

    return validatorToken;
  }

  isExpired(validatorToken: IValidatorToken): boolean {
    if(!validatorToken) {
      throw new RequiredFieldsError('Token');
    }

    return Date.now() > validatorToken.expiresIn;
  }

  async delete({ id, email }: { id?: string, email?: string }): Promise<void> {
    if(!id && !email) {
      throw new RequiredFieldsError('Token');
    }

    const validatorTokenExists = await this.validatorTokensRepository.listById(id);
    if(!validatorTokenExists) {
      throw new NotFoundError('Token inválido');
    }

    await this.validatorTokensRepository.delete({ id, email });
  }

}

const validatorTokenProvider = new ValidatorToken(currentValidatorTokensRepository);

export { validatorTokenProvider };
