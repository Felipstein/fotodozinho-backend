import jwt from 'jsonwebtoken';
import { EnvProvider } from '../services/env-provider';
import { InvalidTokenError } from '../errors/InvalidTokenError';
import { TokenExpiredError } from '../errors/TokenExpiredError';
import { currentRevokedTokensRepository } from '../repositories';
import { RevokedTokenError } from '../errors/RevokedTokenError';

class TokenProvider {

  readonly expiresIn = EnvProvider.tokensExpirationTime.accessToken;

  generate(data: Record<string, any>): string {
    const token = jwt.sign(data, EnvProvider.secretKey, { expiresIn: this.expiresIn });

    return token;
  }

  async verify(token: string) {
    try {
      jwt.verify(token, EnvProvider.secretKey);

      const isRevoked = await currentRevokedTokensRepository.listByToken(token);
      if(isRevoked) {
        throw new RevokedTokenError();
      }
    } catch (err: any) {
      if(err instanceof RevokedTokenError) {
        throw err;
      }

      if(err.message === 'jwt expired') {
        throw new TokenExpiredError();
      }

      throw new InvalidTokenError();
    }
  }

  decode(token: string) {
    const data = jwt.decode(token, { json: true });

    return data;
  }

}

const tokenProvider = new TokenProvider();

export { tokenProvider };
