import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PartItem } from '../../models/parts.model';

@Component({
  selector: 'gear-by-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() item: PartItem;
  @Input() formGroup: FormGroup;
  @Output() removeFromCart = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  increaseCount() {
    const count = this.formGroup.get('amount')?.value;
    this.formGroup.get('amount')?.setValue(count + 1);
  }

  decreaseCount() {
    const count = this.formGroup.get('amount')?.value;

    if (count > 1) {
      this.formGroup.get('amount')?.setValue(count - 1);
    }
  }

  onRemoveFromCart() {
    this.removeFromCart.emit();
  }
}
