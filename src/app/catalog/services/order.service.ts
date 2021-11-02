import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderPayload } from '../models/cart.model';

@Injectable()
export class OrderService {
  private readonly apiUrl = 'order';

  constructor(private http: HttpClient) { }

  submitOrder(order: OrderPayload) {
    return this.http.post(this.apiUrl, order);
  }
}
