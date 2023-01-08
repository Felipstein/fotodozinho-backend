import { PrismaUserRepository } from './prisma/PrismaUserRepository';

const currentRepository = new PrismaUserRepository();

export { currentRepository };
