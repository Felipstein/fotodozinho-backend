import { prisma } from '../../database';
import { validatorTokenMapper } from '../../domain/ValidatorTokenMapper';
import { IValidatorToken } from '../../entities/validator-token/IValidatorToken';
import { ValidatorTokenCreateRequest } from '../../entities/validator-token/dtos/ValidatorTokenCreateRequest';
import { IValidatorTokensRepository } from './IValidatorTokensRepository';

export class PrismaValidatorTokensRepository implements IValidatorTokensRepository {

  async listById(id: string): Promise<IValidatorToken> {
    const validatorToken = await prisma.validatorToken.findFirst({ where: { id } });

    if(!validatorToken) {
      return null;
    }

    return validatorTokenMapper.toDomain(validatorToken);
  }

  async listByEmail(email: string): Promise<IValidatorToken> {
    const validatorToken = await prisma.validatorToken.findFirst({ where: { email } });

    if(!validatorToken) {
      return null;
    }

    return validatorTokenMapper.toDomain(validatorToken);
  }

  async create({ expiresIn, email }: ValidatorTokenCreateRequest): Promise<IValidatorToken> {
    const validatorToken = await prisma.validatorToken.create({
      data: { expiresIn, email },
    });

    return validatorTokenMapper.toDomain(validatorToken);
  }

  async delete({ id, email }: { id?: string; email?: string; }): Promise<void> {
    await prisma.validatorToken.delete({
      where: { id, email },
    });
  }

}
