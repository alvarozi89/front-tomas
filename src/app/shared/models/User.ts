import { Order } from "./Order";

export class User {
  id: number = 0;
  nombre: string = '';
  username: string = '';
  password: string = '';
  role: { id: number } = { id: 0 };
  orders: Order[] = [];
}
