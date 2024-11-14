import { User } from './User';
import { Product } from './Product';

export class Order {
  id: number = 0;
  user: User | null = null;
  product: Product | null = null;
  quantity: number = 0;
  totalPrice: number = 0.0;
}

export class OrderDto {
  id: number = 0;
  userId: number | null = null;
  productId: number | null = null;
  quantity: number = 0;
  totalPrice: number = 0.0;
}
