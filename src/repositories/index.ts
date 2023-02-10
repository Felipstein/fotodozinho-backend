import { PrismaColorsRepository } from './colors/PrismaColorsRepository';
import { PrismaNotificationsRepository } from './notifications/PrismaNotificationsRepository';
import { PrismaPaymentMethodsRepository } from './payment-methods/PrismaPaymentMethodsRepository';
import { PrismaPrintOrderRepository } from './print-orders/PrismaPrintOrderRepository';
import { PrismaPrintPricesRepository } from './print-prices/PrismaPrintPricesRepository';
import { PrismaPrintsRepository } from './prints/PrismaPrintsRepository';
import { PrismaProductCategoriesRepository } from './product-categories/PrismaProductCategoriesRepository';
import { PrismaProductsRepository } from './product/PrismaProductsRepository';
import { PrismaShoppingCartsRepository } from './shopping-carts/PrismaShoppingCartsRepository';
import { PrismaUsersRepository } from './users/PrismaUsersRepository';

const currentUsersRepository = new PrismaUsersRepository();
const currentPrintPricesRepository = new PrismaPrintPricesRepository();
const currentColorsRepository = new PrismaColorsRepository();
const currentNotificationsRepository = new PrismaNotificationsRepository();
const currentPrintOrdersRepository = new PrismaPrintOrderRepository();
const currentPrintsRepository = new PrismaPrintsRepository();
const currentPaymentMethodsRepository = new PrismaPaymentMethodsRepository();
const currentProductCategoriesRepository = new PrismaProductCategoriesRepository();
const currentProductsRepository = new PrismaProductsRepository();
const currentShoppingCartsRepository = new PrismaShoppingCartsRepository();

export {
  currentUsersRepository,
  currentPrintPricesRepository,
  currentColorsRepository,
  currentNotificationsRepository,
  currentPrintOrdersRepository,
  currentPrintsRepository,
  currentPaymentMethodsRepository,
  currentProductCategoriesRepository,
  currentProductsRepository,
  currentShoppingCartsRepository,
};
