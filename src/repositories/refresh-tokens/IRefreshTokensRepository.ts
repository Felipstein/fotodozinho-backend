import { IRefreshToken } from '../../entities/refresh-token/IRefreshToken';
import { RefreshTokenCreateRequest } from '../../entities/refresh-token/dtos/RefreshTokenCreateRequest';
import { RefreshTokenFilter } from '../../shared/filters/RefreshTokenFilter';

export interface IRefreshTokensRepository {

  listByProperties({ refreshTokenId, userId }: RefreshTokenFilter): Promise<IRefreshToken>;

  create({ expiresIn, userId }: RefreshTokenCreateRequest): Promise<IRefreshToken>;

  delete(refreshToken: string): Promise<void>;

}
