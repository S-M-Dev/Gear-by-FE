import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Order } from '../../models/cart.model';
import { PartItem } from '../../models/parts.model';

@Component({
  selector: 'gear-by-confirm-order-page',
  templateUrl: './confirm-order-page.component.html',
  styleUrls: ['./confirm-order-page.component.scss']
})
export class ConfirmOrderPageComponent {
  order: Order;
  cartItems: PartItem[];

  constructor(private router: Router) {
    const { state } = (this.router.getCurrentNavigation()?.extras as NavigationExtras);
    this.order = state?.order;
    this.cartItems = state?.cart;
  }

  getPrice(item: PartItem): number {
    const orderEntry = this.order.positions.find((position) => position.partId === item.id);
    return item.price * (orderEntry?.amount as number);
  }

}
