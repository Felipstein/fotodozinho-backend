import { isNumber } from 'lodash';
import { IShoppingCartProduct } from '../../../entities/shopping-cart-product/IShoppingCartProduct';
import { ShoppingCartProductCreateRequest } from '../../../entities/shopping-cart-product/dtos/ShoppingCartProductCreateRequest';
import { NumberValidationError } from '../../../errors/NumberValidationError';
import { ProductNotFoundError } from '../../../errors/ProductNotFoundError';
import { RequiredFieldsError } from '../../../errors/RequiredFieldsError';
import { ShoppingCartNotFoundError } from '../../../errors/ShoppingCartNotFoundError';
import { IProductsRepository } from '../../../repositories/product/IProductsRepository';
import { IShoppingCartsRepository } from '../../../repositories/shopping-carts/IShoppingCartsRepository';
import { ValidateService } from '../../../services/Validate';

export class AddShoppingCartProductUseCases {

  constructor(
    private shoppingCartsRepository: IShoppingCartsRepository,
    private productsRepository: IProductsRepository,
  ) { }

  async execute(userId: string, { productId, quantity }: ShoppingCartProductCreateRequest): Promise<IShoppingCartProduct> {
    if(ValidateService.someIsNullOrUndefined(userId, productId)) {
      throw new RequiredFieldsError('Usuário', 'Produto');
    }

    if(quantity && isNaN(quantity)) {
      throw new NumberValidationError('Quantidade');
    }

    const shoppingCart = await this.shoppingCartsRepository.listByUserId(userId);
    if(!shoppingCart) {
      throw new ShoppingCartNotFoundError();
    }

    const productExist = await this.productsRepository.listById(productId);
    if(!productExist) {
      throw new ProductNotFoundError();
    }

    let product = await this.shoppingCartsRepository.listShoppingCartProduct(userId, productId);
    if(!product) {
      product = await this.shoppingCartsRepository.addProduct(userId, productId);
    } else {
      const newQuantity = product.quantity + (isNumber(quantity) ? quantity : 1);

      product = await this.shoppingCartsRepository.updateProduct(userId, productId, { quantity: newQuantity });
    }

    return product;
  }

}
