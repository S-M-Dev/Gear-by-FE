import { User } from 'src/app/core/models/user.model';

export interface CartItem {
  partId: number;
  amount: number;
}

export interface OrderPayload {
  orderPositions: CartItem[];
  deliveryDate: string;
}

export interface Order {
  orderId: number;
  summary: number;
  createDate: string;
  deliveryDate: string;
  owner: User;
  positions: CartItem[];
}
