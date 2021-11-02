import { Pipe, PipeTransform } from '@angular/core';
import { PartItem } from '../models/parts.model';
import { CartService } from '../../core/services/cart.service';

@Pipe({
  name: 'isInCart',
  pure: false
})
export class IsInCartPipe implements PipeTransform {

  constructor(private cartService: CartService) {}

  transform(value: PartItem): unknown {
    return this.cartService.isInCart(value);
  }

}
