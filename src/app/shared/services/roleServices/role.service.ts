import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RoleService {

  private roleSubject = new BehaviorSubject<'admin' | 'guest' | null>(null);
  role$ = this.roleSubject.asObservable();

  setRole(role: 'admin' | 'guest') {
    this.roleSubject.next(role);
  }

  clearRole() {
    this.roleSubject.next(null);
  }
}
