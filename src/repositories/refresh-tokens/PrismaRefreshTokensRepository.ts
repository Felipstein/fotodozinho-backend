import { prisma } from '../../database';
import { refreshTokenMapper } from '../../domain/RefreshTokenMapper';
import { RefreshTokenCreateRequest } from '../../entities/refresh-token/dtos/RefreshTokenCreateRequest';
import { IRefreshToken } from '../../entities/refresh-token/IRefreshToken';
import { IRefreshTokensRepository } from './IRefreshTokensRepository';

export class PrismaRefreshTokensRepository implements IRefreshTokensRepository {

  async create({ expiresIn, userId }: RefreshTokenCreateRequest): Promise<IRefreshToken> {
    const refreshToken = await prisma.refreshToken.create({
      data: { expiresIn, userId },
    });

    return refreshTokenMapper.toDomain(refreshToken);
  }

  async delete(id: string): Promise<void> {
    await prisma.refreshToken.delete({ where: { id } });
  }

}
