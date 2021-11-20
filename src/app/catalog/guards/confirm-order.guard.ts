import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfirmOrderGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const navigation = this.router.getCurrentNavigation();
    const hasPendingOrder = !!navigation?.extras?.state?.order;

    if (!hasPendingOrder) {
      this.router.navigateByUrl('/');
    }

    return hasPendingOrder;
  }

}
