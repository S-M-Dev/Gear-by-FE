import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(
      !req.url.match(/assets/)
        ? req.clone({
          url: `${environment.apiUrl}/${req.url}`
        })
        : req
    );
  }
}
