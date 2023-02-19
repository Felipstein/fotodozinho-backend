import { prisma } from '../../database';
import { refreshTokenMapper } from '../../domain/RefreshTokenMapper';
import { RefreshTokenCreateRequest } from '../../entities/refresh-token/dtos/RefreshTokenCreateRequest';
import { RefreshTokenUpdateRequest } from '../../entities/refresh-token/dtos/RefreshTokenUpdateRequest';
import { IRefreshToken } from '../../entities/refresh-token/IRefreshToken';
import { RefreshTokenFilterProperties } from '../../shared/RefreshTokenFilterProperties';
import { IRefreshTokensRepository } from './IRefreshTokensRepository';

export class PrismaRefreshTokensRepository implements IRefreshTokensRepository {

  async listByProperties({ refreshTokenId, userId }: RefreshTokenFilterProperties): Promise<IRefreshToken> {
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

  async updateExpiresIn(userId: string, { expiresIn }: RefreshTokenUpdateRequest): Promise<IRefreshToken> {
    const refreshToken = await prisma.refreshToken.update({
      where: { userId },
      data: { expiresIn },
    });

    return refreshTokenMapper.toDomain(refreshToken);
  }

  async delete(userId: string): Promise<void> {
    await prisma.refreshToken.delete({ where: { userId } });
  }

}
