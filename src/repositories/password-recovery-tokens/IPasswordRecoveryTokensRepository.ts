import { IPasswordRecoveryToken } from '../../entities/password-recovery-token/IPasswordRecoveryToken';
import { PasswordRecoveryTokenCreateRequest } from '../../entities/password-recovery-token/dtos/PasswordRecoveryTokenCreateRequest';
import { PasswordRecoveryTokenFilter } from '../../shared/filters/PasswordRecoveryTokenFilter';

export interface IPasswordRecoveryTokensRepository {

  listBy(filter: PasswordRecoveryTokenFilter): Promise<IPasswordRecoveryToken>;

  create(createDTO: PasswordRecoveryTokenCreateRequest): Promise<IPasswordRecoveryToken>;

  delete(filter: PasswordRecoveryTokenFilter): Promise<void>;

  deleteExpiredTokens(): Promise<void>;

}
