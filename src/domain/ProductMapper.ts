import { Product, ProductCategory } from '@prisma/client';
import { IProduct } from '../entities/product/IProduct';

type ProductDomain = IProduct;
type ProductPersistence = Product & { category: ProductCategory } ;

class ProductMapper {

  toDomain(productPersistence: ProductPersistence): ProductDomain {
    return {
      id: productPersistence.id,
      name: productPersistence.name,
      description: productPersistence.description,
      price: Number(productPersistence.price),
      rated: Number(productPersistence.rated),
      category: productPersistence.category,
    };
  }

}

const productMapper = new ProductMapper();

export { productMapper };
