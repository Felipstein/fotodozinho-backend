import { MockUserRepository } from './mock/MockUserRepository';
import { PrismaUserRepository } from './prisma/PrismaUserRepository';

const currentRepository = new PrismaUserRepository();
const testRepository = new MockUserRepository();

export { currentRepository, testRepository };
