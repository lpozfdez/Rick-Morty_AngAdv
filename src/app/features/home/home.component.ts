import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/shared/services/roleServices/role.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  selectedRole$: Observable<'admin' | 'guest' | null>;

  constructor(private roleService: RoleService) {
    this.selectedRole$ = this.roleService.role$;
  }

  selectRole(role: 'admin' | 'guest'): void {
    this.roleService.setRole(role);

  }
}
