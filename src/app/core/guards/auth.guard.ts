import { UserInfoService } from '../services/user-info.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private userInfoService: UserInfoService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.handleGuard();
  }

  canLoad(): Observable<boolean> {
    return this.handleGuard();
  }

  private handleGuard() {
    return this.userInfoService.getUserInfo().pipe(
      take(1),
      map(user => {
        if (!!user) {
          return true;
        }

        this.router.navigateByUrl('/auth/sign-in');

        return false;
      })
    );
  }

}
