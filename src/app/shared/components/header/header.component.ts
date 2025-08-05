import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { RoleService } from "../../services/roleServices/role.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  isDarkMode = true;
  role: string | null = null;
  role$: Observable<'admin' | 'guest' | null>;

  constructor(private roleService: RoleService) {
    this.role$ = this.roleService.role$;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.role$.subscribe(role => this.role = role)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    document.body.setAttribute('data-bs-theme', this.isDarkMode ? 'dark' : 'light');
  }

  get isRoleSet(): boolean {
    return !!this.role;
  }

  get roleClass(): Record<string, boolean> {
    return {
      'hover-green': this.role === 'admin',
      'hover-pink': this.role === 'guest'
    };
  }

  handleMenuClick(event: Event): void {
    if (!this.isRoleSet) {
      event.preventDefault();
    }
  }
}
