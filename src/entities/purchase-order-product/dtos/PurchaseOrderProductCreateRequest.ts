export interface PurchaseOrderProductCreateRequest {
  productId: string;
  purchaseOrderId: string;
  quantity?: number;
}
