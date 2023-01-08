import { MockPrismaUserRepository } from './prisma/MockPrismaUserRepository';
import { PrismaUserRepository } from './prisma/PrismaUserRepository';

const currentRepository = new PrismaUserRepository();
const testRepository = new MockPrismaUserRepository();

export { currentRepository, testRepository };
