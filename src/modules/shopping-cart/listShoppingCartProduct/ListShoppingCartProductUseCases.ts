import { IShoppingCartProduct } from '../../../entities/shopping-cart-product/IShoppingCartProduct';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { ShoppingCartNotFoundError } from '../../../errors/ShoppingCartNotFoundError';
import { IShoppingCartsRepository } from '../../../repositories/shopping-carts/IShoppingCartsRepository';
import { ValidateService } from '../../../services/validate';
import { verifyUserAuth } from '../../../services/verify-user-auth';

export class ListShoppingCartProductUseCases {

  constructor(
    private shoppingCartsRepository: IShoppingCartsRepository,
  ) { }

  async execute(userId: string, productId: string, requestingUserId: string): Promise<IShoppingCartProduct> {
    await verifyUserAuth.ensureSelfAction({ id: requestingUserId }, userId);

    if(ValidateService.someIsNullOrUndefined(userId, productId)) {
      throw new RequiredFieldsError('Usuário', 'Produto');
    }

    const shopppingCart = await this.shoppingCartsRepository.listByUserId(userId);
    if(!shopppingCart) {
      throw new ShoppingCartNotFoundError();
    }

    const product = await this.shoppingCartsRepository.listShoppingCartProduct(userId, productId);

    return product;
  }

}
