import { Injectable } from '@angular/core';
import { User } from '../auth/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private role: 'admin' | 'guest' = 'guest';

  constructor() {

    const savedRole = localStorage.getItem('userRole');

    if (savedRole === 'admin' || savedRole === 'guest') {
      this.role = savedRole;
    }

   }

  setRole(role: 'admin' | 'guest') {
    this.role = role;
    localStorage.setItem('userRole', role);
  }

  getRole(): 'admin' | 'guest' {
    return this.role;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  isGuest(): boolean {
    return this.role === 'guest';
  }

}
