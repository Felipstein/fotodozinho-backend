import { IRefreshToken } from '../../entities/refresh-token/IRefreshToken';
import { RefreshTokenCreateRequest } from '../../entities/refresh-token/dtos/RefreshTokenCreateRequest';

export interface IRefreshTokensRepository {

  create({ expiresIn, userId }: RefreshTokenCreateRequest): Promise<IRefreshToken>;

  delete(id: string): Promise<void>;

}
