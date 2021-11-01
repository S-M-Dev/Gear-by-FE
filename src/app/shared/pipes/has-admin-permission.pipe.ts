import { Pipe, PipeTransform } from '@angular/core';
import { User, UserRole } from 'src/app/core/models/user.model';

@Pipe({
  name: 'hasAdminPermission'
})
export class HasAdminPermissionPipe implements PipeTransform {
  transform(user: User | null): unknown {
    return user?.role === UserRole.Admin;
  }

}
