import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CharactersService } from '../../services/characters.service';
import { EpisodeService } from 'src/app/features/episodes/services/episode.service';
import { Subscription } from 'rxjs';
import { Character } from '../../models/Character.model';
import { Episode } from 'src/app/features/episodes/models/Episode.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Output() searchResultsChange = new EventEmitter<(Character)[]>();

  searchInput = new FormControl('');
  searchType = 'name';
  characters: Character[] = [];
  characterSelected: any = null;
  episodes: Episode[] = [];
  episodeSelected: any = null;
  showDropdown = false;

  private characterSub?: Subscription;
  private episodeSub?: Subscription;

  constructor( private chrServ: CharactersService, private episodeSrv: EpisodeService ) {}

  search() {
    const searchWord = this.searchInput.value?.toLowerCase();
    if (!searchWord) {
      this.characters = [];
      return;
    }
    console.log(searchWord);
    switch(this.searchType) {
      case 'name':
        this.characterSub = this.chrServ.getAllCharacters().subscribe((response) => {
          const allCharacters = response.results || [];
          this.characters = [...allCharacters];
          this.characters = this.characters.filter(c =>
            c.name.toLowerCase().includes(searchWord)
          );
          this.searchResultsChange.emit(this.characters);
          console.log(this.characters);
        });
        break;
      case 'status':
        this.characterSub = this.chrServ.getAllCharacters().subscribe((response) => {
          const allCharacters = response.results || [];
          this.characters = [...allCharacters];
          this.characters = this.characters.filter(c =>
            c.status.toLowerCase().includes(searchWord)
          );
          this.searchResultsChange.emit(this.characters);
          console.log(this.characters);
        });
        break;
      case 'episode': // TODO arreglar
        this.characterSub = this.episodeSrv.getEpisode().subscribe((response) => {
          const allEpisodes = response.results || [];
          this.episodes = [...allEpisodes];
          this.episodes = this.episodes.filter(e =>
            e.name.toLowerCase().includes(searchWord)
          );
          this.getCharactersByEpisode();
          console.log(this.episodes);
        });
        break;
    }

  }

  getCharactersByEpisode(): Character[] {
    if (!this.episodes) return [];

    this.chrServ.getAllCharacters().subscribe((response) => {

      const allCharacters: Character[] = response.results;

      const episodeUrls = this.episodes.map(e => e.url);

      const filteredCharacters = allCharacters.filter(character =>
        character.episode.some(epUrl => episodeUrls.includes(epUrl))
      );

      this.characters = filteredCharacters;
      this.searchResultsChange.emit(this.characters);

      console.log(this.characters);
    });


    return [];
  }

  onSelectedOption(item: Character | Episode) {
    if ('status' in item) {
      this.characterSelected = item;
      this.searchInput.setValue(item.name);
    } else {
      this.episodeSelected = item;
      this.searchInput.setValue(item.name);
    }

    this.showDropdown = false;
  }

  onSearchTypeChange() {
    this.searchInput.setValue('');
    this.characters = [];
    this.episodes = [];
    this.showDropdown = false;
  }


  hideDropdown() {
    setTimeout(() => (this.showDropdown = false), 150);
  }

}
