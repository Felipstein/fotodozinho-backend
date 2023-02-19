import { IRefreshToken } from '../../entities/refresh-token/IRefreshToken';
import { RefreshTokenCreateRequest } from '../../entities/refresh-token/dtos/RefreshTokenCreateRequest';
import { RefreshTokenUpdateRequest } from '../../entities/refresh-token/dtos/RefreshTokenUpdateRequest';

export interface IRefreshTokensRepository {

  create({ expiresIn, userId }: RefreshTokenCreateRequest): Promise<IRefreshToken>;

  updateExpiresIn(userId: string, { expiresIn }: RefreshTokenUpdateRequest): Promise<IRefreshToken>;

  delete(id: string): Promise<void>;

}
