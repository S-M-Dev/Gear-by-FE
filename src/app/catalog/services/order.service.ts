import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order, OrderPayload } from '../models/cart.model';

@Injectable()
export class OrderService {
  private readonly apiUrl = 'order';

  constructor(private http: HttpClient) { }

  submitOrder(order: OrderPayload): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }
}
