import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { Product } from '../../shared/models/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.url}products`;

  constructor(private http: HttpClient) { }

  register(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/create`, product);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/getAll`);
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/searchByKeyword?keyword=${query}`);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/update/${product.id}`, product);

  }

  getTop5Products(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/top-selling
`);
  }

  getProductActive(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/active`);
  }


}
