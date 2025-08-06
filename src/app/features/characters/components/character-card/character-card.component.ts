import { Component, Input } from '@angular/core';
import { Character } from '../../models/Character.model';
import { EpisodeService } from 'src/app/features/episodes/services/episode.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {

  @Input() public character!: Character;

  firstEp$: Observable<string | undefined> = new Observable();

  constructor( private episodeServ: EpisodeService ) { }

  ngOnInit(): void {
    if (!this.character) throw Error('Character is required');

    const episodeUrl = this.character.episode[0];
    const episodeId = episodeUrl.split('/').pop();

    this.firstEp$ = this.episodeServ.getEpisodeById(episodeId!).pipe(
      map(episode => episode?.name)
    );
  }
}
