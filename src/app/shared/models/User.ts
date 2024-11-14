import { Order } from "./Order";

export class User {
  id: number = 0;
  nombre: string = '';
  username: string = '';
  password: string = '';
  role: { id: number } = { id: 0 };
  orders: Order[] = [];

}

export class UserDTO {
  id: number = 0;
  nombre: string = '';
  username: string = '';
  password: string = '';
  role: { id: number } = { id: 0 };
  orders: Order[] = [];
  discountUser :number = 0;
  isFrequentCustomer: boolean = false; // Usa "boolean" en lugar de "Boolean"
}

export class UserUpdateDTO {
  nombre: string = '';
  username: string = '';
}
