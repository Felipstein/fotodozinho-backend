import { prisma } from '../../database';
import { revokedTokenMapper } from '../../domain/RevokedTokenMapper';
import { IRevokedToken } from '../../entities/revoked-token/IRevokedToken';
import { RevokedTokenCreateOrUpdatedRequest } from '../../entities/revoked-token/dtos/RevokedTokenCreateOrUpdateRequest';
import { IRevokedTokensRepository } from './IRevokedTokensRepository';

export class PrismaRevokedTokensRepository implements IRevokedTokensRepository {

  async listByToken(token: string): Promise<IRevokedToken> {
    const revokedToken = await prisma.revokedTokens.findFirst({ where: { token } });

    if(!revokedToken) {
      return null;
    }

    return revokedTokenMapper.toDomain(revokedToken);
  }

  async createOrUpdate({ token, expiresIn }: RevokedTokenCreateOrUpdatedRequest): Promise<IRevokedToken> {
    const exists = await prisma.revokedTokens.findFirst({ where: { token } });
    if(exists) {
      const revokedToken = await prisma.revokedTokens.update({
        where: { token },
        data: { expiresIn },
      });

      return revokedTokenMapper.toDomain(revokedToken);
    }

    const revokedToken = await prisma.revokedTokens.create({
      data: { token, expiresIn },
    });

    return revokedTokenMapper.toDomain(revokedToken);
  }

  async delete(token: string): Promise<void> {
    await prisma.revokedTokens.delete({ where: { token } });
  }

  async deleteExpiredTokens(): Promise<void> {
    await prisma.revokedTokens.deleteMany({
      where: {
        expiresIn: {
          lt: Date.now(),
        }
      }
    });
  }

}
