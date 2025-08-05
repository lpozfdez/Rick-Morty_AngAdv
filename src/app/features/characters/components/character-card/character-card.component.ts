import { Component, Input } from '@angular/core';
import { Character } from '../../models/Character.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  @Input() public character!: Character;

  ngOnInit(): void {
    if (!this.character) throw Error('Character is required');
  }
}
