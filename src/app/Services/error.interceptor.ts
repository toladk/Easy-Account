import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private notification: NzNotificationService

  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  handleError(error: HttpErrorResponse) {
    console.log(JSON.stringify(error));
    if (error.status === 401) {
      this.tokenService.remove();
      this.notification.error( 'Session as Expired', 'Please login again!!' );
    }
    return throwError(error);
  }
}

export const UseErrorInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
