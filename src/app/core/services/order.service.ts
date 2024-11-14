import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order, OrderDto } from '../../shared/models/Order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  createOrder(order: OrderDto): Observable<OrderDto> {
    return this.http.post<OrderDto>(`${this.apiUrl}orders/create`, order);
  }
  getOrdersTop(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}orders/top-customers`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}orders/getAll`);
  }

}

