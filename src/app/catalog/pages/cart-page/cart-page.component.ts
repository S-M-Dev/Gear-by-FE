import { UserInfoService } from './../../../core/services/user-info.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from './../../../core/services/cart.service';
import { PartItem } from '../../models/parts.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  mobileQuery: MediaQueryList;

  private unsubscribeValueChanges$ = new Subject();
  private cartItems: PartItem[];
  private _mobileQueryListener: () => void;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private userInfoService: UserInfoService,
    private fb: FormBuilder,
    private router: Router,
    private snackbar: MatSnackBar,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 1500px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

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
    this.userInfoService.getUserInfo().pipe(
      take(1),
      filter((user) => {
        if (!user?.address) {
          this.snackbar.open('Пожалуйста заполните адрес в профиле', 'Закрыть', { duration: 3000 });
        }

        return !!user?.address
      }),
      switchMap(() => this.orderService.submitOrder(this.cartForm.value))
    ).subscribe((order) => {
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
