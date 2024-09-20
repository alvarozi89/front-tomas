import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { User } from '../../shared/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.url

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}auth/login`, credentials);

  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}users/create`, user);
  }

  isAuthenticated(): boolean {

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return !!token; // Retorna true si el token está presente, de lo contrario false
  }



  getAllUsers2(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}users/getAll`);
  }

  getAllUsers(){
    return this.http.get<any>(`${this.apiUrl}users/getAll`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }




  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}users/getName?keyword=${query}`);
  }

  getUserName(): string | null {
    return localStorage.getItem('username');  // Retorna el nombre del usuario
  }

  getToken(): string | null {
    return localStorage.getItem('token');  // Ajusta el nombre del ítem según tu implementación
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');  // Eliminamos también el nombre del usuario
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}users/user/delete/${id}`);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}users/user/update/${id}`, user);

  }

}
