export interface PrintCreateRequest {
  imageName: string;
  imageUrl: string;
  key: string;
  printPriceId: string;
  border: boolean;
  colorId: string;
  quantity: number;
  printOrderId: string;
}
