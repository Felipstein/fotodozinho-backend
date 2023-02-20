import { PrismaColorsRepository } from './colors/PrismaColorsRepository';
import { PrismaFailedImagesUploadedRepository } from './failed-images-uploaded/PrismaFailedImagesUploadedRepository';
import { PrismaNotificationsRepository } from './notifications/PrismaNotificationsRepository';
import { PrismaPasswordRecoveryTokensRepository } from './password-recovery-tokens/PrismaPasswordRecoveryTokensRepository';
import { PrismaPaymentMethodsRepository } from './payment-methods/PrismaPaymentMethodsRepository';
import { PrismaPrintOrderRepository } from './print-orders/PrismaPrintOrderRepository';
import { PrismaPrintPricesRepository } from './print-prices/PrismaPrintPricesRepository';
import { PrismaPrintsRepository } from './prints/PrismaPrintsRepository';
import { PrismaProductCategoriesRepository } from './product-categories/PrismaProductCategoriesRepository';
import { PrismaProductsRepository } from './product/PrismaProductsRepository';
import { PrismaPurchaseOrdersRepository } from './purchase-order/PrismaPurchaseOrdersRepository';
import { PrismaRefreshTokensRepository } from './refresh-tokens/PrismaRefreshTokensRepository';
import { PrismaRevokedTokensRepository } from './revoked-tokens/PrismaRevokedTokensRepository';
import { PrismaShoppingCartsRepository } from './shopping-carts/PrismaShoppingCartsRepository';
import { PrismaSupportRequestRepository } from './support-requests/PrismaSupportRequestRepository';
import { PrismaUsersRepository } from './users/PrismaUsersRepository';
import { PrismaValidatorTokensRepository } from './validator-tokens/PrismaValidatorTokensRepository';

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
const currentPurchaseOrdersRepository = new PrismaPurchaseOrdersRepository();
const currentFailedImagesUploadedRepository = new PrismaFailedImagesUploadedRepository();
const currentRevokedTokensRepository = new PrismaRevokedTokensRepository();
const currentRefreshTokensRepository = new PrismaRefreshTokensRepository();
const currentValidatorTokensRepository = new PrismaValidatorTokensRepository();
const currentPasswordRecoveryTokensRepository = new PrismaPasswordRecoveryTokensRepository();
const supportRequestsRepository = new PrismaSupportRequestRepository();

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
  currentPurchaseOrdersRepository,
  currentFailedImagesUploadedRepository,
  currentRevokedTokensRepository,
  currentRefreshTokensRepository,
  currentValidatorTokensRepository,
  currentPasswordRecoveryTokensRepository,
  supportRequestsRepository,
};
