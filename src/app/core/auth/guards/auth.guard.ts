// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoleService } from 'src/app/shared/services/roleServices/role.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor( private router: Router, private roleService: RoleService) {}

  canActivate() {

    const role = this.roleService.getCurrentRole();

    if ( role === 'admin' ) return true;

    this.router.navigate(['/page404']);

    return false;

  }
}
