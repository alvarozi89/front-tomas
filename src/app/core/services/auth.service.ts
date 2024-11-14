import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { User, UserUpdateDTO } from '../../shared/models/User';

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

    if (typeof window === 'undefined' || !localStorage) {
      return false;
    }

    const token = localStorage.getItem('token');
    return token !== null && token.trim() !== '';
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
    return localStorage.getItem('username');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}users/user/delete/${id}`);
  }

  updateUser(id: number, user: Partial<UserUpdateDTO>): Observable<UserUpdateDTO> {
    return this.http.put<UserUpdateDTO>(`${this.apiUrl}users/user/update/${id}`, user);

  }

}
