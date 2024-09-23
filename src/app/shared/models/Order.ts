import { User } from './User';
import { Product } from './Product';

export class Order {
  id: number = 0;
  user: User | null = null; // Relación con User, inicializado como null
  product: Product | null = null; // Relación con Product, inicializado como null
  quantity: number = 0;
  totalPrice: number = 0.0;
}

export class OrderDto {
  id: number = 0;
  userId: number | null = null; // ID del usuario, inicializado como null
  productId: number | null = null; // ID del producto, inicializado como null
  quantity: number = 0;
  totalPrice: number = 0.0;
}
