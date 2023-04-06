import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérez votre token JWT ici, par exemple depuis le stockage local
    // ou un service de gestion d'authentification.
    const token = localStorage.getItem('token');
    console.log("depart")
    if (token) {
      // Clone la requête et ajoute le token dans l'en-tête "Authorization"
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(clonedRequest)
        .pipe(
          tap(event => {
            if (event instanceof HttpResponse) {
              console.log('Response data:', event.body);
            }
          }),
          catchError(error => {
            // Handle errors as before
            return throwError(error);
          })
        );
    } else {
      return next.handle(request)
        .pipe(
          tap(event => {
            if (event instanceof HttpResponse) {
              console.log('Response data:', event.body);
            }
          }),
          catchError(error => {
            // Handle errors as before
            return throwError(error);
          })
        );
    }
  }
}
