import { IRefreshToken } from '../../entities/refresh-token/IRefreshToken';
import { RefreshTokenCreateRequest } from '../../entities/refresh-token/dtos/RefreshTokenCreateRequest';
import { RefreshTokenFilterProperties } from '../../shared/RefreshTokenFilterProperties';

export interface IRefreshTokensRepository {

  listByProperties({ refreshTokenId, userId }: RefreshTokenFilterProperties): Promise<IRefreshToken>;

  create({ expiresIn, userId }: RefreshTokenCreateRequest): Promise<IRefreshToken>;

  delete(refreshToken: string): Promise<void>;

}
