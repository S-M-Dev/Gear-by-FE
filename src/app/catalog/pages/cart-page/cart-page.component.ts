import { Observable, Subject, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CartService } from './../../../core/services/cart.service';
import { PartItem } from '../../models/parts.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gear-by-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  cartItems$: Observable<PartItem[]>;
  cartForm: FormGroup;

  totalPrice = 0;
  totalAmount = 0;

  private unsubscribeValueChanges$ = new Subject();
  private cartItems: PartItem[];

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartForm = this.fb.group({
      deliveryDate: ['', Validators.required],
    });
    this.cartItems$ = this.cartService.getCartUpdates().pipe(
      tap((cartItems) => {
        this.cartItems = cartItems;
        this.unsubscribeValueChanges$.next();

        this.cartForm.setControl('orderPositions', this.fb.array([]));

        this.totalAmount = 0;
        this.totalPrice = 0;

        cartItems.forEach((item) => {
          (this.cartForm.get('orderPositions') as FormArray).push(
            this.createFormGroup(item)
          );

          this.totalPrice += item.price;
          this.totalAmount++;
        });

        this.cartForm
          .get('orderPositions')
          ?.valueChanges.pipe(
            takeUntil(this.unsubscribeValueChanges$),
            tap(() => {
              this.totalAmount = 0;
              this.totalPrice = 0;
            })
          )
          .subscribe(() => {
            this.cartForm
              ?.get('orderPositions')
              ?.value.forEach((position: { amount: number }, index: number) => {
                this.totalPrice += cartItems[index].price * position.amount;
                this.totalAmount += position.amount;
              });
          });
      })
    );
  }

  removeFromCart(item: PartItem) {
    this.cartService.removeFromCart(item);
  }

  submitOrder() {
    this.orderService.submitOrder(this.cartForm.value).subscribe((order) => {
      this.router.navigate(['/catalog/confirm-order'], { state: { order, cart: this.cartItems } });
      this.cartService.clearCart();
    });
  }

  private createFormGroup(item: PartItem) {
    return this.fb.group({
      partId: item.id,
      amount: 1,
    });
  }
}
