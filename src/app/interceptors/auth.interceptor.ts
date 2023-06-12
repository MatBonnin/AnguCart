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
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `${token}`
        }

      });

      return next.handle(clonedRequest)
        .pipe(
          tap(event => {
            if (event instanceof HttpResponse) {
              console.log(event)
            }
          }),
          catchError(error => {
            // Handle errors as before
            console.log("erreur 1")
            if (error.statusText === "Unauthorized"){
              localStorage.removeItem('token');
              this.router.navigate(['/login']);

            }
            return throwError(error);
          })
        );
    } else {
      return next.handle(request)
        .pipe(
          tap(event => {
            if (event instanceof HttpResponse) {
              if (event.body?.token){
                localStorage.setItem('token', event.body.token);
              }
            }
          }),
          catchError(error => {
            // Handle errors as before
            console.log("erreur 2")
            return throwError(error);
          })
        );
    }
  }
}
