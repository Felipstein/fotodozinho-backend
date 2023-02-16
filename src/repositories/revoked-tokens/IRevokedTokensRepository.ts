import { IRevokedToken } from '../../entities/revoked-token/IRevokedToken';
import { RevokedTokenCreateOrUpdatedRequest } from '../../entities/revoked-token/dtos/RevokedTokenCreateOrUpdateRequest';

export interface IRevokedTokensRepository {

  listByToken(token: string): Promise<IRevokedToken>;

  createOrUpdate({ token, expiresIn }: RevokedTokenCreateOrUpdatedRequest): Promise<IRevokedToken>;

  delete(token: string): Promise<void>;

  deleteExpiredTokens(): Promise<void>;

}
