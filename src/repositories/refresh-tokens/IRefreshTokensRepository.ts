import { IRefreshToken } from '../../entities/refresh-token/IRefreshToken';
import { RefreshTokenCreateRequest } from '../../entities/refresh-token/dtos/RefreshTokenCreateRequest';
import { RefreshTokenUpdateRequest } from '../../entities/refresh-token/dtos/RefreshTokenUpdateRequest';
import { RefreshTokenFilterProperties } from '../../shared/RefreshTokenFilterProperties';

export interface IRefreshTokensRepository {

  listByProperties({ refreshTokenId, userId }: RefreshTokenFilterProperties): Promise<IRefreshToken>;

  create({ expiresIn, userId }: RefreshTokenCreateRequest): Promise<IRefreshToken>;

  updateExpiresIn(userId: string, { expiresIn }: RefreshTokenUpdateRequest): Promise<IRefreshToken>;

  delete(userId: string): Promise<void>;

}
