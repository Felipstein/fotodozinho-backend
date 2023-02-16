import { RevokedTokens } from '@prisma/client';
import { IRevokedToken } from '../entities/revoked-token/IRevokedToken';

type RevokedTokenDomain = IRevokedToken;
type RevokedTokenPersistence = RevokedTokens;

class RevokedTokenMapper {

  toDomain(revokedTokenPersistence: RevokedTokenPersistence): RevokedTokenDomain {
    return {
      id: revokedTokenPersistence.id,
      token: revokedTokenPersistence.token,
      expiresIn: Number(revokedTokenPersistence.expiresIn),
    };
  }

}

const revokedTokenMapper = new RevokedTokenMapper();

export { revokedTokenMapper };
