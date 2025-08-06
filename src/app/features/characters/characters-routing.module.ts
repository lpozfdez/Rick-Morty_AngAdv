import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersLayoutComponent } from './characters-layout/characters-layout.component';
import { CharactersNewComponent } from './characters-new/characters-new.component';
import { CharactersSearchComponent } from './characters-search/characters-search.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharactersPageComponent } from './characters-page/characters-page.component';

const routes: Routes = [
  {
    path: '' ,
    component: CharactersLayoutComponent,
    children: [
      { path: 'new-character', component: CharactersNewComponent },
      { path: 'search', component: CharactersSearchComponent },
      { path: 'list', component: CharactersListComponent },
      { path: ':id', component: CharactersPageComponent },
      { path: '**', redirectTo: 'list' },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
