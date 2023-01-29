import { PrismaColorsRepository } from './colors/PrismaColorsRepository';
import { PrismaPrintPricesRepository } from './print-prices/PrismaPrintPricesRepository';
import { PrismaUsersRepository } from './users/PrismaUsersRepository';

const currentUsersRepository = new PrismaUsersRepository();
const currentPrintPricesRepository = new PrismaPrintPricesRepository();
const currentColorsRepository = new PrismaColorsRepository();

export {
  currentUsersRepository,
  currentPrintPricesRepository,
  currentColorsRepository,
};
