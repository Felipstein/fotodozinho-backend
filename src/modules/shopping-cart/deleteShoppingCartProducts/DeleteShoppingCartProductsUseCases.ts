import { BadRequestError } from '../../../errors/BadRequestError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { IShoppingCartsRepository } from '../../../repositories/shopping-carts/IShoppingCartsRepository';

export class DeleteShoppingCartProductsUseCases {

  constructor(
    private shoppingCartsRepository: IShoppingCartsRepository,
  ) { }

  async execute(userId: string, productsId?: string[]): Promise<void> {
    if(!userId) {
      throw new RequiredFieldsError('Usuário');
    }

    if(!productsId) {
      await this.shoppingCartsRepository.removeAllProducts(userId);

      return;
    }

    if(productsId.length === 0) {
      throw new BadRequestError('Nenhum produto foi deletado');
    }

    await this.shoppingCartsRepository.removeProducts(userId, productsId);
  }

}
