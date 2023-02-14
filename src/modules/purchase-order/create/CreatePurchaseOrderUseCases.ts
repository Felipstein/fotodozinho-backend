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

export class CreatePurchaseOrderUseCases {

  constructor(
    private purchaseOrdersRepository: IPurchaseOrdersRepository,
    private paymentMethodsRepository: IPaymentMethodsRepository,
    private usersRepository: IUsersRepository,
    private productsRepository: IProductsRepository,
  ) { }

  async execute({ paymentMethodId, products, userId }: Omit<PurchaseOrderCreateRequest, 'number'>): Promise<IPurchaseOrder> {
    if(ValidateService.someIsNullOrUndefined(paymentMethodId, products, userId)) {
      throw new RequiredFieldsError('Método de pagamento', 'Produtos', 'Usuário');
    }

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

    const userExists = await this.usersRepository.listById(userId);
    if(!userExists) {
      throw new UserNotFoundError();
    }

    const purchaseOrder = await this.purchaseOrdersRepository.create({
      number: 32, paymentMethodId, products: validProducts, userId,
    });

    return purchaseOrder;
  }

}
