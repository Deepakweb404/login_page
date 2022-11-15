import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
declare const $: any;

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private totalRequests = 0;
  Errorstatus = true;
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.totalRequests++;
    $('#loader').show();

    const reqWithAuth = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return next.handle(reqWithAuth).pipe(
      // retry function for retry api automatically
      // retry(1),
      finalize(() => {
        // all reuest hit then spiiner hide..
        this.totalRequests--;
        if (this.totalRequests === 0) {
          $('#loader').hide();
        }
      }),

      catchError((error: HttpErrorResponse) => {
        if (error.error) {
          console.log('error.error.message', error.error.message);
        } else {
        }
        return throwError(error);
      })
    );
  }
}
