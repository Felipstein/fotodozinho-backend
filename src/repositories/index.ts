import { PrismaUserRepository } from './prisma/PrismaUserRepository';

const currentUserRepository = new PrismaUserRepository();

export { currentUserRepository };
