import { IValidatorToken } from '../../entities/validator-token/IValidatorToken';
import { ValidatorTokenCreateRequest } from '../../entities/validator-token/dtos/ValidatorTokenCreateRequest';
import { ListValidatorTokenBy } from '../../shared/ListValidatorTokenBy';

export interface IValidatorTokensRepository {

  listById(id: string): Promise<IValidatorToken>;

  listByEmail(email: string): Promise<IValidatorToken>;

  create({ expiresIn, email }: ValidatorTokenCreateRequest): Promise<IValidatorToken>;

  delete({ id, email }: ListValidatorTokenBy): Promise<void>;

  deleteExpiredTokens(): Promise<void>;

}
