export interface CartItem {
  partId: number;
  amount: number;
}

export interface OrderPayload {
  orderPositions: CartItem[],
  deliveryDate: string
}
