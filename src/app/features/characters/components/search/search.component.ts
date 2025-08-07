import { Component } from '@angular/core';
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
          console.log(this.characters);
        });
        break;
      case 'episode':
        this.characterSub = this.episodeSrv.getEpisode().subscribe((response) => {
          const allEpisodes = response.results || [];
          this.episodes = [...allEpisodes];
          this.episodes = this.episodes.filter(e =>
            e.name.toLowerCase().includes(searchWord)
          );
          console.log(this.episodes);
        });
        break;
    }

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
