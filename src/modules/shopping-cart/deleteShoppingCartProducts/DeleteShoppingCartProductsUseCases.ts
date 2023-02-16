import { BadRequestError } from '../../../errors/BadRequestError';
import { ForbiddenError } from '../../../errors/ForbiddenError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { UnauthorizedError } from '../../../errors/UnauthorizedError';
import { IShoppingCartsRepository } from '../../../repositories/shopping-carts/IShoppingCartsRepository';

export class DeleteShoppingCartProductsUseCases {

  constructor(
    private shoppingCartsRepository: IShoppingCartsRepository,
  ) { }

  async execute(userId: string, requestingUserId: string, productsId?: string[]): Promise<void> {
    if(!requestingUserId) {
      throw new UnauthorizedError();
    }

    if(!userId) {
      throw new RequiredFieldsError('Usuário');
    }

    if(requestingUserId !== userId) {
      throw new ForbiddenError();
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
