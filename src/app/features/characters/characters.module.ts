import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersLayoutComponent } from './characters-layout/characters-layout.component';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharactersNewComponent } from './characters-new/characters-new.component';
import { CharactersPageComponent } from './characters-page/characters-page.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { CharacterImagePipe } from './pipes/character-image.pipe';
import { CharactersService } from './services/characters.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CharacterStatusPipe } from './pipes/character-status.pipe';
import { EditCharacterModalComponent } from './components/edit-character-modal/edit-character-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  providers: [
    CharactersService
  ],
  declarations: [
    CharactersLayoutComponent,
    CharactersListComponent,
    CharactersNewComponent,
    CharactersPageComponent,
    CharacterCardComponent,
    CharacterImagePipe,
    CharacterStatusPipe,
    EditCharacterModalComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CharactersRoutingModule,
    SharedModule
  ],
})
export class CharactersModule { }
