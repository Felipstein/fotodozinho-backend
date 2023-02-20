import { prisma } from '../../database';
import { passwordRecoveryTokenMapper } from '../../domain/PasswordRecoveryTokenMapper';
import { IPasswordRecoveryToken } from '../../entities/password-recovery-token/IPasswordRecoveryToken';
import { PasswordRecoveryTokenCreateRequest } from '../../entities/password-recovery-token/dtos/PasswordRecoveryTokenCreateRequest';
import { PasswordRecoveryTokenFilter } from '../../shared/filters/PasswordRecoveryTokenFilter';
import { IPasswordRecoveryTokensRepository } from './IPasswordRecoveryTokensRepository';

export class PrismaPasswordRecoveryTokensRepository implements IPasswordRecoveryTokensRepository {

  async listBy({ id, userId }: PasswordRecoveryTokenFilter): Promise<IPasswordRecoveryToken> {
    const passwordRecoveryToken = await prisma.passwordRecoveryToken.findFirst({
      where: { id, userId },
    });

    if(!passwordRecoveryToken) {
      return null;
    }

    return passwordRecoveryTokenMapper.toDomain(passwordRecoveryToken);
  }

  async create({ expiresIn, userId }: PasswordRecoveryTokenCreateRequest): Promise<IPasswordRecoveryToken> {
    const passwordRecoveryToken = await prisma.passwordRecoveryToken.create({
      data: { expiresIn, userId },
    });

    return passwordRecoveryTokenMapper.toDomain(passwordRecoveryToken);
  }

  async delete({ id, userId }: PasswordRecoveryTokenFilter): Promise<void> {
    await prisma.passwordRecoveryToken.delete({
      where: { id, userId },
    });
  }

  async deleteExpiredTokens(): Promise<void> {
    await prisma.passwordRecoveryToken.deleteMany({
      where: {
        expiresIn: {
          lt: Date.now(),
        }
      }
    });
  }

}
