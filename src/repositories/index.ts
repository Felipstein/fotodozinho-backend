import { PrismaPrintPricesRepository } from './print-prices/PrismaPrintPricesRepository';
import { PrismaUsersRepository } from './users/PrismaUsersRepository';

const currentUsersRepository = new PrismaUsersRepository();
const currentPrintPricesRepository = new PrismaPrintPricesRepository();

export { currentUsersRepository, currentPrintPricesRepository };
