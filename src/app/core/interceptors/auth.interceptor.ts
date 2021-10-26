import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { UserInfoService } from './../services/user-info.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userInfoService: UserInfoService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.userInfoService.getToken();
    let authReq = req;

    if (token) {
      authReq = authReq.clone({
        headers: authReq.headers
          .set('token', token),
      });
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error.status === 403) {
          this.userInfoService.clearUserData();
        }

        return throwError(error);
      })
    );
  }
}
