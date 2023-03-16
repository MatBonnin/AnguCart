import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpErrorResponse, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            // Handle HTTP errors
            console.error('HTTP error:', error);

              // Display an error message to the user
              alert('Une erreur est survenu : ' + error.message);

          } else {
            // Handle other errors
            console.error('Other error:', error);
            alert('Other error: '+error.message);
          }

          return throwError(error);
        })
      );
  }
}
