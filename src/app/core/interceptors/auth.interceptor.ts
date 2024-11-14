import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      console.log('Token obtenido:', token);

      if (token) {
        authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error en la solicitud:', error);

        if (error.status === 401 || error.status === 403) {
          console.error('Error de autenticación, redirigir a login u otro manejo');

        }

        return throwError(error);
      })
    );
  }
}
