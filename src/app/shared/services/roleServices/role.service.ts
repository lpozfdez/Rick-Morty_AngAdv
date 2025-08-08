import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleService {

  private roleSubject = new BehaviorSubject<'admin' | 'guest' | null>(null);
  role$ = this.roleSubject.asObservable();

  constructor( private authSrv: AuthService ){}

  setRole(role: 'admin' | 'guest') {
    this.authSrv.setRole(role);
    this.roleSubject.next(role);
  }

  clearRole() {
    this.authSrv.setRole('guest');
    this.roleSubject.next(null);
  }

  getCurrentRole(): 'admin' | 'guest' | null {
    return this.roleSubject.value;
  }

}
