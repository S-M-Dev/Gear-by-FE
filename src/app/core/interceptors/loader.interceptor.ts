import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoadingSpinnerService } from './../services/loading-spinner.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loadingSpinnerService: LoadingSpinnerService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingSpinnerService.setLoadingState(true);

    return next.handle(req)
      .pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.loadingSpinnerService.setLoadingState(false);
            }
          },
          () => {
            this.loadingSpinnerService.setLoadingState(false);
          }
        )
      );
  }
}
