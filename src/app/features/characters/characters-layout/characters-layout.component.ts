import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/auth/models/User.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-characters-layout',
  templateUrl: './characters-layout.component.html',
  styleUrls: ['./characters-layout.component.scss']
})
export class CharactersLayoutComponent {
  constructor(){}
}
