import { Product, ProductCategory } from '@prisma/client';
import { IProduct, convertStorageTypeFormat } from '../entities/product/IProduct';

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
      imageName: productPersistence.imageName,
      imageUrl: productPersistence.imageUrl,
      key: productPersistence.key,
      category: productPersistence.category,
      imageStoragedType: convertStorageTypeFormat(productPersistence.imageStoragedType),
    };
  }

}

const productMapper = new ProductMapper();

export { productMapper };
