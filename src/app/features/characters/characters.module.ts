import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersEditComponent } from './characters-edit/characters-edit.component';
import { CharactersLayoutComponent } from './characters-layout/characters-layout.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharactersNewComponent } from './characters-new/characters-new.component';
import { CharactersPageComponent } from './characters-page/characters-page.component';
import { CharactersSearchComponent } from './characters-search/characters-search.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterImagePipe } from './pipes/character-image.pipe';
import { CharactersService } from './services/characters.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CharacterStatusPipe } from './pipes/character-status.pipe';


@NgModule({
  providers: [
    CharactersService
  ],
  declarations: [
    CharactersLayoutComponent,
    CharactersEditComponent,
    CharactersListComponent,
    CharactersNewComponent,
    CharactersPageComponent,
    CharactersSearchComponent,
    CharacterCardComponent,
    CharacterImagePipe,
    CharacterStatusPipe
  ],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    SharedModule
  ],
})
export class CharactersModule { }
