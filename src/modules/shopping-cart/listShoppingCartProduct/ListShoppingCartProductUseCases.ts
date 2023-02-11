import { IShoppingCartProduct } from '../../../entities/shopping-cart-product/IShoppingCartProduct';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { ShoppingCartNotFoundError } from '../../../errors/ShoppingCartNotFoundError';
import { IShoppingCartsRepository } from '../../../repositories/shopping-carts/IShoppingCartsRepository';
import { someIsNullOrUndefined } from '../../../utils/Validate';

export class ListShoppingCartProductUseCases {

  constructor(
    private shoppingCartsRepository: IShoppingCartsRepository,
  ) { }

  async execute(userId: string, productId: string): Promise<IShoppingCartProduct> {
    if(!someIsNullOrUndefined(userId, productId)) {
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
