import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersLayoutComponent } from './characters-layout/characters-layout.component';
import { CharactersNewComponent } from './characters-new/characters-new.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharactersPageComponent } from './characters-page/characters-page.component';
import { AuthGuard } from 'src/app/core/auth/guards/auth.guard';
import { Page404Component } from 'src/app/shared/page404/page404.component';

const routes: Routes = [
  {
    path: '' ,
    component: CharactersLayoutComponent,
    children: [
      { path: 'new-character', component: CharactersNewComponent, canActivate: [AuthGuard] },
      { path: 'list', component: CharactersListComponent },
      { path: 'page404', component: Page404Component },
      { path: ':id', component: CharactersPageComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'list' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
