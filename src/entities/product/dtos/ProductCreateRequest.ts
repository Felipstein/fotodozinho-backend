export interface ProductCreateRequest {
  name: string;
  description?: string;
  price: number;
  imageName: string;
  imageUrl: string;
  key: string;
  categoryId: string;
}
