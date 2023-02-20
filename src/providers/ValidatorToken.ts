import ms from 'ms';
import { IValidatorToken } from '../entities/validator-token/IValidatorToken';
import { currentValidatorTokensRepository } from '../repositories';
import { IValidatorTokensRepository } from '../repositories/validator-tokens/IValidatorTokensRepository';
import { EnvProvider } from '../services/env-provider';
import { RequiredFieldsError } from '../errors/RequiredFieldsError';
import { BadRequestError } from '../errors/BadRequestError';
import { NotFoundError } from '../errors/NotFoundError';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { ListValidatorTokenBy } from '../shared/ListValidatorTokenBy';

class ValidatorToken {

  readonly expiresIn = EnvProvider.tokensExpirationTime.validateToken;

  constructor(
    private validatorTokensRepository: IValidatorTokensRepository,
  ) { }

  async getValidatorToken({ id, email }: ListValidatorTokenBy): Promise<IValidatorToken> {
    if(!email && !id) {
      throw new RequiredFieldsError('ID', 'Email');
    }

    let validatorToken;
    if(email) {
      validatorToken = await this.validatorTokensRepository.listByEmail(email);
    } else {
      validatorToken = await this.validatorTokensRepository.listById(id);
    }

    return validatorToken;
  }

  async verify(id: string): Promise<void> {
    if(!id) {
      throw new RequiredFieldsError('Token');
    }

    const validatorToken = await this.validatorTokensRepository.listById(id);
    if(!validatorToken) {
      throw new UnauthorizedError('Token já expirado ou não é válido');
    }

    if(this.isExpired(validatorToken)) {
      throw new UnauthorizedError('Token expirado, clique em enviar verificação novamente');
    }
  }

  async generate(email: string): Promise<IValidatorToken> {
    if(!email) {
      throw new RequiredFieldsError('E-mail');
    }

    const validatorToken = await this.validatorTokensRepository.listByEmail(email);

    if(validatorToken) {
      if(this.isExpired(validatorToken)) {
        await this.delete({ email });
      } else {
        throw new BadRequestError('Esse e-mail já está aguardando verificação');
      }
    }

    const expiresIn = Date.now() + ms(this.expiresIn);

    const validatorTokenCreated = await this.validatorTokensRepository.create({
      email, expiresIn,
    });

    return validatorTokenCreated;
  }

  isExpired(validatorToken: IValidatorToken): boolean {
    if(!validatorToken) {
      throw new RequiredFieldsError('Token');
    }

    return Date.now() > validatorToken.expiresIn;
  }

  async delete({ id, email }: ListValidatorTokenBy): Promise<void> {
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
