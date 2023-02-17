import { isArray } from 'lodash';
import { IPurchaseOrder } from '../../../entities/purchase-order/IPurchaseOrder';
import { PurchaseOrderCreateRequest } from '../../../entities/purchase-order/dtos/PurchaseOrderCreateRequest';
import { PaymentMethodNotFoundError } from '../../../errors/PaymentMethodNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UserNotFoundError } from '../../../errors/UserNotFoundError';
import { IPaymentMethodsRepository } from '../../../repositories/payment-methods/IPaymentMethodsRepository';
import { IPurchaseOrdersRepository } from '../../../repositories/purchase-order/IPurchaseOrdersRepository';
import { IUsersRepository } from '../../../repositories/users/IUsersRepository';
import { BadRequestError } from '../../../errors/BadRequestError';
import { IProductsRepository } from '../../../repositories/product/IProductsRepository';
import { ValidateService } from '../../../services/validate';
import { verifyUserAuth } from '../../../services/verify-user-auth';

export class CreatePurchaseOrderUseCases {

  constructor(
    private purchaseOrdersRepository: IPurchaseOrdersRepository,
    private paymentMethodsRepository: IPaymentMethodsRepository,
    private usersRepository: IUsersRepository,
    private productsRepository: IProductsRepository,
  ) { }

  async execute({ paymentMethodId, products, userId }: Omit<PurchaseOrderCreateRequest, 'number'>, requestingUserId: string): Promise<IPurchaseOrder> {
    if(ValidateService.someIsNullOrUndefined(paymentMethodId, products, userId)) {
      throw new RequiredFieldsError('Método de pagamento', 'Produtos', 'Usuário');
    }

    await verifyUserAuth.execute({ id: requestingUserId }, userId);

    if(!isArray(products)) {
      throw new BadRequestError('Nenhum produto informado');
    }

    const validProductsIds = (await this.productsRepository.listByIds(products.map(product => product.productId))).map(product => product.id);

    const validProducts = products.filter(product => validProductsIds.includes(product.productId));

    if(validProducts.length === 0) {
      throw new BadRequestError('Nenhum produto informado');
    }

    const paymentMethodExists = await this.paymentMethodsRepository.listById(paymentMethodId);
    if(!paymentMethodExists) {
      throw new PaymentMethodNotFoundError();
    }

    const user = await this.usersRepository.listById(userId);
    if(!user) {
      throw new UserNotFoundError();
    }

    const number = user.totalPurchaseOrders + 1;

    const purchaseOrder = await this.purchaseOrdersRepository.create({
      number, paymentMethodId, products: validProducts, userId,
    });

    await this.usersRepository.update(user.id, { totalPurchaseOrders: number }, false);

    return purchaseOrder;
  }

}
