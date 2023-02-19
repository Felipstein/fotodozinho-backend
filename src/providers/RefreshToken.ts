import { IRefreshToken } from '../entities/refresh-token/IRefreshToken';
import { RefreshTokenCreateRequest } from '../entities/refresh-token/dtos/RefreshTokenCreateRequest';
import { RequiredFieldsError } from '../errors/RequiredFieldsError';
import { currentRefreshTokensRepository, currentUsersRepository } from '../repositories';
import { IRefreshTokensRepository } from '../repositories/refresh-tokens/IRefreshTokensRepository';
import { IUsersRepository } from '../repositories/users/IUsersRepository';

export class RefreshToken {

  constructor(
    private refreshTokensRepository: IRefreshTokensRepository,
    private usersRepository: IUsersRepository,
  ) { }

  async generate({ userId }: Omit<RefreshTokenCreateRequest, 'expiresIn'>): Promise<IRefreshToken> {
    if(!userId) {
      throw new Error('Params expiresIn and userId cannot be null or undefined');
    }

    const userExists = await this.usersRepository.listById(userId);
    if(!userExists) {
      throw new Error('User not found');
    }

    const expiresIn = Math.floor((Date.now() + 15000) / 1000);

    const refreshToken = await this.refreshTokensRepository.create({ expiresIn, userId });

    return refreshToken;
  }

}

const refreshTokenProvider = new RefreshToken(currentRefreshTokensRepository, currentUsersRepository);

export { refreshTokenProvider };
