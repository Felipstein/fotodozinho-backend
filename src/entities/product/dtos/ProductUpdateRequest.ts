export interface ProductUpdateRequest {
  name?: string;
  description?: string | null;
  rated?: number;
  price?: number;
  imageName?: string;
  imageUrl?: string;
  key?: string;
  categoryId?: string;
}
