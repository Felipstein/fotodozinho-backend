import { IRefreshToken } from '../entities/refresh-token/IRefreshToken';
import { RefreshTokenCreateRequest } from '../entities/refresh-token/dtos/RefreshTokenCreateRequest';
import { currentRefreshTokensRepository, currentUsersRepository } from '../repositories';
import { IRefreshTokensRepository } from '../repositories/refresh-tokens/IRefreshTokensRepository';
import { IUsersRepository } from '../repositories/users/IUsersRepository';

export class RefreshToken {

  private expiresInSeconds = 15;

  constructor(
    private refreshTokensRepository: IRefreshTokensRepository,
    private usersRepository: IUsersRepository,
  ) { }

  async userHasRefreshToken(userId: string): Promise<boolean> {
    if(!userId) {
      throw new Error('Params userId cannot be null or undefined');
    }

    const refreshTokenExists = await this.refreshTokensRepository.listByUserId(userId);

    return !!refreshTokenExists;
  }

  async generate({ userId }: Omit<RefreshTokenCreateRequest, 'expiresIn'>): Promise<IRefreshToken> {
    if(!userId) {
      throw new Error('Params userId cannot be null or undefined');
    }

    const userExists = await this.usersRepository.listById(userId);
    if(!userExists) {
      throw new Error('User not found');
    }

    const expiresIn = Math.floor((Date.now() + (this.expiresInSeconds * 1000)) / 1000);

    const refreshToken = await this.refreshTokensRepository.create({ expiresIn, userId });

    return refreshToken;
  }

  async renewExpiresIn(userId: string): Promise<IRefreshToken> {
    if(!userId) {
      throw new Error('Params userId cannot be null or undefined');
    }

    const refreshTokenExists = await this.refreshTokensRepository.listByUserId(userId);
    if(!refreshTokenExists) {
      throw new Error('Refresh Token not found');
    }

    const expiresIn = Math.floor((Date.now() + (this.expiresInSeconds * 1000)) / 1000);

    const refreshToken = await this.refreshTokensRepository.create({ expiresIn, userId });

    return refreshToken;
  }

  async delete(userId: string): Promise<void> {
    const refreshTokenExists = await this.refreshTokensRepository.listByUserId(userId);
    if(!refreshTokenExists) {
      throw new Error('Refresh Token not found');
    }

    await this.refreshTokensRepository.delete(userId);
  }

}

const refreshTokenProvider = new RefreshToken(currentRefreshTokensRepository, currentUsersRepository);

export { refreshTokenProvider };
