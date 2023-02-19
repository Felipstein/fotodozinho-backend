import { prisma } from '../../database';
import { refreshTokenMapper } from '../../domain/RefreshTokenMapper';
import { RefreshTokenCreateRequest } from '../../entities/refresh-token/dtos/RefreshTokenCreateRequest';
import { IRefreshToken } from '../../entities/refresh-token/IRefreshToken';
import { RefreshTokenFilter } from '../../shared/filters/RefreshTokenFilter';
import { IRefreshTokensRepository } from './IRefreshTokensRepository';

export class PrismaRefreshTokensRepository implements IRefreshTokensRepository {

  async listByProperties({ refreshTokenId, userId }: RefreshTokenFilter): Promise<IRefreshToken> {
    const refreshToken = await prisma.refreshToken.findFirst({
      where: { userId, id: refreshTokenId },
    });

    if(!refreshToken) {
      return null;
    }

    return refreshTokenMapper.toDomain(refreshToken);
  }

  async create({ expiresIn, userId }: RefreshTokenCreateRequest): Promise<IRefreshToken> {
    const refreshToken = await prisma.refreshToken.create({
      data: { expiresIn, userId },
    });

    return refreshTokenMapper.toDomain(refreshToken);
  }

  async delete(refreshToken: string): Promise<void> {
    await prisma.refreshToken.delete({ where: { id: refreshToken } });
  }

}
