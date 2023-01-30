import { PrismaColorsRepository } from './colors/PrismaColorsRepository';
import { PrismaNotificationsRepository } from './notifications/PrismaNotificationsRepository';
import { PrismaPrintOrderRepository } from './print-orders/PrismaPrintOrderRepository';
import { PrismaPrintPricesRepository } from './print-prices/PrismaPrintPricesRepository';
import { PrismaUsersRepository } from './users/PrismaUsersRepository';

const currentUsersRepository = new PrismaUsersRepository();
const currentPrintPricesRepository = new PrismaPrintPricesRepository();
const currentColorsRepository = new PrismaColorsRepository();
const currentNotificationsRepository = new PrismaNotificationsRepository();
const currentPrintOrdersRepository = new PrismaPrintOrderRepository();

export {
  currentUsersRepository,
  currentPrintPricesRepository,
  currentColorsRepository,
  currentNotificationsRepository,
  currentPrintOrdersRepository,
};
