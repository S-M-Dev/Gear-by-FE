import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

import { GlobalErrorHandlerService } from './../services/global-error-handler.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private globalErrorHandlerService: GlobalErrorHandlerService) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(
      !req.url.match(/assets/)
        ? req.clone({
          url: `${environment.apiUrl}/${req.url}`
        })
        : req
    ).pipe(
      catchError((error) => {
        this.globalErrorHandlerService.handleError(error);

        return throwError(error);
      })
    );
  }
}
