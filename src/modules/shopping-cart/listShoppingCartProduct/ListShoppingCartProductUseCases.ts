import { IShoppingCartProduct } from '../../../entities/shopping-cart-product/IShoppingCartProduct';
import { ForbiddenError } from '../../../errors/ForbiddenError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { ShoppingCartNotFoundError } from '../../../errors/ShoppingCartNotFoundError';
import { UnauthorizedError } from '../../../errors/UnauthorizedError';
import { IShoppingCartsRepository } from '../../../repositories/shopping-carts/IShoppingCartsRepository';
import { ValidateService } from '../../../services/validate';

export class ListShoppingCartProductUseCases {

  constructor(
    private shoppingCartsRepository: IShoppingCartsRepository,
  ) { }

  async execute(userId: string, productId: string, requestingUserId: string): Promise<IShoppingCartProduct> {
    if(!requestingUserId) {
      throw new UnauthorizedError();
    }

    if(ValidateService.someIsNullOrUndefined(userId, productId)) {
      throw new RequiredFieldsError('Usuário', 'Produto');
    }

    if(requestingUserId !== userId) {
      throw new ForbiddenError();
    }

    const shopppingCart = await this.shoppingCartsRepository.listByUserId(userId);
    if(!shopppingCart) {
      throw new ShoppingCartNotFoundError();
    }

    const product = await this.shoppingCartsRepository.listShoppingCartProduct(userId, productId);

    return product;
  }

}
