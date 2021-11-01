import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserRole } from '../models/user.model';
import { UserInfoService } from '../services/user-info.service';

@Injectable({
  providedIn: 'root'
})
export class HasAdminPermissionsGuard implements CanActivate {

  constructor(private userInfoService: UserInfoService) { }

  canActivate() {
    return this.userInfoService.getUserInfo().pipe(
      map((user) => user.role === UserRole.Admin)
    )
  }
}
