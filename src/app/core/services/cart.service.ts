import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PartItem } from '../../catalog/models/parts.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: PartItem[];
  private cartUpdated$: BehaviorSubject<PartItem[]>;

  constructor() {
    const localStorageEntry = localStorage.getItem('cart');
    this.items = localStorageEntry ? JSON.parse(localStorageEntry) : [];
    this.cartUpdated$ = new BehaviorSubject(this.items);
  }

  public addToCart(item: PartItem) {
    this.items = [...this.items, item];
    this.handleCartChange();
  }

  public removeFromCart(item: PartItem) {
    this.items = this.items.filter(cartItem => cartItem.id !== item.id);
    this.handleCartChange();
  }

  public clearCart() {
    this.items = [];
    this.handleCartChange();
  }

  public getCartUpdates() {
    return this.cartUpdated$.asObservable();
  }

  public isInCart(item: PartItem) {
    return this.items.some(cartItem => cartItem.id === item.id);
  }

  private handleCartChange() {
    this.setToLocalStorage();
    this.notifyCartChange();
  }

  private setToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  private notifyCartChange() {
    this.cartUpdated$.next(this.items);
  }
}
