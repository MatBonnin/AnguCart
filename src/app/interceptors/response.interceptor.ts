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
export class ResponseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("retour")
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
          return throwError(error);
        })
      );
  }
}
