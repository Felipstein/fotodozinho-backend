import { RefreshToken } from '@prisma/client';
import { IRefreshToken } from '../entities/refresh-token/IRefreshToken';

type RefreshTokenDomain = IRefreshToken;
type RefreshTokenPersistence = RefreshToken;

class RefreshTokenMapper {

  toDomain(refreshTokenPersistence: RefreshTokenPersistence): RefreshTokenDomain {
    return {
      id: refreshTokenPersistence.id,
      expiresIn: Number(refreshTokenPersistence.expiresIn),
      userId: refreshTokenPersistence.userId,
    };
  }

}

const refreshTokenMapper = new RefreshTokenMapper();

export { refreshTokenMapper };
