import { IValidatorToken } from '../../entities/validator-token/IValidatorToken';
import { ValidatorTokenCreateRequest } from '../../entities/validator-token/dtos/ValidatorTokenCreateRequest';

export interface IValidatorTokensRepository {

  listById(id: string): Promise<IValidatorToken>;

  listByEmail(email: string): Promise<IValidatorToken>;

  create({ expiresIn, email }: ValidatorTokenCreateRequest): Promise<IValidatorToken>;

  delete({ id, email }: { id?: string, email?: string }): Promise<void>;

}
