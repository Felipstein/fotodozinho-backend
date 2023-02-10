import { IShoppingCartProduct } from '../../../entities/shopping-cart-product/IShoppingCartProduct';
import { IShoppingCartsRepository } from '../../../repositories/shopping-carts/IShoppingCartsRepository';

export class ListShoppingCartProductUseCases {

  constructor(
    private shoppingCartsRepository: IShoppingCartsRepository,
  ) { }

  async execute(): Promise<IShoppingCartProduct[]> {

  }

}
