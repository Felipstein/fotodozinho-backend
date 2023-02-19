import ms from 'ms';
import { IRefreshToken } from '../entities/refresh-token/IRefreshToken';
import { currentRefreshTokensRepository, currentUsersRepository } from '../repositories';
import { IRefreshTokensRepository } from '../repositories/refresh-tokens/IRefreshTokensRepository';
import { IUsersRepository } from '../repositories/users/IUsersRepository';
import { EnvProvider } from '../services/env-provider';
import { RefreshTokenFilterProperties } from '../shared/RefreshTokenFilterProperties';

export class RefreshToken {

  readonly expiresIn = EnvProvider.tokensExpirationTime.refreshToken;

  constructor(
    private refreshTokensRepository: IRefreshTokensRepository,
    private usersRepository: IUsersRepository,
  ) { }

  async getRefreshTokenBy({ refreshTokenId, userId }: RefreshTokenFilterProperties): Promise<IRefreshToken | null> {
    if(!userId && !refreshTokenId) {
      throw new Error('Params userId or refreshTokenId cannot be null or undefined');
    }

    const refreshToken = await this.refreshTokensRepository.listByProperties({ refreshTokenId, userId });

    return refreshToken;
  }

  async generate(userId: string): Promise<IRefreshToken> {
    if(!userId) {
      throw new Error('Param userId cannot be null or undefined');
    }

    const userExists = await this.usersRepository.listById(userId);
    if(!userExists) {
      throw new Error('User not found');
    }

    const expiresIn = Date.now() + ms(this.expiresIn);

    const refreshToken = await this.refreshTokensRepository.create({ expiresIn, userId });

    return refreshToken;
  }

  refreshTokenIsExpired(refreshToken: IRefreshToken): boolean {
    if(!refreshToken) {
      throw new Error('Param refreshToken cannot be null or undefined');
    }

    return Date.now() > refreshToken.expiresIn;
  }

  async regenerateRefreshToken(userId: string): Promise<IRefreshToken> {
    if(!userId) {
      throw new Error('Param userId cannot be null or undefined');
    }

    const refreshToken = await this.refreshTokensRepository.listByProperties({ userId });
    if(!refreshToken) {
      throw new Error('Refresh Token not found');
    }

    const expiresIn = Date.now() + ms(this.expiresIn);

    await this.delete(refreshToken.id);
    const newRefreshToken = await this.refreshTokensRepository.create({ expiresIn, userId });

    return newRefreshToken;
  }

  async delete(refreshToken: string): Promise<void> {
    const refreshTokenExists = await this.refreshTokensRepository.listByProperties({ refreshTokenId: refreshToken });
    if(!refreshTokenExists) {
      throw new Error('Refresh Token not found');
    }

    await this.refreshTokensRepository.delete(refreshToken);
  }

}

const refreshTokenProvider = new RefreshToken(currentRefreshTokensRepository, currentUsersRepository);

export { refreshTokenProvider };
