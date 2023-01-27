import { PrismaUsersRepository } from './prisma/PrismaUsersRepository';

const currentUserRepository = new PrismaUsersRepository();

export { currentUserRepository };
